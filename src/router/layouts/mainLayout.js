import currency from "../pages/currency";

const MainLayout = () =>
  import(/* webpackChunkName: "main" */ "@/layouts/main");

const mainLayout = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    redirect: { name: "CurrencyList" },
    children: [...currency],
  },
];

export default mainLayout;
