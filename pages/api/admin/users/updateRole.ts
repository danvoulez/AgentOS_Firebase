import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, role } = req.body;
  const auth = getAuth();
  await auth.setCustomUserClaims(userId, { role });
  res.status(200).json({ success: true });
}
