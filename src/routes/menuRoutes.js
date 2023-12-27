import OrdersPage from "../components/pages/ordersPage/OrdersPage.jsx";
import { TablesPage } from "../components/pages/tablesPage/TablesPage.jsx";

export const menuRoutes = [
    {
        id:'home',
        path:'/',
        Element: TablesPage
    },
    {
        id:'orders',
        path:'/orders',
        Element: OrdersPage
    }
]