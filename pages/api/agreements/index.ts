import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../src/utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const snaps = await db.collection('agreements').orderBy('confirmed_at','desc').get();
  res.json({ agreements: snaps.docs.map(d=>({ id:d.id, ...d.data() })) });
}
