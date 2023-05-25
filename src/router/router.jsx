import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUT
const BasicLayout = lazy(() => import('../views/layouts/BasicLayout'));

// PAGES
const HomePage = lazy(() => import('../views/pages/homePage/HomePage'));
const UploadPage = lazy(() => import('../views/pages/uploadPage/UploadPage'))

// MESSAGES PAGES
const ErrorPage = lazy(() => import('../views/pages/errorPage/ErrorPage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}><BasicLayout /></Suspense>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<></>}><HomePage /></Suspense>,
      },
      {
        path: "upload",
        element:
          <Suspense fallback={<></>}><UploadPage /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  }
]);

export default router;