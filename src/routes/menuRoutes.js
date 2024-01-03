import EditTables from "../components/pages/editTables/EditTables.jsx";
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
    },
    {
        id:'editTables',
        path:'/editTables',
        Element: EditTables
    }
]