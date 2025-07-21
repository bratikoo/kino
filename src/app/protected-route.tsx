import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/auth";

export function ProtectedRoute() {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
}
