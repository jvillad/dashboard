import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (req.method === 'DELETE') {
    try {
      const result = await prisma.item.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json('Deleted');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
