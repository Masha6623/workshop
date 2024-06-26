import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

export function Snack() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant("warning")}>
        Show success snackbar
      </Button>
    </React.Fragment>
  );
}

export default function ShowSnack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Snack />
    </SnackbarProvider>
  );
}
