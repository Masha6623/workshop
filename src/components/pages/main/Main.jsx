import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import { useState } from "react";
import SignUp from "../../auth/SignUp";
import SignIn from "../../auth/SignIn";
import AuthDetails from "../../auth/AuthDetails";
import Success from "../../UI/snackbar/Success";
import NotAuthorized from "../../UI/snackbar/NotAuthorized";
import UserProfile from "../../UI/modal/userProfile/UserProfile";
import AdminProfile from "../../UI/modal/admin/AdminProfile";

const Main = ({
  setOpenOrder,
  setOpenProduct,
  setOpenCollab,
  setOpenInfo,
  form,
  openSubmitSuccess,
  role,
}) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openNotAuth, setOpenNotAuth] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAdminProfile, setOpenAdminProfile] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid style={{ width: "260px" }}>
          <Box>
            <AuthDetails
              authUser={authUser}
              setAuthUser={setAuthUser}
              openSignIn={openSignIn}
              setOpenSignIn={setOpenSignIn}
              setOpenSignUp={setOpenSignUp}
              setOpenProfile={setOpenProfile}
              setOpenAdminProfile={setOpenAdminProfile}
              role={role}
            />
            <SignUp
              setOpenSignUp={setOpenSignUp}
              openSignUp={openSignUp}
              setOpenSuccessMessage={setOpenSuccessMessage}
            />
            <SignIn setOpenSignIn={setOpenSignIn} openSignIn={openSignIn} />
          </Box>
          <ButtonGroup
            style={{ width: "100%" }}
            size="large"
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <Button
              onClick={() =>
                authUser ? setOpenOrder(true) : setOpenNotAuth(true)
              }
            >
              Онлайн заказ
            </Button>
            <Button
              onClick={() =>
                authUser ? setOpenProduct(true) : setOpenNotAuth(true)
              }
            >
              Наша продукция
            </Button>
            <Button color="warning" onClick={() => setOpenCollab(true)}>
              Сотрудничество
            </Button>
            <Button color="secondary" onClick={() => setOpenInfo(true)}>
              Информация
            </Button>
          </ButtonGroup>
          <Success
            openSuccessMessage={openSuccessMessage}
            setOpenSuccessMessage={setOpenSuccessMessage}
          />
          <NotAuthorized
            openNotAuth={openNotAuth}
            setOpenNotAuth={setOpenNotAuth}
          />
          {role === "user" ? (
            <UserProfile
              openProfile={openProfile}
              setOpenProfile={setOpenProfile}
              email={authUser?.email}
              form={form}
              openSubmitSuccess={openSubmitSuccess}
            />
          ) : (
            <AdminProfile
              openAdminProfile={openAdminProfile}
              setOpenAdminProfile={setOpenAdminProfile}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
