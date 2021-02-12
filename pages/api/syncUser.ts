import { db } from 'utils/db'

import { verifyIdToken } from '../../utils/auth/firebaseAdmin'

import type { NextApiRequest, NextApiResponse } from 'next'


const sync = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token = req.headers.token

  if (!token) {
    return res.status(401).send('You are unauthorised')
  }

  try {
    const userRecord = await verifyIdToken(token, true)

    let user = await db.users.findFirst({
      where: { fid: userRecord.uid }
    })

    if (!user) {
      user = await db.users.create({
        data: {
          fid: userRecord.uid,
          name: userRecord.displayName
        }
      })
    }

    return res.status(200).json({
      user,
    })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export default sync
