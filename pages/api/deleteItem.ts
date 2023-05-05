import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = Number(req.query.id) ?? 0;
  if (req.method === 'DELETE') {
    try {
      const result = await prisma.item.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json('Deleted');
    } catch (error) {
      console.error(error);
    }
  }
}
