import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const WithAdminHeader = (Comp) => (props) => (
  <>
    <Header {...props} />
    <Comp {...props} />
    <Footer />
  </>
);

export default WithAdminHeader;
