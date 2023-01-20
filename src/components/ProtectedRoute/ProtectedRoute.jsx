import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ onlyUnAuth = false, children, ...props }) => {
  const { isAuthChecked } = useSelector((state) => state.userSlice);
  const location = useLocation();

  if (onlyUnAuth && isAuthChecked) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...props}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return (
      <Route {...props}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...props}>{children}</Route>;
};

export default ProtectedRoute;
