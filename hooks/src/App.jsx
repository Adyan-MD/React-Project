import { LoginContext } from "./Context/Context/LoginContext";
import { useState } from "react";
import Login from "./Context/Login";
import Profile from "./Context/Profile";

const App = () => {
  const [username, setUsername] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  return(
    <>
    <LoginContext.Provider value = {{username, setUsername, setShowProfile}}>
    {showProfile ? <Profile/> : <Login/>}
    </LoginContext.Provider>
    </>
  )
}
export default App;