import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    shortDescription,
    longDescription,
    price,
    stock,
    categoryId,
    special,
  } = req.body;
  if (req.method === 'POST') {
    try {
      const data = await prisma.item.create({
        data: {
          name,
          shortDescription,
          longDescription,
          price,
          stock,
          special,
          category: {
            connect: {
              name: categoryId,
            },
          },
        },
      });
      console.log(data);

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
