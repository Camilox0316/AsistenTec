import "./index.css";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/LoginPage";
import { ForgotPasswordPage } from "./views/ForgotPasswordPage";
import RequireAuth from "./components/RequireAuth";

import { HomeSwitch } from "./components/HomeSwitch";

import RegisterUserPage from "./views/RegisterUserPage";

import { ViewActivityPage } from "./views/ViewActivityPage";
import { ViewHomeStudent } from "./views/ViewHomeStudent";

import { ViewProfe } from "./views/ViewProfe";


const ROLES = {
  Student: 1597,
  Professor: 2264,
  Admin: 3123,
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        <Route path="/register-student" element={<RegisterUserPage />} />

        {/*Private routes */}
        {/* User routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Professor, ROLES.Student, ROLES.Admin]}
            />
          }
        >
          <Route path="/home-switch" element={<HomeSwitch />} />
        </Route>

        {/* Student routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
          <Route path="/home-student" element={<ViewHomeStudent />} />
        </Route>

        {/* Professor routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Professor]} />}>
          <Route path="/home-professor" element={<ViewProfe />} />
        </Route>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/home-admin" element={<ViewActivityPage />} />
        </Route>

        {/*Catch all*/}
        <Route path="*" element={<h1>404 error</h1>} />
      </Route>
    </Routes>
  );
}
