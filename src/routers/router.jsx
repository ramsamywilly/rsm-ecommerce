import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import BlogAll from "../pages/blogs/BlogAll";
import SingleBlog from "../pages/blogs/SingleBlog";
import SingleOccasion from "../pages/occasion/SingleOccasion";
import ShopPage from "../pages/shop/ShopPage";
import OccasionPage from "../pages/occasion/OccasionPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import ManagerDMain from "../pages/dashboard/manager/dashboard/ManagerDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import ManageBlog from "../pages/dashboard/admin/manageBlog/ManageBlog";
import ManageOccasion from "../pages/dashboard/admin/manageOccasion/ManageOccasion";
import AddBlog from "../pages/dashboard/admin/addBlog/AddBlog";
import UpdateBlog from "../pages/dashboard/admin/manageBlog/UpdateBlog";
import AddOccasion from "../pages/dashboard/admin/addOccasion/AddOccasion";
import UpdateOccasion from "../pages/dashboard/admin/manageOccasion/UpdateOccasion";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/categories/:categoryName', element: <CategoryPage /> },
      { path: '/search', element: <Search /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/occasion', element: <OccasionPage /> },
      { path: '/shop/:id', element: <SingleProduct /> },
      { path: '/success', element: <PaymentSuccess /> },
      { path: '/orders/:orderId', element: <OrderDetails /> },
      { path: '/blogAll', element: <BlogAll /> },
      { path: '/blog/:id', element: <SingleBlog /> },
      { path: '/occasion/:id', element: <SingleOccasion /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: '', element: <UserDMain /> },
      { path: 'orders', element: <UserOrders /> },
      { path: 'payments', element: <UserPayments /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'reviews', element: <UserReviews /> },
      //dashboard Admin
      { path: 'admin', element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute> },
      { path: 'profile', element: <PrivateRoute role="admin"><UserProfile /></PrivateRoute> },
      { path: 'add-new-product', element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute> },
      { path: 'manage-products', element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute> },
      { path: 'update-product/:id', element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute> }, 
      { path: 'users', element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute> },
      { path: 'manage-orders', element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute> },
      { path: 'manage-blog', element: <PrivateRoute role="admin"><ManageBlog /></PrivateRoute> },
      { path: 'add-new-blog', element: <PrivateRoute role="admin"><AddBlog /></PrivateRoute> },
      { path: 'update-blog/:id', element: <PrivateRoute role="admin"><UpdateBlog /></PrivateRoute> },
      { path: 'manage-occasion', element: <PrivateRoute role="admin"><ManageOccasion /></PrivateRoute> },
      { path: 'add-new-occasion', element: <PrivateRoute role="admin"><AddOccasion /></PrivateRoute> },
      { path: 'update-occasion/:id', element: <PrivateRoute role="admin"><UpdateOccasion /></PrivateRoute> },
            //dashboard Manager   
      { path: 'manager', element: <PrivateRoute role="manager"><ManagerDMain /></PrivateRoute> },        
      { path: 'profile', element: <PrivateRoute role="manager"><UserProfile /></PrivateRoute> },
      { path: 'add-new-product', element: <PrivateRoute role="manager"><AddProduct /></PrivateRoute> },
      { path: 'manage-products', element: <PrivateRoute role="manager"><ManageProduct /></PrivateRoute> },
      { path: 'update-product/:id', element: <PrivateRoute role="manager"><UpdateProduct /></PrivateRoute> }, 
      { path: 'manage-orders', element: <PrivateRoute role="manager"><div>Gérer les commandes</div></PrivateRoute> },
    ],
  },
]);

export default router;
