import About from "../views/About/About";
import Contact from "../views/Contact/Contact";
import NotFoundError from "../views/Error/NotFoundError";
import Gallery from "../views/Gallery/Gallery";
import Home from "../views/Home/Home";
import Leadership from "../views/Leadership/Leadership";
import Sermons from "../views/Sermons/Sermons";

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