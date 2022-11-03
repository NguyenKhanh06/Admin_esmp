import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import config from "~/config";

export const SidebarData = [
  {
    title: "Trang chủ",
    path: config.routes.home,
    icon: <HomeOutlinedIcon fontSize="large" />,
  },
  {
    title: "Sản phẩm",
    icon: <ShoppingBagOutlinedIcon fontSize="large" />,
    path: config.routes.viewItems
  },
  {
    title: "Người dùng",
    icon: <ShoppingCartCheckoutOutlinedIcon fontSize="large" />,
    path: config.routes.viewUsers
  },
  {
    title: "Cửa hàng",
    icon: <StorefrontIcon fontSize="large" />,
    path: config.routes.viewStores,
  },
];
