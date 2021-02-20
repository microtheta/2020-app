import * as admin from 'firebase-admin'
import { db } from 'utils/db.server'

interface VerifiedUserType {
  id?: number;
  fid?: string | null;
  name?: string | null;
  uid: string;
  email?: string | undefined;
  emailVerified?: boolean;
  displayName?: string | undefined;
  phoneNumber?: string | undefined;
  isAnonymous?: boolean;
}

export const verifyIdToken = async (token: string, getUserRecord: boolean = false) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY || ''

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
    .then((decodedToken): Promise<VerifiedUserType> | VerifiedUserType => {
      const uid = decodedToken.uid;
      if (getUserRecord) {
        return admin
          .auth()
          .getUser(uid)
          .then(async (userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            // console.log(`Successfully fetched user data: ${JSON.stringify(userRecord.toJSON())}`);
            const user = await db.user.findUnique({
              where: {
                fid: uid
              }
            })
            const mergedUser = { ...userRecord, ...user }
            return mergedUser
          })
          .catch((error) => {
            console.log('Error fetching user data:', error);
            return { uid: '' }
          });
      } else {
        return { uid }
      }
    })
    .catch((error) => {
      throw error
    })
}
