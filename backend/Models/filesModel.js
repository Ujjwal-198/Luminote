import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodeId: { type: String, required: true, unique: true },
  size: { type: Number, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, default: '' },
  description: { type: String, required: true },
  university: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  academicYear: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 }
});

export default mongoose.model('File', fileSchema);