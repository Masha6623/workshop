import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { Divider, List, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import SuccessCopyEmail from "../../snackbar/SuccessCopyEmail";
import ApplicationForm from "./ApplicationForm";
import { useForm } from "react-hook-form";

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

const Collaboration = ({ openCollab, setOpenCollab }) => {
  const classes = useStyles();
  const emailRef = useRef();
  const [openSuccessCopyEmail, setOpenSuccessCopyEmail] = useState(false);
  const [openApplicationForm, setOpenApplicationForm] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      reason: "",
      text: "",
      ticketNumber: "",
      ticketDate: "",
    },
    mode: "onBlur",
  });

  function copyEmail() {
    navigator.clipboard.writeText(emailRef.current.innerText);
    setOpenSuccessCopyEmail(true);
  }

  return (
    <>
      <Dialog
        open={openCollab}
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
          <DialogTitle>Сотрудничество</DialogTitle>
          <DialogContent>
            <List style={{ listStyle: "none" }}>
              <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
                Что <strong>Мы ждем</strong> от сотрудничества ? Ваши{" "}
                <strong>крупные партии заказов </strong> на мелкогабаритные
                каркасы изделий.
              </Typography>
              <Divider component="li" />
              <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
                Что <strong>Вы получаете</strong> от сотрудничества с нами?{" "}
                <strong>
                  Прогнозируемые сроки изготовления, качество, оптовую цену на
                  работу и материал.
                </strong>
              </Typography>
              <Divider component="li" />
              <Typography variant="subtitle1">
                <strong>По вопросам сотрудничества</strong> обращайтесь на
                e-mail{" "}
                <Button
                  ref={emailRef}
                  onClick={copyEmail}
                  color="secondary"
                  href="#text-buttons"
                >
                  offers@yometal.ru
                </Button>{" "}
                или{" "}
                <Button
                  color="secondary"
                  onClick={() => setOpenApplicationForm(true)}
                  href="#text-buttons"
                >
                  заполните форму обратной связи
                </Button>
              </Typography>
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpenCollab(false)}>
              Закрыть
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <SuccessCopyEmail
        openSuccessCopyEmail={openSuccessCopyEmail}
        setOpenSuccessCopyEmail={setOpenSuccessCopyEmail}
      />
      <ApplicationForm
        openApplicationForm={openApplicationForm}
        setOpenApplicationForm={setOpenApplicationForm}
        form={form}
      />
    </>
  );
};

export default Collaboration;
