import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import { adminRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        {adminRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
