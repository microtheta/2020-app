import { db } from 'utils/db.server'

import { verifyIdToken } from 'utils/auth/firebaseAdmin.server'

import type { NextApiRequest, NextApiResponse } from 'next'


const sync = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token = String(req.headers.token)

  if (!token) {
    return res.status(401).send('You are unauthorised')
  }

  try {
    const userRecord = await verifyIdToken(token)

    let user = await db.user.findFirst({
      where: { fid: userRecord.uid }
    })

    if (!user) {
      user = await db.user.create({
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
