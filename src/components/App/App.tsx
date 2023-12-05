import AppHeader from "../AppHeader/AppHeader";
import HomePage from "../../pages/HomePage/HomePage";
import { Switch, Route, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { useEffect, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typesHooks";
import IngredientCard from "../BurgerIngredients/IngredientCard/IngredientCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { fetchGetUser } from "../../services/reduxToolkit/userSlice";
import { fetchRefreshToken } from "../../services/reduxToolkit/userSlice";
import Feed from "../../pages/Feed/Feed";
import Orders from "../../pages/Orders/Orders";
import ModalRoutes from "../ModalRoutes/ModalRoutes";
import ChoosenOrder from "../../pages/ChoosenOrder/ChoosenOrder";
import { fetchIngredients as getIngredients } from "../../services/reduxToolkit/ingredientsSlice";
import { TLocationState } from "../../types/types";
import { changedSize } from "../../services/reduxToolkit/utils";

const App: React.FC = () => {
  const { ingredientsRequest, ingredients } = useAppSelector(
    (state) => state.ingredientsSlice
  );
  const dispatch = useAppDispatch();
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const LoginMemo = memo(Login);
  const RegisterMemo = memo(Register);
  const ForgotPasswordMemo = memo(ForgotPassword);
  const ResetPasswordMemo = memo(ResetPassword);
  const FeedMemo = memo(Feed);
  const OrdersMemo = memo(Orders);
  const ChoosenOrderMemo = memo(ChoosenOrder);
  const jwt = localStorage.getItem("jwt");

  const { windowSize } = useAppSelector((state) => state.utils);
  useEffect(() => {
    if (windowSize === 0) {
      dispatch(changedSize(window.innerWidth));
    }
  });

  const handleResize = useCallback(() => {
    dispatch(changedSize(window.innerWidth));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

  const location = useLocation<TLocationState>();
  const background = location.state?.background;
  useEffect(() => {
    if (!isAuthChecked && jwt) {
      dispatch(fetchGetUser());
    }
    if (!isAuthChecked && jwt) {
      dispatch(fetchRefreshToken());
      dispatch(fetchGetUser());
    }
  }, [jwt, isAuthChecked, dispatch]);

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
          <LoginMemo />
        </Route>
        <Route path={"/register"} exact>
          <RegisterMemo />
        </Route>
        <Route path={"/forgot-password"} exact>
          <ForgotPasswordMemo />
        </Route>
        <Route path={"/reset-password"} exact>
          <ResetPasswordMemo />
        </Route>
        <ProtectedRoute path={"/profile"} exact>
          <Profile />
        </ProtectedRoute>
        <Route path={"/feed"} exact>
          <FeedMemo />
        </Route>
        <Route path={"/feed/:number"} exact>
          <ChoosenOrderMemo />
        </Route>
        <ProtectedRoute path={"/profile/orders"} exact>
          <OrdersMemo />
        </ProtectedRoute>
        <ProtectedRoute path={"/profile/orders/:number"} exact>
          <ChoosenOrderMemo />
        </ProtectedRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
      <ModalRoutes />
    </>
  );
};

export default App;
