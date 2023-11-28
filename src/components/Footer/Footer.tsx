import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from "react";
import { useAppSelector } from '../../hooks/typesHooks';
import footerStyle from './Footer.module.css'
import { TOtherIngredient } from '../../types/types';

const Footer = () => {
  const bun = useAppSelector((state) => state.constructorSlice.bun);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorSlice.otherIngredients
  ); 
  const price: number = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      (constructorIngredients
        ? constructorIngredients.reduce((prev: number, cur: TOtherIngredient) => prev + cur.item.price, 0)
        : 0)
    );
  }, [bun, constructorIngredients]);

return (
    <footer className={footerStyle.footer}>
        <div className={footerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {price}</p>
          <CurrencyIcon type="primary" />
        </div>
            <Button
              htmlType='button'
              type='primary'
              size='small'
            >
                <p className="text text_type_main-small">{'Смотреть заказ'}</p>
            </Button>        
    </footer>
 )
}

export default Footer;