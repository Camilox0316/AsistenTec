import "./index.css";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/LoginPage";
import { ForgotPasswordPage } from "./views/ForgotPasswordPage";
import RequireAuth from "./components/RequireAuth";

import { HomeSwitch } from "./components/HomeSwitch";

import RegisterUserPage from "./views/RegisterUserPage";

import { ViewActivityPage } from "./views/ViewActivityPage";

//Professor Views
import { MostrarAsistencias } from "./views/Professor/MostrarAsistencias";
import SolicitarAsistencia from "./views/Professor/SolicitarAsistencia";
//Admin Views
import { VerAdmin_profes } from "./views/Admin/VerAdmin_profes";

//admin Student
import { ViewHomeStudent } from "./views/ViewHomeStudent";
import { ViewAssistanceDetails } from "./views/ViewAssitanceDetails";
import { MyAssistancesPage } from "./views/MyAssistancesPage";
import { ApplyForm } from "./views/StudentForm";



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
          <Route path="/assistance-details/:courseCode" element={<ViewAssistanceDetails />} />
          <Route path="/my-assists" element={<MyAssistancesPage />} />
          <Route path="/form/:courseCode" element={<ApplyForm />} />
        </Route>

        {/* Professor routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Professor]} />}>
          <Route path="/home-professor" element={<MostrarAsistencias />} />
          <Route path="/solicitar-asistencias-professor" element={<SolicitarAsistencia />} />
        </Route>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/home-switch" element={<HomeSwitch />} />
          <Route path="/home-admin" element={<ViewActivityPage />} />
          <Route path="/administradores_profes" element={<VerAdmin_profes />} />
          <Route path="/mostrar-solicitudes" element={<MostrarAsistencias />} />
          
        </Route>

        {/*Catch all*/}
        <Route path="*" element={<h1>404 error</h1>} />
      </Route>
    </Routes>
  );
}
