import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "right",
    color: "white",
  },
}));

const ButtonSignUp = ({ setOpenSignUp }) => {
  const classes = useStyles();

  return (
    <Button onClick={() => setOpenSignUp(true)} className={classes.buttonLogin}>
      Зарегистрироваться
    </Button>
  );
};

export default ButtonSignUp;
