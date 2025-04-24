import type { NextApiRequest, NextApiResponse } from 'next';
import { hasPermission } from '../../../src/utils/hasPermission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, action } = req.body;
  const allowed = await hasPermission(userId, action);
  res.status(200).json({ allowed });
}
