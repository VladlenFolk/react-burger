import { Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import IngredientDetails from "../BurgerIngredients/BurgerIngredient/IngredientDetails/IngredientDetails";
import { DELETE_INGREDIENT_INFO } from "../../services/actions/ingredientInfo";
import SelectedOrder from "../../pages/SelectedOrder/SelectedOrder";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const ModalRoutes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;
  const { ingredients } = useSelector((state) => state.ingredients);
  const onModalClose = () => {
    history.goBack();
  };
  const deletIngredientInfo = () => {
    dispatch({ type: DELETE_INGREDIENT_INFO });
    onModalClose();
  };

  return (
    <>
      {background && (
        <Route path={`/ingredient/:idCard`}>
          {ingredients.length && (
            <Modal title={"Детали ингредиента"} onClose={deletIngredientInfo}>
              <IngredientDetails />
            </Modal>
          )}
        </Route>
      )}
      {background && (
        <ProtectedRoute path={`/profile/orders/:number`}>
          {ingredients.length && (
            <Modal onClose={onModalClose}>
              <SelectedOrder />
            </Modal>
          )}
        </ProtectedRoute>
      )}
      {background && (
        <Route path={`/feed/:number`}>
          {ingredients.length && (
            <Modal onClose={onModalClose}>
              <SelectedOrder />
            </Modal>
          )}
        </Route>
      )}
    </>
  );
};

export default ModalRoutes;