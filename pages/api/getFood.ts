import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla']

import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  food: string
}

const getFood = async (req: NextApiRequest, res: NextApiResponse<Data | String>) => {
  const token = req.headers.token

  try {
    await verifyIdToken(token)
    return res.status(200).json({
      food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)],
    })
  } catch (error) {
    return res.status(401).send('You are unauthorised' + error.message)
  }
}

export default getFood
