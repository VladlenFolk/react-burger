import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { useAppSelector } from "../../hooks/typesHooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styleHomePage from "./HomePage.module.css";
import Footer from "../../components/Footer/Footer";
import ModalMobile from "../../components/ModalMobile/ModalMobile";
import OrderMobile from "../../components/BurgerConstructor/OrderMobile/OrderMobile";
import FooterConstructor from "../../components/Footer/FooterConstructor/FooterConstructor";
import OrderDetails from "../../components/BurgerConstructor/OrderDetails/OrderDetails";

const HomePage: React.FC = () => {
  const { ingredients, ingredientsFailed } = useAppSelector(
    (state) => state.ingredientsSlice
  );
  const bun = useAppSelector((state) => state.constructorSlice.bun);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorSlice.otherIngredients
  );
  const { orderRequest } = useAppSelector((state) => state.orderSlice);
  const { countModal } = useAppSelector((state) => state.utils);
  const { orderModal } = useAppSelector((state) => state.utils);
  const orderNumber = useAppSelector((data) => data.orderSlice.number);

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
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
            {bun && constructorIngredients?.length !== 0 && <Footer />}
            {countModal && (
              <ModalMobile title={"Заказ"}>
                <div className={styleHomePage.wrapper}>
                  <OrderMobile />
                </div>
                {bun && <FooterConstructor />}
              </ModalMobile>
            )}
            {orderModal && !orderRequest && (
              <ModalMobile title={"Заказ оформлен"}>
                <OrderDetails orderNumber={orderNumber} />
              </ModalMobile>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
