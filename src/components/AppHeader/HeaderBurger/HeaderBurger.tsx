import { useAppDispatch, useAppSelector } from '../../../hooks/typesHooks';
import burgerStyle from './HeaderBurger.module.css'; 
import { toggleMobileMenu } from '../../../services/reduxToolkit/userSlice';


const HeaderBurger = () => {
    const dispatch = useAppDispatch();
    const mobileMenu = useAppSelector((state) => state.userSlice.mobileMenu);
    const toggleBurger = () =>{
        dispatch(toggleMobileMenu());
    }

    return (
        <div  className={ !mobileMenu ? burgerStyle.burger : burgerStyle.burger+' '+ burgerStyle.active} onClick={toggleBurger}>
            <span></span>
        </div>
    )
}

export default HeaderBurger