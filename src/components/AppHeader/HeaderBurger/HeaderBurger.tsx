import {useState} from 'react'
import burgerStyle from './HeaderBurger.module.css'; 

const HeaderBurger = () => {
    const [headerBurgerState, setHeaderBurgerState] = useState(true)
    const toggleBurger = () =>{
        setHeaderBurgerState(!headerBurgerState)
    }

console.log(headerBurgerState);

    return (
        <div  className={ headerBurgerState ? burgerStyle.burger : burgerStyle.burger+' '+ burgerStyle.active} onClick={toggleBurger}>
            <span></span>
        </div>
    )
}

export default HeaderBurger