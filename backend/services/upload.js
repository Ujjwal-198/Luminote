// upload.js
import { getStorage } from './megaClient.js';
import { Readable } from 'stream';

export async function uploadFile(buffer, filename, targetFolder = null) {
  try {
    console.log(`Uploading file: ${filename}, size: ${buffer.length} bytes`);
    const storage = await getStorage();
    
    const stream = Readable.from(buffer);
    
    const uploadOptions = {
      name: filename,
      size: buffer.length
    };
    
    if (targetFolder) {
      console.log('Target folder:', targetFolder.name);
      uploadOptions.target = targetFolder;
    }
    
    console.log('Starting MEGA upload...');
    const file = await storage.upload(uploadOptions, stream).complete;
    console.log('✅ MEGA upload completed:', file.nodeId);
    
    return {
      success: true,
      nodeId: file.nodeId,
      name: file.name,
      size: file.size
    };
  } catch (error) {
    console.error('❌ Upload service error:', error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }
}
