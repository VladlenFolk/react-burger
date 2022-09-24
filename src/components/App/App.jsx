import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../ModalOverlay/ModalOverlay";
import OrderDetails from "../BurgerConstructor/OrderDetails/OrderDetails";
import IngredientDetails from "../BurgerIngredients/BurgerIngredient/IngredientDetails/IngredientDetails";

function App() {
  // Работаем с загрузкой API
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(url)
        .then((res) => checkResponse(res))
        .then((data) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getData();
  }, []);
  const { data, isLoading, hasError } = state;

  // Стейты для модалок
  const [modalActive, setModalActive] = useState(false);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [price, openPrice] = useState(false);
  const [animate, setAnimate] = useState(false);
  // Стейт для хранения id
  const [ingredientId, setIngredientId] = useState(null);

  return (
    <>
      <AppHeader />
      
      {!isLoading && !hasError && data.length !== 0 && (
        <>
        <div className={styleApp.title}>
        <h1 className="title_text text text_type_main-large">Соберите бургер </h1>
        </div>
        <div className={styleApp.App}>
          <BurgerIngredients
            setIngredientId={setIngredientId}
            ingredientId={ingredientId}
            setAnimate={setAnimate}
            data={data.data}
            setOpen={setIngredientOpen}
            openModal={setModalActive}
          />
          <BurgerConstructor
            setAnimate={setAnimate}
            data={data.data}
            openPrice={openPrice}
            openModal={setModalActive}
          />
        </div>
        </>
      )}
      {/* {modalActive && (
        <Modal
          open={modalActive}
          close={setModalActive}
          closeIngredient={setIngredientOpen}
          animate={animate}
          setAnimate={setAnimate}
          closePrice={openPrice}
        >
          {price && <OrderDetails price={price} />}
          {ingredientOpen && (
            <IngredientDetails
              data={data.data}
              ingredientId={ingredientId}
              ingredientOpen={ingredientOpen}
            />
          )}
        </Modal>
      )} */}
    </>
  );
}

export default App;
