import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { DialogActions, DialogContent, TextField } from "@mui/material";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { Controller } from "react-hook-form";
import ApplicationSubmitSuccess from "../../snackbar/ApplicationSUbmitSuccess";

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

const ApplicationForm = ({
  openApplicationForm,
  setOpenApplicationForm,
  form,
}) => {
  const classes = useStyles();
  const [isStepValid, setIsStepValid] = useState(false);
  const [openApplicationSubmitSuccess, setOpenApplicationSubmitSuccess] =
    useState(false);

  const dateCreateTicket = String(new Date());

  const onSubmit = (result) => {
    const database = getDatabase();
    const id = Date.now();

    set(ref(database, `tickets/${id}`), {
      email: result.email,
      reason: result.reason,
      text: result.text,
      ticketDate: dateCreateTicket,
    });
    setOpenApplicationSubmitSuccess(true);
    setOpenApplicationForm(false);
    form.reset();
  };

  const validate = () => {
    const { email, reason, text } = form.getValues();

    if (email.length && reason.length && text.length) {
      setIsStepValid(email.length, reason.length, text.length);
      return;
    }
    setIsStepValid(false);
  };

  React.useEffect(() => {
    const subscription = form.watch(() => validate());
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Box>
      <Dialog
        open={openApplicationForm}
        disableEnforceFocus
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Онлайн заказ"
      >
        <DialogTitle id="applicationForm">Обратная связь</DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            <Box style={{ display: "grid" }}>
              <Controller
                control={form.control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    multiline
                    maxRows={1}
                    variant="filled"
                  />
                )}
              />
              <Controller
                control={form.control}
                name="reason"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Тема"
                    multiline
                    maxRows={1}
                    variant="filled"
                  />
                )}
              />
              <Controller
                control={form.control}
                name="text"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Обращение"
                    multiline
                    rows={5}
                    variant="filled"
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={!isStepValid}>
              Отправить
            </Button>
            <Button
              variant="text"
              onClick={() => setOpenApplicationForm(false)}
            >
              Закрыть
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ApplicationSubmitSuccess
        openApplicationSubmitSuccess={openApplicationSubmitSuccess}
        setOpenApplicationSubmitSuccess={setOpenApplicationSubmitSuccess}
      />
    </Box>
  );
};

export default ApplicationForm;
