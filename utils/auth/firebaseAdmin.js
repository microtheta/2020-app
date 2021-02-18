import * as admin from 'firebase-admin'
import { db } from 'utils/db'

export const verifyIdToken = async (token, getUserRecord) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      if (getUserRecord) {
        return admin
          .auth()
          .getUser(uid)
          .then(async (userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            // console.log(`Successfully fetched user data: ${JSON.stringify(userRecord.toJSON())}`);
            const user = await db.users.findUnique({
              where: {
                fid: uid
              }
            })
            console.log({ ...userRecord, ...user })
            return { ...userRecord, ...user }
          })
          .catch((error) => {
            console.log('Error fetching user data:', error);
          });
      } else {
        return uid
      }
    })
    .catch((error) => {
      throw error
    })
}
