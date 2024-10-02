import mongoose from 'mongoose';

const AuftragSchema = new mongoose.Schema({
  nummer: String,
  kunde: String,
  adresse: String,
  mieter: String,
  telNr: String,
  email: String,
  problem: String,
  pdfFiles: [String],
  status: String,
  erstelltAm: Date,
  importance: String,
  comments: [{
    author: String,
    text: String,
    createdAt: Date
  }],
  termin: Date
});

export default mongoose.models.Auftrag || mongoose.model('Auftrag', AuftragSchema);