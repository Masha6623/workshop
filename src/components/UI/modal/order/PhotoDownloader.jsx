import { Box, Button, makeStyles } from "@material-ui/core";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  butAddPhotos: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "215px",
  },
}));

const uploader = Uploader({
  apiKey: "public_kW15c4o7pMaN2SEEQuWggWU1KWoQ",
});
const options = {
  apiKey: "public_kW15c4o7pMaN2SEEQuWggWU1KWoQ",
  maxFileCount: 1,
};

const PhotoDownloader = ({ form }) => {
  const classes = useStyles();

  const [photos, setPhotos] = useState("");

  return (
    <Box>
      <Controller
        control={form.control}
        name="photo"
        render={({ field }) => (
          <UploadButton
            {...field}
            uploader={uploader}
            options={options}
            onComplete={(files) => {
              setPhotos(files[0]?.fileUrl)
              form.setValue("photo", files[0]?.fileUrl);
            }}
          >
            {({ onClick }) => (
              <Box>
                <Button className={classes.butAddPhotos} onClick={onClick}>
                  Добавьте фото проекта
                </Button>
                {photos?.length ? <CheckIcon /> : <CloseIcon />}
              </Box>
            )}
          </UploadButton>
        )}
      />
    </Box>
  );
};

export default PhotoDownloader;
