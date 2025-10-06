import React from 'react';
import CompanyContainer from "./Features/companies/components/CompanyContainer.jsx";
import {useSelector} from "react-redux";
import Toast from "./components/Toast.jsx";

function App() {
    const toast = useSelector(state => state.companies.toast);
  return (
    <>
     <CompanyContainer/>
     {toast && <Toast />}
    </>
  )
}

export default App
