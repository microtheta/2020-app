import { useRouter } from 'next/router'
import { useUser } from 'utils/auth/useUser'

import Loader from 'components/Loader'

export const ProtectRoute = (Component) => (props) => {
    //this will redirect to home if user not found.
    const { user, isLoading } = useUser()
    const router = useRouter()

    if (isLoading) {
        return <Loader />;
    }
    if (!user) {
        router.push('/')
        return null
    }
    return <Component {...props} />;
};