import { uploadFile } from '../services/upload.js';
import { ensureFolder } from '../services/folder.js';
import { downloadFile } from '../services/download.js';
import File from '../Models/filesModel.js';
import { fileUploadValidation } from '../middleware/validation.js';
import logger from '../config/logger.js';

export const uploadDocument = async (req, res) => {
  try {
    const { error } = fileUploadValidation.validate(req.body);
    if (error) {
      logger.error('Upload validation error:', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    console.log('=== UPLOAD REQUEST START ===');
    console.log('Body:', req.body);
    console.log('Files count:', req.files?.length || 0);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const { university, course, branch, userId } = req.body;
    console.log('Form data:', { university, course, branch, userId });

    if (!req.body.documents) {
      return res.status(400).json({ error: 'No documents metadata provided' });
    }

    const documents = JSON.parse(req.body.documents);
    console.log('Documents metadata:', documents);

    const results = [];
    const totalFiles = req.files.length;

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const progress = Math.round(((i + 1) / totalFiles) * 100);

      console.log(`Processing file ${i + 1}/${totalFiles}: ${file.originalname} (${progress}%)`);

      const metadata = documents[file.originalname];
      if (!metadata) {
        console.log('❌ No metadata found for file:', file.originalname);
        console.log('Available metadata keys:', Object.keys(documents));
        continue;
      }

      console.log('✅ Metadata found:', metadata);

      try {
        console.log('Creating folder for category:', metadata.category);
        const folder = await ensureFolder(`/Uploads/${metadata.category}`);
        console.log('✅ Folder created/found');

        console.log('Uploading to MEGA...');
        const result = await uploadFile(file.buffer, file.originalname, folder);
        console.log('✅ MEGA upload result:', result);

        console.log('Saving to MongoDB...');
        console.log('About to save with uploadedBy:', req.user._id);
        const savedFile = await File.create({
          name: result.name,
          nodeId: result.nodeId,
          size: result.size,
          category: metadata.category,
          title: metadata.title,
          subject: metadata.subject || '',
          description: metadata.description,
          university,
          course,
          branch,
          academicYear: metadata.academicYear,
          uploadedBy: req.user._id
        });
        console.log('✅ MongoDB save result:', savedFile._id);
        console.log('✅ Saved file with uploadedBy:', savedFile.uploadedBy);

        results.push(savedFile);
      } catch (fileError) {
        console.error(`❌ Error processing file ${file.originalname}:`, fileError.message);
        if (fileError.message.includes('MEGA service is currently unavailable')) {
          return res.status(503).json({
            error: 'File upload service is temporarily unavailable. Please try again later.'
          });
        }
        throw fileError;
      }
    }

    console.log('=== UPLOAD SUCCESS ===');
    res.json({ success: true, files: results });
  } catch (error) {
    logger.error('Upload error:', error);
    console.error('=== UPLOAD ERROR ===', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

export const getDocuments = async (req, res) => {
  console.log('=== GET DOCUMENTS ===');
  try {
    const { category, branch, semester, subject } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (branch) filter.branch = branch;

    const documents = await File.find(filter).populate('uploadedBy', 'name').sort({ uploadedAt: -1 });
    console.log('Found documents count:', documents.length);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('=== GET USER DOCUMENTS ===');
    console.log('Searching for documents with uploadedBy:', userId);

    const documents = await File.find({ uploadedBy: userId }).populate('uploadedBy', 'name').sort({ uploadedAt: -1 });
    console.log('Found documents count:', documents.length);
    res.json(documents);
  } catch (error) {
    console.error('Error in getUserDocuments:', error);
    res.status(500).json({ error: error.message });
  }
};

export const viewDocument = async (req, res) => {
  try {
    const { nodeId } = req.params;
    console.log('=== VIEW DOCUMENT ===');
    console.log('Requested nodeId:', nodeId);

    await File.findOneAndUpdate(
      { nodeId },
      { $inc: { views: 1 } },
      { new: true }
    );

    const { stream, name } = await downloadFile(nodeId);
    console.log('✅ File found, streaming:', name);
    
    const fileExtension = name.split('.').pop().toLowerCase();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (fileExtension === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${name}"`);
    } else if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(fileExtension)) {
      const mimeTypes = {
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      };
      res.setHeader('Content-Type', mimeTypes[fileExtension] || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${name}"`);
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    }
    
    stream.pipe(res);
  } catch (error) {
    console.error('❌ View document error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const { nodeId } = req.params;
    console.log('=== DOWNLOAD DOCUMENT ===');
    console.log('Requested nodeId:', nodeId);

    const fileDoc = await File.findOne({ nodeId });
    if (!fileDoc) {
      console.log('❌ File not found in database');
      return res.status(404).json({ error: 'File not found in database' });
    }
    console.log('✅ File found in database:', fileDoc.name);

    await File.findOneAndUpdate(
      { nodeId },
      { $inc: { downloads: 1 } },
      { new: true }
    );

    console.log('🔄 Attempting to download from MEGA...');
    const { stream, name } = await downloadFile(nodeId);
    console.log('✅ File found, downloading:', name);
    
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    
    stream.pipe(res);
  } catch (error) {
    console.error('❌ Download document error:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ error: error.message });
  }
}; 

export const deleteDocument = async (req, res) => {
  try {
    const { nodeId } = req.params;
    console.log('=== DELETE DOCUMENT ===');
    console.log('Requested nodeId:', nodeId);

    const deletedFile = await File.findOneAndDelete({ nodeId });
    if (!deletedFile) {
      console.log('❌ File not found');
      return res.status(404).json({ error: 'File not found' });
    }

    console.log('✅ File deleted:', deletedFile._id);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete document error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllDocumentsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('=== DELETE ALL DOCUMENTS FOR USER ===');
    console.log('Requested userId:', userId);

    const deletedFiles = await File.deleteMany({ uploadedBy: userId });
    console.log('✅ Files deleted for user:', deletedFiles.deletedCount);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete all documents for user error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserDocuments = async (userId) => {
  try {
    console.log('=== DELETE USER DOCUMENTS (NO RESPONSE) ===');
    console.log('Requested userId:', userId);

    const deletedFiles = await File.deleteMany({ uploadedBy: userId });
    console.log('Files deleted for user:', deletedFiles.deletedCount);
    return deletedFiles.deletedCount;
  } catch (error) {
    console.error('❌ Delete user documents error:', error.message);
    throw error;
  }
};