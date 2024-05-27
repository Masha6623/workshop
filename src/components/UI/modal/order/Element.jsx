import {
  Box,
  TextField,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import materials from "../../../../utils/data";

const Element = ({ element, form }) => {

  return (
    <Box>
      <Controller
        control={form.control}
        defaultValue=""
        name={`totalLength.${element}`}
        render={({ field }) => (
          <TextField
            {...field}
            label={materials[element]}
            variant="filled"
            style={{ width: "100%", marginLeft: 0 }}
          />
        )}
      />
    </Box>
  );
};

export default Element;
