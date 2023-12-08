import {
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import orderMobileIngredient from "./OrderMobileIngredient.module.css";
import { TIngredient } from "../../../../types/types";

const OrderMobileIngredient: FC<TIngredient> = (item) => {
  return (
    <section className={orderMobileIngredient.container}>
      <div className={orderMobileIngredient.ingredientContainer}>
        <div className={orderMobileIngredient.drag}>
          <DragIcon type="primary" />
        </div>
        <div className={orderMobileIngredient.shadov}>
          <div className={orderMobileIngredient.imgContainer}>
            <img
              className={orderMobileIngredient.image}
              src={item!.image_mobile}
              alt={item!.name}
            />
          </div>
          <p className={orderMobileIngredient.text}>{item?.name}</p>
          <div className={orderMobileIngredient.price}>
            <p className="text text_type_digits-small mr-2"> {item?.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMobileIngredient;
