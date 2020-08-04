import Login from "../components/login/login"
import Register from "../components/register/register"
import Dashboard from "../components/dashboard/dashboard";
import AddOrEditProduct from "../components/addOrEditProduct/addOrEditProduct";
import ListAllProducts from "../components/listAllProducts/listAllProducts";

const routes = [
    {
        path: "/login",
        component: Login,
        access: "public"
    },
    {
        path: "/register",
        component: Register,
        access: "public"
    },
    {
        path: "/dashboard",
        component: Dashboard,
        access: "public"
    },
    {
        path: "/addoredit",
        component: AddOrEditProduct,
        access: "public"
    },
    {
        path: "/listAll",
        component: ListAllProducts,
        access: "public"
    }
]

export default routes;