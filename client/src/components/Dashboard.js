import React, { useContext, useEffect } from "react";

import { Context } from "./Store";
import {
  LOGOUT_SUCCESS,
} from '../actions/types';
import { Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import HeaderStats from "./HeaderStats";
import DashboardMain from "./DashboardMain";
import DashboardOrder from "./DashboardOrder";
import DashboardOrderCreate from "./DashboardOrderCreate";
import DashboardDepartmentCreate from "./DashboardDepartmentCreate";
import DashboardDepartment from "./DashboardDepartment";
import DashboardUsers from "./DashboardUsers";
import DashboardUsersCreate from "./DashboardUsersCreate";


export default () => {

   const navigate = useNavigate();
   const [state, dispatch] = useContext(Context);


   //on authenticate state change
   useEffect(() => {
      if(state.auth.isLoading === false && state.auth.isAuthenticated === false){
         navigate('/logout')
      }
   }, [state]);
   
   // //logout
   const logout = () => {
      dispatch({
         type: LOGOUT_SUCCESS
      });
   }

   
   useEffect(_ => {
      dispatch({
         type: "SET_TITLE",
         payload: `Dashboard`,
      });
      
   }, []);



   return (
      <div className="relative h-full overflow-y-auto bg-gray-200 md:ml-64">
         <Sidebar logout={logout}/>
         <HeaderStats />
         <Routes>
            <Route path="/" element={<DashboardMain />} />
            
            <Route path="users" element={<DashboardUsers />} />
            <Route path="users/create" element = {<DashboardUsersCreate />} />
            <Route path="users/edit/:id" element = {<DashboardUsersCreate />} />
            <Route path="departments" element={<DashboardDepartment />} />
            <Route path="departments/create" element = {<DashboardDepartmentCreate />} />
            <Route path="departments/edit/:id" element = {<DashboardDepartmentCreate />} />
            <Route path = "orders/create" element = {<DashboardOrderCreate />} />
            <Route path = "orders/edit/:id" element = {<DashboardOrderCreate />} />
            <Route path="orders" element={<DashboardOrder />} />
         </Routes>
      </div>
   );
};
