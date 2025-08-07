import {useContext} from "react";
import { LoginContext } from "../Context/Context/LoginContext";

const Profile = () => {
    const {username} = useContext(LoginContext);

    return(
        <>
        <h1>Profile</h1>
        <h1>Username: {username}</h1>

        </>
    )
}
export default Profile;