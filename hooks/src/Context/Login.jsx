import {useContext} from "react";
import { LoginContext } from "./Context/LoginContext";

const Login = () => {
    const {setUsername, setShowProfile} = useContext(LoginContext);

    return(
        <>
        <input type="text" placeholder = "Enter username..." onChange = {(e) => {setUsername(e.target.value)}} />

        <input type="text" placeholder = "Enter password..." />

        <button onClick = {() => {setShowProfile(true)}}>Login</button>
        </>
    )
}
export default Login;