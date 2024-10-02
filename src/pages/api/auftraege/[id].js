import dbConnect from '@/lib/mongodb';
import Auftrag from '@/models/Auftrag';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auftrag = await Auftrag.findById(id);
        if (!auftrag) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json(auftrag);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const auftrag = await Auftrag.findByIdAndUpdate(id, req.body, {
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
        const deletedAuftrag = await Auftrag.deleteOne({ _id: id });
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