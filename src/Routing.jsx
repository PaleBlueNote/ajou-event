import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Main,
  MaterialMain,
  MaterialDetail,
  MaterialRequest,
  ProductsMain,
  ProductDetail,
  ProductUpload,
  PointPage,
  MaterialHistory,
  ProductBuy,
  CompanyHistoryDetail,
  ConsumerHistoryDetail,
} from "./pages";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/history/consumer/:id",
    element: <ConsumerHistoryDetail />,
  },
  {
    path: "/history/company/:id",
    element: <CompanyHistoryDetail />,
  },
  {
    path: "/product/buy",
    element: <ProductBuy />,
  },
  {
    path: "/material",
    element: <MaterialMain />,
  },
  {
    path: "/material/request",
    element: <MaterialRequest />,
  },
  {
    path: "/material/detail/:id",
    element: <MaterialDetail />,
  },
  {
    path: "/products",
    element: <ProductsMain />,
  },
  {
    path: "/product/detail/:id",
    element: <ProductDetail />,
  },
  {
    path: "/product/upload",
    element: <ProductUpload />,
  },
  {
    path: "/points",
    element: <PointPage />,
  },
  {
    path: "/history/material",
    element: <MaterialHistory />,
  },
]);

function Routing() {
  return <RouterProvider router={ROUTER} />;
}

export default Routing;
