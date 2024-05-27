import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    makeStyles,
  } from "@material-ui/core";
  import React from "react";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  
  // анимация мод.окна
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const Product = ({ openProduct, setOpenProduct }) => {
    const classes = useStyles();
  
    return (
      <>
        <Dialog
          open={openProduct}
          PaperProps={{
            style: {
              backgroundColor: "#ffffff",
              boxShadow: "none",
            },
          }}
          TransitionComponent={Transition}
          className={classes.root}
          aria-labelledby="Авторизация"
        >
          <form key={3}>
            <DialogContent>В разработке</DialogContent>
            <DialogActions>
              <Button variant="text" onClick={() => setOpenProduct(false)}>
                Закрыть
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  };
  
  export default Product;