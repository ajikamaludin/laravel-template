import {
    HiChartPie,
    HiUser,
    HiCollection,
    HiAdjustments,
    HiPlusCircle,
    HiCurrencyDollar,
    HiCash,
    HiClipboardList,
    HiHashtag,
    HiUsers,
    HiUserGroup,
    HiUserCircle,
    HiOutlineTruck,
    HiDatabase,
    HiShoppingBag,
    HiReceiptTax,
    HiHome,
    HiInboxIn,
    HiOutlineCash,
    HiOutlineTable
} from "react-icons/hi";

export default [
    {
        name: "Dashboard",
        show: true,
        icon: HiChartPie,
        route: route("dashboard"),
        active: "dashboard",
        permission: "view-dashboard",
    },
];
