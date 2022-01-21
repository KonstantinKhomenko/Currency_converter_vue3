const CurrencyBase = () =>
  import(/* webpackChunkName: "currency" */ "@/views/CurrencyBase");
const CurrencyList = () =>
  import(/* webpackChunkName: "currency" */ "@/views/CurrencyList");
const CurrencyConverter = () =>
  import(/* webpackChunkName: "currency" */ "@/views/CurrencyConverter");

const currency = [
  {
    path: "/currencies",
    name: "CurrencyList",
    component: CurrencyList,
  },
  {
    path: "/currencies/base",
    name: "CurrencyBase",
    component: CurrencyBase,
  },
  {
    path: "/currencies/converter",
    name: "CurrencyConverter",
    component: CurrencyConverter,
  },
];

export default currency;
