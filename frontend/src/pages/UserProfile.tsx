import type { JSX } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useAppDispatch } from "@/app/hooks";
import UserInfoCard from "@/features/user/components/UserInfoCard";
import { toast } from "sonner";
import Loading from "@/shared/components/ui/myUI/Loading";
import { logout } from "@/features/auth/authSlice";
import useUserProfile from "@/features/user/queries";
import Error from "@/shared/components/ui/myUI/Error";
import Body from "@/shared/components/layout/Body";

const UserProfile = (): JSX.Element | null => {

    const { isLoggedIn } = useAuth();
    const {data: userData, isFetching, isLoading, isError} = useUserProfile();

    const dispatch = useAppDispatch();

    if(!isLoggedIn) {
        return(
            <Error errorTitle="LOGIN" errorMsg="To view your Profile ..."/>
        )
    }

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        //navigate("/auth", { replace: true });
    };

    if (isLoading || isFetching) return <Loading />

    if (isError) return (<Error errorMsg="Unable to load your profile... Please try again later" />)

    if (!userData) return null;

    return (
        <Body>
        <div className="m-3 flex justify-center px-3 py-4 sm:m-5 sm:p-5">
            <UserInfoCard
                name={userData?.name}
                email={userData?.email}
                onLogout={handleLogout}
            />
        </div>
        </Body>
    )
}

export default UserProfile;