import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { adminIds, authOptions } from './[...nextauth]';

export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(adminIds.includes(session?.user?.email as string), adminIds);
  if (!session || !adminIds.includes(session.user?.email as string)) {
    res.status(401).json({ message: 'Unauthorized' });
    return { props: {} };
  }
};
