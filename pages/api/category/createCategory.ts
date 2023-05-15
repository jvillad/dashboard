import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { auth } from '../auth/auth';

export default async function createCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req, res);

  const { name, description } = req.body;
  if (req.method === 'POST') {
    try {
      const data = await prisma.category.create({
        data: {
          name,
          description,
        },
      });
      return res.status(200).json('post');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
