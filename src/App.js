import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import Authenticated from "./pages/Authenticated/Authenticated";
import { adminRoutes } from "./routes";

function App() {

  const currentUser = useSelector((state) => state.account.current);

  const [reload, setReload] = useState(false);

  return (
    <div className="App">
      <Routes>

      {!currentUser ? <Route path="/" element={<Authenticated reload={() => setReload(!reload)} />}/>:
        adminRoutes.map((route, index) => {
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
