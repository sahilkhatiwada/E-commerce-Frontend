import AuthGuard from "../guards/AuthGuard";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import Order from "../pages/Order";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment/khalti/success",
        element: <PaymentSuccess />,
      },
      { path: "order/details", element: <Order /> },
    ],
  },
];

export default mainRoutes;
