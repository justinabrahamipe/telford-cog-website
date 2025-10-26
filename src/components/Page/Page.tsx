import React, { useEffect, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../../utils/actions/page.actions";
import { closeDrawer as closeDrawerAction } from "../../utils/actions/drawer.actions";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { RootState, AppDispatch } from "../../utils/store";
import "./Page.css";

interface PageProps {
  name: string;
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ name, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isActive, isScrollable } = useSelector((state: RootState) => state.page);

  useEffect(() => {
    dispatch(setPageName(name));
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      dispatch(closeDrawerAction());
      setIsLoaded(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [dispatch, name]);

  useEffect(() => {
    if (isScrollable) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  }, [isScrollable]);

  let pageClassName = "Page";
  pageClassName += ` Page--${name}`;
  pageClassName += ` Page--${isActive ? "active" : "inactive"}`;
  pageClassName += isLoaded ? " Page--loaded" : "";

  return (
    <div className="wrapper wrapper--outer">
      <Header />
      <div className={pageClassName}>
        <div className="Page__content">
          {children}
          <Footer />
        </div>
        <div className="Page__overlay"></div>
      </div>
    </div>
  );
};

export default Page;