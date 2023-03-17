import { Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import AddCategory from "./modules/category/AddCategory";
import CategoryManage from "./modules/category/CategoryManage";
import UpdateCategory from "./modules/category/UpdateCategory";
import DashboardLayout from "./modules/dashboard/DashboardLayout";
import AddProduct from "./modules/product/AddProduct";
import ProductManage from "./modules/product/ProductManage";
import UpdateProduct from "./modules/product/UpdateProduct";
import UpdateUserManage from "./modules/user/UpdateUserManage";
import UserManage from "./modules/user/UserManage";
import DashboardPage from "./pages/admin/DashboardPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
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
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/category"
            element={<CategoryManage></CategoryManage>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/update_category/:id"
            element={<UpdateCategory></UpdateCategory>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/create_category"
            element={<AddCategory></AddCategory>}
          ></Route>
        </Route>

        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/product"
            element={<ProductManage></ProductManage>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/create_product"
            element={<AddProduct></AddProduct>}
          ></Route>
        </Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/manage/update_product/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
