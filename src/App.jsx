import styleApp from "./App.module.css";
import AppHeader from "./components/AppHeader/AppHeader";
import Title from "./components/Title/Title";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import IngridientsTab from "./components/IngridientsTab/IngridientsTab";
import Modal from "./components/ModalOverlay/ModalOverlay";
import OrderDetails from "./components/ModalOverlay/OrderDetails/OrderDetails";
import IngridientDetails from "./components/ModalOverlay/IngridientDetails/IngridientDetails";

function App() {
  // Работаем с загрузкой API
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(url)
        .then((res) => res.json())
        .then((data) => setState({ ...state, data: data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getData();
  }, []);
  const { data, isLoading, hasError } = state;

  // Стейты для модалок
  const [modalActive, setModalActive] = useState(false);
  const [ingridientOpen, setIngridientOpen] = useState(false);
  const [price, openPrice] = useState(false);
  const [animate, setAnimate] = useState(false);
  // Стейт для хранения id
  const [ingridientId, setingridientId] = useState(null);

  return (
    <>
      <AppHeader />
      <Title />
      {!isLoading && !hasError && data.length !== 0 && (
        <div className={styleApp.App}>
          <IngridientsTab
            setingridientId={setingridientId}
            ingridientId={ingridientId}
            setAnimate={setAnimate}
            data={data.data}
            setOpen={setIngridientOpen}
            openModal={setModalActive}
          />
          <BurgerConstructor
            setAnimate={setAnimate}
            data={data.data}
            openPrice={openPrice}
            openModal={setModalActive}
          />
        </div>
      )}
      {modalActive && (
        <Modal
          open={modalActive}
          close={setModalActive}
          closeIngridient={setIngridientOpen}
          animate={animate}
          setAnimate={setAnimate}
          closePrice={openPrice}
        >
          {price && <OrderDetails price={price} />}
          {ingridientOpen && (
            <IngridientDetails
              data={data.data}
              ingridientId={ingridientId}
              ingridientOpen={ingridientOpen}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
