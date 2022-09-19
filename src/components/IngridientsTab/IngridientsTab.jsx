import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./BurgerIngidient/BurgerIngidient";
import burgerStyle from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

const IngridientsTab = ({
  data,
  setOpen,
  openModal,
  setAnimate,
  setingridientId,
  ingridientId,
}) => {
  const [current, setCurrent] = React.useState("one");
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
    <section className={burgerStyle.burgerIngridirnets}>
      <div style={{ display: "flex" }}>
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
        <div className={burgerStyle.ingridientComposition}>
          {buns.map((bun) => (
            <BurgerIngredient
              key={bun._id}
              count={1}
              image={bun.image}
              price={bun.price}
              ingridient={bun.name}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              id={bun._id}
              setingridientId={setingridientId}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={sauce}>
          Соусы
        </h2>
        <div className={burgerStyle.ingridientComposition}>
          {sauces.map((sauce) => (
            <BurgerIngredient
              key={sauce._id}
              count={1}
              image={sauce.image}
              price={sauce.price}
              ingridient={sauce.name}
              id={sauce._id}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              setingridientId={setingridientId}
              ingridientId={ingridientId}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={main}>
          Начинки
        </h2>
        <div className={burgerStyle.ingridientComposition}>
          {mains.map((main) => (
            <BurgerIngredient
              key={main._id}
              count={1}
              image={main.image}
              price={main.price}
              ingridient={main.name}
              setOpen={setOpen}
              openModal={openModal}
              setAnimate={setAnimate}
              id={main._id}
              setingridientId={setingridientId}
              ingridientId={ingridientId}
              data={data}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default IngridientsTab;

BurgerIngredient.propTypes = {
  setingridientId: PropTypes.func.isRequired,
  ingridientId: PropTypes.string,
  data: PropTypes.array,
};

