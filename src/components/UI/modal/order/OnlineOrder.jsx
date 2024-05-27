import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import SelectionOfMaterials from "./SelectionOfMaterials";
import MaterialLength from "./MaterialLength";
import FinalSum from "./FinalSum";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../../../config/firebase";

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

const OnlineOrder = ({
  openOrder,
  setOpenOrder,
  form,
  setOpenSubmitSuccess,
}) => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);

  const dateCreateOrder = String(new Date());
  const userUid = auth.currentUser?.uid;

  const onSubmit = (result) => {
    console.log(result);
    const database = getDatabase();
    const id = Date.now();

    set(ref(database, `orders/${id}`), {
      selectedMaterials: result.selectedMaterials,
      totalLength: result.totalLength,
      photo: result.photo,
      description: result.description,
      phoneNumber: result.phoneNumber,
      email: result.email,
      fullPrice: result.fullPrice,
      workPrice: result.workPrice,
      materialPrice: result.materialPrice,
      paintPrice: result.paintPrice,
      finalTime: result.finalTime,
      dateCreateOrder: dateCreateOrder,
      status: "На рассмотрении",
      userUid: userUid,
    });

    set(ref(database, `users/${auth.lastNotifiedUid}/userOrders/${id}`), {
      id: id,
    });

    form.reset();
    setOpenOrder(false);
    setStep(1);
    setOpenSubmitSuccess(true);
  };

  const validate = () => {
    const { selectedMaterials, totalLength, photo, phoneNumber, description } =
      form.getValues();

    if (step === 1) {
      setIsStepValid(selectedMaterials?.length);
      return;
    }
    if (step === 2) {
      setIsStepValid(totalLength?.length, photo?.length, description?.length);
      return;
    }
    if (step === 3) {
      setIsStepValid(phoneNumber?.length);
      return;
    }
    setIsStepValid(false);
  };

  React.useEffect(() => {
    const subscription = form.watch(() => validate());
    return () => subscription.unsubscribe();
  }, [form.watch]);

  React.useEffect(() => {
    validate();
  }, [step]);

  return (
    <Box>
      <Dialog
        open={openOrder}
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
        <DialogTitle id="online-registration">
          Онлайн заказ {step}/3
        </DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            {step === 1 && <SelectionOfMaterials form={form} />}
            {step === 2 && <MaterialLength form={form} />}
            {step === 3 && <FinalSum form={form} />}
          </DialogContent>
          <DialogActions>
            {step === 2 || step === 3 ? (
              <Button onClick={() => setStep((prev) => prev - 1)}>Назад</Button>
            ) : null}
            {step === 3 && (
              <Button type="submit" disabled={!isStepValid}>
                Отправить
              </Button>
            )}
            {(step === 1 || step === 2) && (
              <Button
                disabled={!isStepValid}
                onClick={() => setStep((prev) => prev + 1)}
              >
                Продолжить
              </Button>
            )}
            <Button variant="text" onClick={() => setOpenOrder(false)}>
              Закрыть
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default OnlineOrder;
