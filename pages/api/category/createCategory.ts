import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function createCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

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
