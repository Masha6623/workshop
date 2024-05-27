import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "left",
    color: "white",
  },
}));

const ButtonAdminProfile = ({ setOpenAdminProfile }) => {
  const classes = useStyles();

  return (
    <Button onClick={() => setOpenAdminProfile(true)} className={classes.buttonLogin}>
      Личный кабинет
    </Button>
  );
};

export default ButtonAdminProfile;