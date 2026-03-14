import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { useAppDispatch } from "@/app/hooks";
import UserInfoCard from "@/features/user/components/UserInfoCard";
import { toast } from "sonner";
import Loading from "@/shared/components/ui/myUI/Loading";
import { logout } from "@/features/auth/authSlice";
import useUserProfile from "@/features/user/queries";
import Error from "@/shared/components/ui/myUI/Error";

const UserProfile = (): JSX.Element | null => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const {data: userData, isFetching, isLoading, isError} = useUserProfile();

    const dispatch = useAppDispatch();

    if(!isLoggedIn) {
        return(
            <>
            <h1>Please login to view profile</h1>
            </>
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
        <div className="flex justify-center m-5 p-5">
            <UserInfoCard
                name={userData?.name}
                email={userData?.email}
                onLogout={handleLogout}
            />
        </div>
    )
}

export default UserProfile;