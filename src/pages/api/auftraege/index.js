import dbConnect from '../../../lib/mongodb';
import AuftragModel from '../../../models/Auftrag';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auftraege = await AuftragModel.find({});
        res.status(200).json(auftraege);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const auftrag = await AuftragModel.create(req.body);
        res.status(201).json(auftrag);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}