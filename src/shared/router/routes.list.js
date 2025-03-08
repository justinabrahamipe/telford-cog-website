import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFoundError from "../pages/Error/NotFoundError";
import Gallery from "../pages/Gallery/Gallery";
import Home from "../pages/Home/Home";
import KidsAndYouth from "../pages/KidsAndYouth/KidsAndYouth";
import Leadership from "../pages/Leadership/Leadership";
import Live from "../pages/Live/Live";
import Sermons from "../pages/Sermons/Sermons";

const routes = [
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
    path: "/live",
    component: Live,
  },
  {
    exact: true,
    path: "/gallery",
    component: Gallery,
  },
  {
    exact: true,
    path: "/kidsandyouth",
    component: KidsAndYouth,
  },
  {
    exact: true,
    path: "/sermons",
    component: Sermons,
  },
  {
    component: NotFoundError,
  },
];

export default routes;
