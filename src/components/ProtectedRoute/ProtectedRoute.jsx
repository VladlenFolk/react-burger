import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ onlyUnAuth, children, ...props }) => {
  const { isAuthChecked } = useSelector((state) => state.userSlice);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthChecked ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;