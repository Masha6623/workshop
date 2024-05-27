import { Box, List, TextField, makeStyles } from "@material-ui/core";
import React from "react";
import FullPrice from "./price/FullPrice";
import WorkPrice from "./price/WorkPrice";
import MaterialPrice from "./price/MaterialPrice";
import PaintPrice from "./price/PaintPrice";
import FinalTime from "./price/FinalTime";
import { prices } from "../../../../utils/data";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const FinalSum = ({ form }) => {
  const classes = useStyles();
  const materialLength = form.getValues("totalLength");

  let finalLength = Object.values(materialLength).reduce(
    (a, b) => Number(a) + Number(b)
  );

  function matPrice() {
    const materialLengthKeys = Object.keys(materialLength);

    let newArr = [];
    for (let i = 0; i < materialLengthKeys.length; i++) {
      newArr.push(prices[materialLengthKeys[i]]);
    }
    return newArr;
  }

  const materialValues = Object.values(materialLength);

  const materialPrice = matPrice().reduce(function (r, a, i) {
    return r + a * Number(materialValues[i]);
  }, 0);
  const workPrice = materialPrice * 2 + finalLength * prices.work; //finalLength * prices.work;
  const finalTime = Math.ceil(
    finalLength / prices.time + materialPrice / 10000
  );
  const paintPrice = Math.ceil(workPrice / 6);
  const fullPrice = workPrice + paintPrice + materialPrice;

  React.useEffect(() => {
    form.setValue("fullPrice", fullPrice);
    form.setValue("materialPrice", materialPrice);
    form.setValue("paintPrice", paintPrice);
    form.setValue("finalTime", finalTime);
    form.setValue("workPrice", workPrice);
  }, [fullPrice, materialPrice, paintPrice, finalTime, workPrice, form ])
  
  return (
    <Box>
      <List className={classes.root}>
        <FullPrice form={form} fullPrice={fullPrice} />
        <WorkPrice form={form} workPrice={workPrice} />
        <MaterialPrice form={form} materialPrice={materialPrice} />
        <PaintPrice form={form} paintPrice={paintPrice} />
        <FinalTime form={form} finalTime={finalTime} />
      </List>
      <Controller
        control={form.control}
        name="phoneNumber"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="filled-helperText"
            label="Введите номер телефона"
            variant="filled"
            style={{ width: "100%", marginLeft: 0 }}
          />
        )}
      />
    </Box>
  );
};

export default FinalSum;
