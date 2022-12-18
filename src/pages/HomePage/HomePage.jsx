import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styleHomePage from "./HomePage.module.css";

function HomePage({ openModal }) {
  const { ingredients, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );

  return (
    <>
      <div className={styleHomePage.text}>
        {ingredientsFailed && "Произошла ошибка"}
        {!ingredientsFailed && ingredients.length !== 0 && (
          <>
            <div className={styleHomePage.title}>
              <h1 className="title_text text text_type_main-large">
                Соберите бургер
              </h1>
            </div>
            <main className={styleHomePage.HomePage}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients openModal={openModal} />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;