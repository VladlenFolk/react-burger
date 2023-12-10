import style from "./SelectedOrder.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/typesHooks";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getObjWithCount, getPrice } from "../../utils/functions";
import { useMemo } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TParams = {
  number: string;
};
type TModal = {
  onClose: () => void;
};

const SelectedOrder: React.FC<TModal> = ({ onClose }) => {
  const { orders } = useAppSelector((state) => state.wsSlice);
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const { number } = useParams<TParams>();
  const el = orders?.find((order) => order?.number === +number);
  const ingredientsArr = el?.ingredients;
  const date = el ? el?.createdAt : 0;

  const orderIngredients = useMemo(() => {
    return ingredients?.filter((ingredient) =>
      ingredientsArr?.includes(ingredient._id)
    );
  }, [ingredients, ingredientsArr]);

  const ingredientsObj =
    ingredientsArr !== undefined
      ? getObjWithCount(ingredientsArr, orderIngredients)
      : [];
  const price = getPrice(ingredientsObj);
  const status = el?.status === "done" ? "Выполнен" : "Готовится";

  return (
    <div className={style.container}>
      <div className={style.headerModalMobile}>
        <h2 className={`text text_type_main-large ${style.title}`}>
          {"Детали заказа"}
        </h2>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      <div className={style.wrapper}>
      <p className={`text text_type_digits-default ${style.number}`}>
            #{number}
          </p>
          <h2 className={`text text_type_main-medium ${style.name}`}>
            {el?.name}
          </h2>
          <p
            className={`text text_type_main-default ${
              el?.status === "done" ? style.done : style.process
            }`}
          >
            {status}
          </p>
          <p className={`text text_type_main-medium ${style.contain}`}>
            Состав:
          </p>
        <div className={style.scroll}>
         
          <ul className={style.listContainer}>
            {ingredientsObj.map((el) => (
              <li className={style.list} key={el._id}>
                <div className={style.ingredient}>
                  <img
                    src={el.image_mobile}
                    alt={el.name}
                    className={style.image}
                  />
                </div>
                <p
                  className={`text text_type_main-default ${style.ingredients}`}
                >
                  {el.name}
                </p>
                <div className={style.total}>
                  <p className="text text_type_digits-default">{`${el.count} x ${el.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(date)} /> i-GMT+3
        </p>
        <div className={style.total}>
          <p className="text text_type_digits-default">{`${price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className={style.bottomMobile}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(date)} /> i-GMT+3
        </p>
        <div className={style.total}>
          <p className="text text_type_digits-default">{`${price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default SelectedOrder;
