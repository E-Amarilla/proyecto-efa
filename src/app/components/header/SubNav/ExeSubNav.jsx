"use client";

import React from "react";
import SubNav from "./SubNav";

function ExeSubNav({ children }) {
  return (
    <>
      <SubNav />
      <div>{children}</div>
    </>
  );
}

export default ExeSubNav;