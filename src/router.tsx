import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main-page";
import AddingPage from "./pages/adding-page";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <MainPage />
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <>
          <AddingPage />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
