import dbConnect from '../../../lib/mongodb';
import Auftrag from '../../../models/Auftrag';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auftraege = await Auftrag.find({});
        res.status(200).json(auftraege);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const auftrag = await Auftrag.create(req.body);
        res.status(201).json(auftrag);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const auftrag = await Auftrag.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
        if (!auftrag) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json(auftrag);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedAuftrag = await Auftrag.deleteOne({ _id: req.query.id });
        if (!deletedAuftrag) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}