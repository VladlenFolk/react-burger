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
import { nanoid } from "nanoid";
import ConstructorContainer from "./ConstructorContainer/ConstructorContainer";
import { fetchGetOrder } from "../../services/reduxToolkit/orderSlice";
import Loader from "../Loader/Loader";
import { useHistory } from "react-router-dom";
import { addBun, addOtherIngredient} from "../../services/reduxToolkit/constructorSlice";
import { resetConstructor } from "../../services/reduxToolkit/constructorSlice";
const BurgerConstructor = () => {
  const [modalActive, setModalActive] = useState(false);
  const bun = useSelector((state) => state.constructorSlice.bun);
  const constructorIngredients = useSelector(
    (state) => state.constructorSlice.otherIngredients
  ); console.log(constructorIngredients, bun);
  const constructorBuns = useSelector((state) => state.constructorSlice.bun);
  const orderNumber = useSelector((data) => data.orderSlice.number);
  const { orderRequest, orderFailed } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.userSlice);
  const history = useHistory();

  //Функция добавления перемещенного элемента
  const addItem = (item) => {
    const ingredient = {
      item,
      id: nanoid(),
    };
    if (item.type === "bun") {
      dispatch(addBun(item));
    } else {
      dispatch(addOtherIngredient(ingredient));
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
    if (isAuthChecked) {
      dispatch(fetchGetOrder(idIngredients));
      dispatch(resetConstructor())
      setModalActive(true);
    } else {
      history.push("/login");
    }
  };
  function onClose() {
    setModalActive(false);
  }

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
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleOrderClick}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      {orderRequest ? (
        <Loader />
      ) : orderFailed ? (
        <h2>Ошибка, попробуйте перезагрузить страицу</h2>
      ) : (
        modalActive && (
          <Modal onClose={onClose}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )
      )}
    </>
  );
};

export default BurgerConstructor;
