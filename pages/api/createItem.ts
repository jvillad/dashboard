import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from './auth/auth';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req, res);
  const {
    name,
    shortDescription,
    longDescription,
    price,
    stock,
    categoryId,
    special,
    imageUrls,
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
          imageUrls,
        },
      });
      console.log(data);

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
