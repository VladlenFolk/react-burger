import AppHeader from "../AppHeader/AppHeader";
import HomePage from "../../pages/HomePage/HomePage";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getIngredients } from "../../services/actions/ingredients";
import IngredientCard from "../BurgerIngredients/IngredientCard/IngredientCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// import { getUser } from "../../services/actions/user";
import { getUser } from "../../services/reduxToolkit/userSlice";
import Feed from "../../pages/Feed/Feed";
import Orders from "../../pages/Orders/Orders";
import ModalRoutes from "../ModalRoutes/ModalRoutes";
import ChoosenOrder from "../../pages/ChoosenOrder/ChoosenOrder";
// import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed} from "../../services/reduxToolkit/ingredientsSlice";
import { getIngredients } from "../../services/reduxToolkit/ingredientsSlice";
function App() {
  const { ingredientsRequest, ingredients } = useSelector(
    (state) => state.ingredientsSlice
  );
  const { isAuthChecked } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;
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
        <Route path={"/login"} exact>
          <Login />
        </Route>
        <Route path={"/register"} exact>
          <Register />
        </Route>
        <Route path={"/forgot-password"} exact>
          <ForgotPassword />
        </Route>
        <Route path={"/reset-password"} exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path={"/profile"} exact>
          <Profile />
        </ProtectedRoute>
        <Route path={"/feed"} exact>
          <Feed />
        </Route>
        <Route path={"/feed/:number"} exact>
          <ChoosenOrder />
        </Route>
        <ProtectedRoute path={"/profile/orders"} exact>
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute path={"/profile/orders/:number"} exact>
          <ChoosenOrder />
        </ProtectedRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
      <ModalRoutes />
    </>
  );
}

export default App;