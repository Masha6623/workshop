import { Snackbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nameSnackbar: {
    textAlign: "center",
    color: "#ffffff",
    zIndex: 99,
  },
}));

const Title = () => {
  const classes = useStyles();

  const options = {
    opened: true,
    vertical: "top",
    horizontal: "center",
  };

  const { vertical, horizontal, opened } = options;

  return (
    <div className="nameSnackbar">
      <Snackbar
        open={opened}
        className={classes.nameSnackbar}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <h2 className="spanName">yoMetal.ru</h2>
      </Snackbar>
    </div>
  );
};

export default Title;
