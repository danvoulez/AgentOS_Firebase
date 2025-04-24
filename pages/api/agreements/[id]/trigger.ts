import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../src/utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await db.collection('agreements').doc(id as string).update({
    status: 'triggered', triggered_at: new Date()
  });
  res.json({ success: true });
}
