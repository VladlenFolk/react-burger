import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/typesHooks";
import footerStyle from "./FooterConstructor.module.css";
import { TOtherIngredient } from "../../../types/types";
import { fetchGetOrder } from "../../../services/reduxToolkit/orderSlice";
import { resetConstructor } from "../../../services/reduxToolkit/constructorSlice";
import { countModalClose } from "../../../services/reduxToolkit/utils";
import {
  toggleBurger,
  toggleAnimate,
  countModalOpen,
} from "../../../services/reduxToolkit/utils";

const FooterConstructor = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector((state) => state.constructorSlice.bun);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorSlice.otherIngredients
  );
  const constructorBuns = useAppSelector((state) => state.constructorSlice.bun);
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const history = useHistory();
  const price: number = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      (constructorIngredients
        ? constructorIngredients.reduce(
            (prev: number, cur: TOtherIngredient) => prev + cur.item.price,
            0
          )
        : 0)
    );
  }, [bun, constructorIngredients]);

    //получаем все id ингредиентов
    const idIngredients = useMemo(() => {
      if (constructorIngredients !== undefined) {
        let constructorIngredientsArr: string[] = constructorIngredients?.map(
          (item: TOtherIngredient) => item?.item._id
        );
        if (constructorBuns !== null) {
          return (constructorIngredientsArr = constructorIngredientsArr?.concat([
            constructorBuns?._id,
          ]));
        }
      }
    }, [constructorIngredients, constructorBuns?._id]);
      //Запрос на получение заказа
  const handleOrderClick = () => {
    if (isAuthChecked && idIngredients) {
      dispatch(fetchGetOrder(idIngredients));
      dispatch(resetConstructor());
      dispatch(toggleAnimate());
      dispatch(toggleBurger());
      dispatch(countModalClose());
    } else {
      history.push("/login");
    }
  };

  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.price}>
        <p className="text text_type_digits-default mr-2"> {price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div onClick={handleOrderClick}>
        <Button htmlType="button" type="primary" size="small" onClick={handleOrderClick}>
          <p className="text text_type_main-small">{"Заказать"}</p>
        </Button>
      </div>
    </footer>
  );
};

export default FooterConstructor;
