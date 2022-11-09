import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { IngredientContext } from "../../services/ingredientsContext";
import { getData } from "../../utils/api";

function App() {
  // Работаем с загрузкой API
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    getData()
      .then((data) =>
        setState({ ...state, ingredients: data, isLoading: false })
      )
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });

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
            <IngredientContext.Provider value={ingredients.data}>
              <BurgerIngredients  />
              <BurgerConstructor />
            </IngredientContext.Provider>
          </main>
        </>
      )}
    </div>
  );
}

export default App;