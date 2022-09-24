import  { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import burgerStyle from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";


const BurgerIngredients = ({
  data,
  setOpen,
  openModal,
  setAnimate,
  setIngredientId,
  ingredientId,
}) => {
  const [current, setCurrent] = useState("one");
  const sauces = data.filter((current) => {
    return current.type === "sauce";
  });
  const buns = data.filter((current) => {
    return current.type === "bun";
  });
  const mains = data.filter((current) => {
    return current.type === "main";
  });

  
  // нахожу якоря для скрола в DOM
  const bun = useRef(null);
  const sauce = useRef(null);
  const main = useRef(null);
  // функции для переключения по якорям на клавиши "таба"
  const goToBuns = () => bun.current.scrollIntoView({ behavior: "smooth" });
  const goToSauce = () => sauce.current.scrollIntoView({ behavior: "smooth" });
  const goToMain = () => main.current.scrollIntoView({ behavior: "smooth" });
   

  return (
    <section className={burgerStyle.burgerIngredirnets}>
      <div className={burgerStyle.tab}>
        <div onClick={goToBuns}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </div>
        <div className={burgerStyle.sauce} onClick={goToSauce}>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </div>
        <div onClick={goToMain}>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={burgerStyle.scroll}>
        <h2 className="text text_type_main-medium mb-6" ref={bun}>
          Булки
        </h2>
        <div className={burgerStyle.ingredientComposition}>
          {buns.map((bun) => (
            <BurgerIngredient
              key={bun._id}
              count={1}
              image={bun.image}
              price={bun.price}
              ingredient={bun.name}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              id={bun._id}
              setIngredientId={setIngredientId}
              data={data}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={sauce}>
          Соусы
        </h2>
        <div className={burgerStyle.ingredientComposition}>
          {sauces.map((sauce) => (
            <BurgerIngredient
              key={sauce._id}
              count={1}
              image={sauce.image}
              price={sauce.price}
              ingredient={sauce.name}
              id={sauce._id}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              setIngredientId={setIngredientId}
              ingredientId={ingredientId}
              data={data}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={main}>
          Начинки
        </h2>
        <div className={burgerStyle.ingredientComposition}>
          {mains.map((main) => (
            <BurgerIngredient
              key={main._id}
              count={1}
              image={main.image}
              price={main.price}
              ingredient={main.name}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              id={main._id}
              setIngredientId={setIngredientId}
              ingredientId={ingredientId}
              data={data}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default BurgerIngredients;

BurgerIngredients.propTypes = {
  setIngredientId: PropTypes.func.isRequired,
  ingredientId: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setAnimate: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
