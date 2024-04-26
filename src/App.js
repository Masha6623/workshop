import "./App.css";
import Main from "./components/pages/Main";
import Title from "./components/Title";
import { SnackbarProvider, useSnackbar } from "notistack";

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("Раздел находится в разработке!", { variant });
  };

  return (
    <>
      <Title />
      <Main handleClickVariant={handleClickVariant} />
    </>
  );
}
export default function Integration() {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
}
