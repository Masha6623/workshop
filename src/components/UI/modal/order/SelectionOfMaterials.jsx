import {
  Box,
  Chip,
  FormHelperText,
  Input,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { makeStyles, Checkbox } from "@material-ui/core";
import materials from "../../../../utils/data";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectionOfMaterials = ({ form }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h6">Выберите материалы:</Typography>
      <Controller
        control={form.control}
        rules={{ required: "Field is required!" }}
        name="selectedMaterials"
        render={({ field }) => (
          <>
            <Select
              {...field}
              className={classes.formControl}
              multiple
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={materials[value]}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {Object.keys(materials).map((el) => (
                <MenuItem key={el} value={el}>
                  <Checkbox
                    checked={
                      form.getValues("selectedMaterials").indexOf(el) > -1
                    }
                  />
                  <ListItemText primary={materials[el]} />
                </MenuItem>
              ))}
            </Select>
            {!!form.formState.errors.selectedMaterials && (
              <FormHelperText error>Field is required!</FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default SelectionOfMaterials;
