import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "right",
    color: "white",
  },
}));

const ButtonUnlogin = ({ userSignOut }) => {
  const classes = useStyles();

  return (
    <Button onClick={userSignOut} className={classes.buttonLogin}>
      Выйти
    </Button>
  );
};

export default ButtonUnlogin;