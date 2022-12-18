import AppHeader from "../AppHeader/AppHeader";
import HomePage from "../../pages/HomePage/HomePage";
import { DELETE_INGREDIENT_INFO } from "../../services/actions/ingredientInfo";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Modal from "../Modal/Modal";
import IngredientDetails from "../BurgerIngredients/BurgerIngredient/IngredientDetails/IngredientDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import IngredientCard from "../BurgerIngredients/IngredientCard/IngredientCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getUser } from "../../services/actions/user";

function App() {
  const { ingredientsRequest, ingredients } = useSelector(
    (state) => state.ingredients
  );
  const { isAuthChecked } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const onModalClose = () => {
    history.goBack();
  };

  const deletIngredientInfo = () => {
    dispatch({ type: DELETE_INGREDIENT_INFO });
    onModalClose();
  };

  useEffect(() => {
    if (!isAuthChecked && localStorage.getItem("jwt")) {
      dispatch(getUser());
    }
  }, [localStorage.getItem("jwt"), isAuthChecked, dispatch]);

  return (
    <>
      <AppHeader />
      {ingredientsRequest && <Loader />}
      <Switch location={background || location}>
        <Route exact path={"/"}>
          <HomePage />
        </Route>
        <Route path={`/ingredient/:idCard`} exact>
          {ingredients.length && <IngredientCard />}
        </Route>
        <Route path={"/login"} exact onlyUnAuth>
          <Login />
        </Route>
        <Route path={"/register"} exact onlyUnAuth>
          <Register />
        </Route>
        <Route path={"/forgot-password"} exact onlyUnAuth>
          <ForgotPassword />
        </Route>
        <Route path={"/reset-password"} exact onlyUnAuth>
          <ResetPassword />
        </Route>
        <ProtectedRoute path={"/profile"} exact>
          <Profile />
        </ProtectedRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
      {background && (
        <Route path={`/ingredient/:idCard`}>
          {ingredients.length && (
            <Modal title={"Детали ингредиента"} onClose={deletIngredientInfo}>
              <IngredientDetails />
            </Modal>
          )}
        </Route>
      )}
    </>
  );
}

export default App;