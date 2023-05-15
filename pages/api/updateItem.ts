import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from './auth/auth';

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req, res);

  const {
    id,
    name,
    shortDescription,
    longDescription,
    price,
    stock,
    categoryId,
    special,
    imageUrls,
  } = req.body;

  if (req.method === 'PUT') {
    try {
      const data = await prisma.item.update({
        where: {
          id: id,
        },
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
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
    // try {
    //   const data = await prisma.image.update({
    //     where: {
    //       itemId
    //     }
    //   })

    // } catch (error) {
    //   return res.status(500).json(error);
    // }
  }
}
