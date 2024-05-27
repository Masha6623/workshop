import { Box, TextField } from "@material-ui/core";
import Element from "./Element";
import PhotoDownloader from "./PhotoDownloader";
import { Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const MaterialLength = ({ form }) => {
  const materials = form.getValues("selectedMaterials");

  return (
    <Box>
      <Typography variant="body1">Введите нужную длину в метрах:</Typography>
      {materials.map((element, i) => {
        return <Element key={i} element={element} form={form} />;
      })}
      <Controller
        control={form.control}
        name="description"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Комментарий к проекту"
            variant="filled"
            style={{ width: "100%", marginLeft: 0 }}
          />
        )}
      />
      <PhotoDownloader form={form} />
    </Box>
  );
};

export default MaterialLength;
