import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../src/utils/firebase';
import { createHandler } from '../../../src/utils/api';

export default createHandler()
  .post(async (req, res) => {
    const { created_by, description, witness_id } = req.body;
    const data = {
      created_by, description, witness_id,
      status: 'pending', confirmed_at: new Date()
    };
    const ref = await db.collection('agreements').add(data);
    res.json({ success: true, id: ref.id });
  });
