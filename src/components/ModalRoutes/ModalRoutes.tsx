import { Route, useLocation, useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/typesHooks";
import Modal from "../Modal/Modal";
import IngredientDetails from "../BurgerIngredients/BurgerIngredient/IngredientDetails/IngredientDetails";
import SelectedOrder from "../../pages/SelectedOrder/SelectedOrder";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { TLocationState } from "../../types/types";

const ModalRoutes: React.FC = () => {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const background = location.state?.background;
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const onModalClose = () => {
    history.goBack();
  };
  return (
    <>
      {background && (
        <Route path={`/ingredient/:idCard`}>
          {ingredients.length && (
            <Modal title={"Детали ингредиента"} onClose={onModalClose}>
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