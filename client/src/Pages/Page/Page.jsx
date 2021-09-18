import React from "react";

import { MenuBar } from "../../components";

const Page = ({ children }) => {
  return (
    <>
      <MenuBar />
      {children}
    </>
  );
};

export default Page;
