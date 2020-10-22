import { useUser } from 'utils/auth/useUser'

export const ProtectRoute = (Component) => (props) => {
    const { user } = useUser() //this hook will redirect to home if user not found.
    if (!user) {
        return <div>Loading...</div>;
    }
    return <Component {...props} />;
};