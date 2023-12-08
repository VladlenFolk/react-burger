import orderMobile from "./OrderMobile.module.css";
import { useAppSelector } from "../../../hooks/typesHooks";
import OrderMobileIngredient from "./OrderMobileIngredient/OrderMobileIngredient";
import OrderElement from "./OrdrerElement/OrdrerElement";

const OrderMobile = () => {
  const bun = useAppSelector((state) => state.constructorSlice.bun);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorSlice.otherIngredients
  );
  
  return (
    <>
      <section className={orderMobile.container}> 

        <div className={orderMobile.scroll} >
          <ul>
            <li>{bun !== null && <OrderMobileIngredient {...bun} />}</li>
            {constructorIngredients?.length !== 0 && (
              <div className={orderMobile.otherIngredients}>
                {constructorIngredients?.map((ingredient, index) => (
                  <OrderElement
                    key={ingredient.id}
                    text={ingredient.item.name}
                    price={ingredient.item.price}
                    src={ingredient.item.image_mobile}
                    ingredient={ingredient}
                    index={index}
                  />
                ))}
              </div>
            )}
            <li>{bun !== null && <OrderMobileIngredient {...bun} />}</li>
          </ul>
        </div>

      </section>
    </>
  );
};

export default OrderMobile;
