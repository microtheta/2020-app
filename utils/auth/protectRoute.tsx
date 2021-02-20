; import * as React from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'utils/auth/useUser'

import Loader from 'components/ui/Loader'

export const ProtectRoute = (Component: React.ComponentType) => (props: any) => {
    //this will redirect to home if user not found.
    const { user, isLoading } = useUser()
    const router = useRouter()

    if (isLoading) {
        return <Loader />;
    }
    if (!user || user.isAnonymous) {
        router.push('/login')
        return null
    }
    return <Component {...props} />;
};