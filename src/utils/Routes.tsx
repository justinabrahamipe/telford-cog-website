import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

interface RouteConfig {
  path?: string;
  exact?: boolean;
  component: React.ComponentType;
}

interface RoutesProps {
  routes: RouteConfig[];
}

const Routes: React.FC<RoutesProps> = ({ routes }) => {
  return (
    <RouterRoutes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </RouterRoutes>
  );
};

export default Routes;