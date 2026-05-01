import React from "react";
import { RouterProvider } from "react-router";
import { route } from "./Routs";

const App = () => {
  return (
   <>
     <RouterProvider router={route} />
   </>
  );
};

export default App;
