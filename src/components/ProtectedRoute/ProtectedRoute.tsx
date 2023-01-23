import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../hooks/typesHooks";
import { ReactNode } from "react";

type TProtectedRoute = {
  children?: ReactNode;
  path: string
  exact?: boolean
}

const ProtectedRoute: React.FC<TProtectedRoute> = ({children, ...props }) => {
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);

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