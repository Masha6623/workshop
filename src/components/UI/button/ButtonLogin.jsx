import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "right",
    color: "white",
  },
}));

const ButtonLogin = ({ setOpenLogin }) => {
  const classes = useStyles();

  return (
    <Button onClick={() => setOpenLogin(true)} className={classes.buttonLogin}>
      Войти
    </Button>
  );
};

export default ButtonLogin;
