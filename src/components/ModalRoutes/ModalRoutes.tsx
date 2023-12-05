import { Route, useLocation, useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/typesHooks";
import Modal from "../Modal/Modal";
import IngredientDetails from "../BurgerIngredients/BurgerIngredient/IngredientDetails/IngredientDetails";
import SelectedOrder from "../../pages/SelectedOrder/SelectedOrder";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { TLocationState } from "../../types/types";
import ModalMenu from "../ModalMobile/ModalMenu/ModalMenu";
import ModalMobile from "../ModalMobile/ModalMobile";

const ModalRoutes: React.FC = () => {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const background = location.state?.background;
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const onModalClose = () => {
    history.goBack();
  };
  const mobileMenu = useAppSelector((state) => state.userSlice.mobileMenu);
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
      {mobileMenu && (
        <ModalMobile title={"Меню"}>
          <ModalMenu />
        </ModalMobile>
      )}
    </>
  );
};

export default ModalRoutes;
