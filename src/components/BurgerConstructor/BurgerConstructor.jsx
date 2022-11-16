import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./ConstructorIngredient/ConstructorIngredient";
import constructorStyle from "./BurgerConstructor.module.css";
import diamond from "../../images/diamond.svg";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  ADD_OTHER_INGREDIENTS,
  ADD_BUNS,
} from "../../services/actions/constructor";
import { nanoid } from "nanoid";
import ConstructorContainer from "./ConstructorContainer/ConstructorContainer";
import { getOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
  const [modalActive, setModalActive] = useState(false);
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.otherIngredients
  );
  const constructorBuns = useSelector((state) => state.burgerConstructor.bun);
  const orderNumber = useSelector((data) => data.order.number);
  const dispatch = useDispatch();

  //Функция добавления перемещенного элемента
  const addItem = (item) => {
    const ingredient = {
      item,
      id: nanoid(),
    };
    if (item.type === "bun") {
      dispatch({ type: ADD_BUNS, bun: item });
    } else {
      dispatch({ type: ADD_OTHER_INGREDIENTS, otherIngredients: ingredient });
    }
  };

  //сумма товаров в конструкторе
  const price = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      (constructorIngredients
        ? constructorIngredients.reduce((prev, cur) => prev + cur.item.price, 0)
        : 0)
    );
  }, [bun, constructorIngredients]);

  //Логика целевых элементов с и без ингредиентов
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      addItem(item);
    },
  });
  const [, dropTarget1] = useDrop({
    accept: "ingredients",
    drop(item) {
      addItem(item);
    },
  });

  //получаем все id ингредиентов
  const idIngredients = useMemo(() => {
    let constructorIngredientsArr = constructorIngredients.map(
      (item) => item.item._id
    );
    const constructorBunsArr = constructorBuns._id;
    return (constructorIngredientsArr = constructorIngredientsArr.concat([
      constructorBunsArr,
    ]));
  }, [constructorIngredients, constructorBuns._id]);

  //Запрос на получение заказа
  const handleOrderClick = () => {
    dispatch(getOrder(idIngredients));
    setModalActive(true);
  };

  function onClose() {
    setModalActive(false);
  }
  const orderRequest = useSelector(state => state.order.orderRequest);
  return (
    <>
      {bun.length === 0 && constructorIngredients.length === 0 && (
        <div ref={dropTarget}>
          <ConstructorContainer />
        </div>
      )}
      <section className={constructorStyle.container} ref={dropTarget1}>
        <ul className={constructorStyle.list}>
          {bun.length !== 0 && (
            <li className={constructorStyle.elementTopList}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + " (верх)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
          {constructorIngredients.length !== 0 && (
            <div className={constructorStyle.scroll}>
              {constructorIngredients.map((ingredient, index) => (
                <ConstructorIngredient
                  key={ingredient.id}
                  text={ingredient.item.name}
                  thumbnail={ingredient.item.image}
                  price={ingredient.item.price}
                  type="items"
                  ingredient={ingredient}
                  index={index}
                />
              ))}
            </div>
          )}
          {bun.length !== 0 && (
            <li className={constructorStyle.elementBotList}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
        </ul>
        {bun.length !== 0 && constructorIngredients.length !== 0 && (
          <div className={constructorStyle.counter}>
            <p className="text text_type_digits-medium">{price}</p>
            <img src={diamond} alt="Бриллиант" className="mr-10 ml-2" />
            <Button
              type="primary"
              size="large"
              onClick={handleOrderClick}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      
      {modalActive && (
        <Modal onClose={onClose}>
   
          <OrderDetails orderNumber={orderNumber} />
          
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
