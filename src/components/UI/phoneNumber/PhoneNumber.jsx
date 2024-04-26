import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import CodeOfTheCountry from "./CodeOfTheCountry";
//   import CodeOfTheCountry from "./СodeOfTheCountry";

const useStyles = makeStyles((theme) => ({
  phone: {
    padding: "10px",
  },
}));

const PhoneNumber = ({ form }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h6">Введите номер телефона:</Typography>
      <Controller
        control={form.control}
        name="phoneNumber"
        rules={{
          required: "Field is required!",
          minLength: 10,
          maxLength: 10,
        }}
        render={({ field }) => (
          <>
            <CodeOfTheCountry />
            <TextField
              {...field}
              margin="dense"
              className={classes.phone}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {!!form.formState.errors.phoneNumber && (
              <FormHelperText error>Invalid Phone Number</FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default PhoneNumber;
