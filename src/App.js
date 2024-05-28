import "./App.css";
import Main from "./components/pages/main/Main";
import Title from "./components/pages/Title";
import { SnackbarProvider, useSnackbar } from "notistack";
import OnlineOrder from "./components/UI/modal/order/OnlineOrder";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Product from "./components/UI/modal/Product";
import Collaboration from "./components/UI/modal/collaboration/Сollaboration";
import Information from "./components/UI/modal/Information";
import SubmitSuccess from "./components/UI/snackbar/SubmitSuccess";
import { auth } from "./config/firebase";
import { getDatabase, onValue, ref } from "firebase/database";

function App() {
  const [openOrder, setOpenOrder] = useState(false);
  const [openCollab, setOpenCollab] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSubmitSuccess, setOpenSubmitSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState("");

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("Раздел находится в разработке!", { variant });
  };

  const form = useForm({
    defaultValues: {
      selectedMaterials: [],
      totalLength: {},
      photo: "",
      description: "",
      phoneNumber: "",
      email: "",
      workPrice: "",
      materialPrice: "",
      paintPrice: "",
      finalTime: "",
      dateCreateOrder: "",
    },
    mode: "onBlur",
  });

  const userId = auth.currentUser?.uid;
  useEffect(() => {
    const db = getDatabase();
    const ordersId = ref(db, `users/${userId}/`);
    onValue(ordersId, (snapshot) => {
      const data = snapshot.val();
      setRole(data?.role);
    });
  }, [userId]);

  return (
    <>
      <Title />
      <Main
        handleClickVariant={handleClickVariant}
        setOpenOrder={setOpenOrder}
        form={form}
        setOpenCollab={setOpenCollab}
        setOpenProduct={setOpenProduct}
        setOpenInfo={setOpenInfo}
        openSubmitSuccess={openSubmitSuccess}
        role={role}
      />
      <OnlineOrder
        openOrder={openOrder}
        setOpenOrder={setOpenOrder}
        form={form}
        setOpenSubmitSuccess={setOpenSubmitSuccess}
      />
      <Product openProduct={openProduct} setOpenProduct={setOpenProduct} />
      <Collaboration openCollab={openCollab} setOpenCollab={setOpenCollab} />
      <Information openInfo={openInfo} setOpenInfo={setOpenInfo} />
      <SubmitSuccess
        setOpenSubmitSuccess={setOpenSubmitSuccess}
        openSubmitSuccess={openSubmitSuccess}
      />
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
