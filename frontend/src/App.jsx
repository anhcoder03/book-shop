import { Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import DashboardLayout from "./modules/dashboard/DashboardLayout";
import UpdateUserManage from "./modules/user/UpdateUserManage";
import UserManage from "./modules/user/UserManage";
import DashboardPage from "./pages/admin/DashboardPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/user"
            element={<UserManage></UserManage>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/update_user/:id"
            element={<UpdateUserManage></UpdateUserManage>}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
