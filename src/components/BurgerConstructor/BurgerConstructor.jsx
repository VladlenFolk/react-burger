import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./ConstructorIngredient/ConstructorIngredient";
import constructorStyle from "./BurgerConstructor.module.css";
import diamond from "../../images/diamond.svg";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { useState } from "react";
import { IngredientContext } from "../../services/ingredientsContext";
import { useContext } from "react";
import { apiOrder } from "../../utils/api";

const BurgerConstructor = () => {
  const data = useContext(IngredientContext);

  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState([]);

  const ingredients = data.filter((current) => {
    return current.type !== "bun";
  });

  //получаем все id ингредиентов
  const idIngredients = ingredients.map((item) => item._id);

  //сумма товаров в конструкторе
  const amount = (arrOfIngredients) => {
    return (
      arrOfIngredients
        .map((prev) => prev.price)
        .reduce((prev, curr) => prev + curr) +
      data[0].price * 2
    );
  };

  //функция для получения номера заказа и открытия молального окна
  const handleOrderClick = (ingredientsId) => {
    apiOrder(ingredientsId)
      .then((answer) => setModalData(answer))
      .then(() => setModalActive(true));
  };

  return (
    <>
      <section className={constructorStyle.container}>
        <ul className={constructorStyle.list}>
          <li className={constructorStyle.elementTopList}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name + " (верх)"}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </li>
          <div className={constructorStyle.scroll}>
            {/* Сейчас добавляем все элементы кроме булок, потом будем добавлять с помощью перетаскивания */}
            {ingredients.map((ingredient) => (
              <ConstructorIngredient
                key={ingredient._id}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
              />
            ))}
          </div>
          <li className={constructorStyle.elementBotList}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={data[0].name + " (низ)"}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </li>
        </ul>
        <div className={constructorStyle.counter}>
          <p className="text text_type_digits-medium">{amount(ingredients)}</p>
          <img src={diamond} alt="Бриллиант" className="mr-10 ml-2" />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              handleOrderClick(idIngredients);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalActive && (
        <Modal onClose={setModalActive}>
          <OrderDetails orderNumber={modalData.order.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;