import { Button, makeStyles } from "@material-ui/core";
import { getDate } from "../utils/date";

const useStyles = makeStyles(() => ({
  boxDate: {
    justifyContent: "space-between",
    marginBottom: 10,
    color: "white",
  },
}));

const Date = () => {
  const classes = useStyles();

  return (
    <Button className={classes.boxDate} color="primary">
      {getDate()}
    </Button>
  );
};

export default Date;
