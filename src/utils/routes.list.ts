import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFoundError from "../pages/Error/NotFoundError";
import Gallery from "../pages/Gallery/Gallery";
import Home from "../pages/Home/Home";
import Leadership from "../pages/Leadership/Leadership";
import Sermons from "../pages/Sermons/Sermons";

interface RouteConfig {
  exact?: boolean;
  path?: string;
  component: React.ComponentType;
}

const routes: RouteConfig[] = [
  {
    exact: true,
    path: "/",
    component: Home,
  },
  {
    exact: true,
    path: "/about",
    component: About,
  },
  {
    exact: true,
    path: "/leadership",
    component: Leadership,
  },
  {
    exact: true,
    path: "/contact",
    component: Contact,
  },
  {
    exact: true,
    path: "/gallery",
    component: Gallery,
  },
  {
    exact: true,
    path: "/sermons",
    component: Sermons,
  },
  {
    path: "*",
    component: NotFoundError,
  },
];

export default routes;