import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, price, stock, category, special } = req.body;
  if (req.method === 'POST') {
    try {
      const data = await prisma.item.create({
        data: {
          name,
          description,
          price,
          stock,
          category,
          special,
        },
      });
      return res.status(200).json('post');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
