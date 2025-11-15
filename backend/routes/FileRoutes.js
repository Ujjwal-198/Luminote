import express from 'express';
import multer from 'multer';
import { uploadDocument, getDocuments, downloadDocument, getUserDocuments, viewDocument, deleteDocument, deleteAllDocumentsForUser } from '../controllers/FilesController.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';
import { validate, fileUploadValidation } from '../middleware/validation.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', uploadLimiter, authenticateToken, upload.array('files'), uploadDocument);

router.get('/user/:userId', getUserDocuments);
router.get('/documents', getDocuments);

router.get('/view/:nodeId', viewDocument);

router.get('/download/:nodeId', downloadDocument);

router.delete('/delete/:nodeId', authenticateToken, deleteDocument);

router.delete('/deleteAll/:userId', authenticateToken, deleteAllDocumentsForUser);

export default router;
