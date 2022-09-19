import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngridient from "./ConstructorIngridient/ConstructorIngridient";
import constructorStyle from "./BurgerConstructor.module.css";
import diamond from "../../images/diamond.svg";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, openModal, openPrice, setAnimate }) => {
  const ingridients = data.filter((current) => {
    return current.type !== "bun";
  });
  return (
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
          {ingridients.map((ingridient) => (
            <ConstructorIngridient
              key={ingridient._id}
              text={ingridient.name}
              thumbnail={ingridient.image}
              price={ingridient.price}
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
            openPrice(true);
            openModal(true);
            setAnimate(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  openPrice: PropTypes.func.isRequired,
  setAnimate: PropTypes.func.isRequired,
};
