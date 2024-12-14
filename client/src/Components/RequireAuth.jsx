import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth =({ allowedRoles })=>{
    const {auth} = useAuth();
    const location = useLocation();
    console.log(auth?.roles?.find(role => allowedRoles?.includes(role)))
    return(
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        :<Navigate to="/login" state={{from : location}} replace />
    )
}
export default RequireAuth;