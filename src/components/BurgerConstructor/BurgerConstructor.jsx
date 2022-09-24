import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Constructoringredient from "./ConstructorIngredient/ConstructorIngredient";
import constructorStyle from "./BurgerConstructor.module.css";
import diamond from "../../images/diamond.svg";
import PropTypes from "prop-types";
import Modal from "../ModalOverlay/ModalOverlay";
import OrderDetails from "./OrderDetails/OrderDetails";
import { useState, useEffect } from "react";


const BurgerConstructor = ({ data, openModal, }) => {
  const ingredients = data.filter((current) => {
    return current.type !== "bun";
  });
  const [modalActive, setModalActive] = useState(false);
  const [price, openPrice] = useState(false);


  

  return (<>
    <div className={constructorStyle.container}>
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
            <Constructoringredient
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
        <p className="text text_type_digits-medium">610</p>
        <img src={diamond} alt="Бриллиант" className="mr-10 ml-2" />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setModalActive(true);
            // openPrice(true);
            openModal(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
   {modalActive && <Modal
          // open={modalActive}
          onClose={setModalActive}
          // closeIngredient={setIngredientOpen}
          closePrice={openPrice}
        >
         <OrderDetails price={price} />
        </Modal>
        }
    </>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  openModal: PropTypes.func.isRequired,
  openPrice: PropTypes.func.isRequired,
  setAnimate: PropTypes.func.isRequired,
};
