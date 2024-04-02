import GuestGuard from "../guards/GuestGuard";
import MinimumLayout from "../layout/MinimumLayout";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import OtpVerification from "../pages/OtpVerification";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default guestRoutes;
