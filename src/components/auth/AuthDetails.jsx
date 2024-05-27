import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { Box } from "@mui/material";
import ButtonSignIn from "../UI/button/ButtonSignIn";
import ButtonSignUp from "../UI/button/ButtonSignUp";
import ButtonUnlogin from "../UI/button/ButtonUnlogin";
import ButtonProfile from "../UI/button/ButtonProfile";
import ButtonAdminProfile from "../UI/button/ButtonAdminProfile";

const AuthDetails = ({
  openSignIn,
  setOpenSignIn,
  setOpenSignUp,
  authUser,
  setAuthUser,
  setOpenProfile,
  setOpenAdminProfile,
  role,
}) => {
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setOpenSignIn(false);

      if (auth.currentUser?.emailVerified === true) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, []);

  function userSignOut() {
    signOut(auth)
      .then(() => console.log("success"))
      .catch((e) => console.log(e));
  }

  return (
    <div>
      {authUser ? (
        <Box>
          <ButtonUnlogin userSignOut={userSignOut} />
          {role === "user" ? (
            <ButtonProfile setOpenProfile={setOpenProfile} />
          ) : (
            <ButtonAdminProfile setOpenAdminProfile={setOpenAdminProfile} />
          )}
        </Box>
      ) : (
        <Box>
          <ButtonSignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
          <ButtonSignUp setOpenSignUp={setOpenSignUp} />
        </Box>
      )}
    </div>
  );
};

export default AuthDetails;
