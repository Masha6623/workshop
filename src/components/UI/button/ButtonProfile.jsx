import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "left",
    color: "white",
  },
}));

const ButtonProfile = ({ setOpenProfile }) => {
  const classes = useStyles();

  return (
    <Button onClick={() => setOpenProfile(true)} className={classes.buttonLogin}>
      Личный кабинет
    </Button>
  );
};

export default ButtonProfile;