import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { getDatabase, onValue, ref } from "firebase/database";
import { forwardRef, useState } from "react";
import FullOrderInfo from "../FullOrderInfo";
import FullUserInfo from "./FullUserInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// анимация мод.окна
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserSearch = ({ openUserSearch, setOpenUserSearch }) => {
  const classes = useStyles();
  const [inpUserUid, setInpUserUid] = useState("");
  const [userAllInfo, setUserAllInfo] = useState([]);
  const [openFullUserInfo, setOpenFullUserInfo] = useState(false);

  function getInpUserId(userUid) {
    setInpUserUid(userUid);
  }

  function searchUser() {
    const db = getDatabase();
    const userId = ref(db, `users/${inpUserUid}`);
    onValue(userId, (snapshot) => {
      const data = snapshot.val();
      setUserAllInfo(data);
      setOpenFullUserInfo(true);
    });
  }

  return (
    <>
      <Dialog
        open={openUserSearch}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Поиск пользователя"
      >
        <DialogTitle id="appeals">Поиск</DialogTitle>
        <DialogContent>
          <Input onChange={(e) => getInpUserId(e.target.value)} />
          <Button onClick={searchUser}>Поиск</Button>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpenUserSearch(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
      <FullUserInfo
        inpUserUid={inpUserUid}
        userAllInfo={userAllInfo}
        openFullUserInfo={openFullUserInfo}
        setOpenFullUserInfo={setOpenFullUserInfo}
      />
    </>
  );
};

export default UserSearch;
