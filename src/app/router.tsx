import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.FAVORITES,
            lazy: () => import("@/features/bookmarks/bookmarks.page"),
          },
        ],
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@/features/home/home.page"),
      },
    ],
  },
]);
