const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  category: { type: String, required: true },
  desc:     { type: String, required: true },
  status:   { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
