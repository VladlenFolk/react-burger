import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  // Работаем с загрузкой API
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });
  const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(url)
        .then((res) => checkResponse(res))
        .then((data) =>
          setState({ ...state, ingredients: data, isLoading: false })
        )
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getData();
  }, []);

  const { ingredients, isLoading, hasError } = state;

  return (
    <div className={styleApp.text}>
      <AppHeader />
      {!isLoading && !hasError && ingredients.length !== 0 && (
        <>
          <div className={styleApp.title}>
            <h1 className="title_text text text_type_main-large">
              Соберите бургер
            </h1>
          </div>
          <main className={styleApp.App}>
            <BurgerIngredients ingredients={ingredients.data} />
            <BurgerConstructor data={ingredients.data} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
