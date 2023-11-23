import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import footerStyle from './Footer.module.css'

const Footer = () => {
return (
    <footer className={footerStyle.footer}>
        <div className={footerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {420}</p>
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