import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

export const routes = [
  { path: "", component: Home },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard }
];
