import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmptyLayout } from "@@layouts/empty";
import { ErrorPage } from "@@pages/error";
import { lazy } from "react";
import { LazyWrapper } from "@@elements/lazy";
import { HomePage } from "@@pages/home";
import { TfImageDetectionPage } from "@@pages/tf/image-detection";
// import { TfImageDetectionUnoptimizedPage } from "@@pages/tf/image-detection";

export type Breadcrumb = {
  title: string;
  url: string;
};

const HomePageLazy = lazy(() => import("./pages/home/home.page"));
const TfImageDetectionPageLazy = lazy(
  () => import("./pages/tf/image-detection/image-detection.page")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmptyLayout />,
    errorElement: <ErrorPage />,
    handle: {
      // crumb: () => "Home",
    },
    children: [
      {
        path: "home",
        element: <LazyWrapper children={<HomePageLazy />} />,
        handle: {
          crumb: () => "home",
        },
      },
      {
        path: "tf/image-detection",
        element: <LazyWrapper children={<TfImageDetectionPage />} />,
        handle: {
          crumb: () => "tf/image-detection",
        },
      },
      // {
      //   path: "tf/image-detection-u",
      //   element: <TfImageDetectionUnoptimizedPage />,
      //   handle: {
      //     crumb: () => "tf/image-detection-u",
      //   },
      // },
      {
        path: "tf/image-detection",
        element: <LazyWrapper children={<TfImageDetectionPageLazy />} />,
        handle: {
          crumb: () => "tf/image-detection",
        },
      },
      {
        path: "",
        Component: HomePage,
        handle: {},
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/ban-types
export type AppRouterProps = {};
// eslint-disable-next-line no-empty-pattern
export const AppRouter = ({}: AppRouterProps) => {
  return <RouterProvider router={router}></RouterProvider>;
};
