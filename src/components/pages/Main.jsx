import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import ButtonLogin from "../UI/button/ButtonLogin";
import { useState } from "react";
import Login from "../UI/modal/Login";
import Date from "../Date";

const Main = ({ handleClickVariant }) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item component="div">
          <Box>
            <Date />
            <ButtonLogin setOpenLogin={setOpenLogin} />
            <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
          </Box>
          <ButtonGroup
            size="large"
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <Button onClick={handleClickVariant("warning")}>
              Онлайн запись
            </Button>
            <Button onClick={handleClickVariant("warning")}>
              Выкуп автомобилей
            </Button>
            <Button onClick={handleClickVariant("warning")}>
              Автомобили в продаже
            </Button>
            <Button color="secondary" onClick={handleClickVariant("warning")}>
              Информация
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
