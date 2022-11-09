import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect} from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styleApp.text}>
      <AppHeader />
      {ingredientsRequest && "Загрузка..."}
      {ingredientsFailed && "Произошла ошибка"}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length !== 0 && (
        <>
          <div className={styleApp.title}>
            <h1 className="title_text text text_type_main-large">
              Соберите бургер
            </h1>
          </div>
          <main className={styleApp.App}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
