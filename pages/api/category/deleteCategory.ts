import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../auth/auth';

export default async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req, res);

  if (req.method === 'DELETE') {
    try {
      const deleteUser = await prisma.category.deleteMany({
        where: {
          name: req.query.name as string,
        },
      });
      return res.status(200).json('Deleted');
    } catch (error) {
      console.error(error);
    }
  }
}
