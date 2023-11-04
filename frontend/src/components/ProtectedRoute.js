import { Navigate } from "react-router-dom";
import Main from "./Main.jsx";

export default function ProtectedRoute({
  isLogged,
  ...props
}) {
    return isLogged ? (
      <Main {...props} />
    ) : (
      <Navigate to="/sign-in" replace />
    )
}
