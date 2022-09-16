// eslint-disable-next-line

import React from "react";
import VehicleRegister from "../components/owner/VehicleRegister";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import NavBar from "../components/owner/NavBar";
import PaymentInfo from "../components/owner/PaymentInfo";
import Calender from "../components/owner/Calender";
import TestCalender from "../components/owner/TestCalender";
import VehicleModify from "../components/owner/VehicleModify";
import ModifyTest from "../components/owner/ModifyTest";

const OwnerModifyPage = () => {
  return (
    <>
      <Header />
      {/* <NavBar /> */}
      <GlobalLayout>
        <VehicleModify />
        <ModifyTest />
        {/* <h1>수정 페이지</h1> */}
      </GlobalLayout>
    </>
  );
};

export default OwnerModifyPage;
