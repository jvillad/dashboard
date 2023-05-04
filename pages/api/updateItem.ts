import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, description, price, stock, category, special } = req.body;
  if (req.method === 'PUT') {
    try {
      const data = await prisma.item.update({
        where: {
          id: `${id}`,
        },
        data: {
          name,
          description,
          price,
          stock,
          category,
          special,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
