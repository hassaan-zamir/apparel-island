import React, { useState, useContext, useEffect } from "react";
import axios from "../actions/axios";
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
   const [summary, setSummary] = useState({
      open: 0,
      sampling: 0,
      production: 0,
      quality: 0
   });

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

   useEffect(() => {
      
        
      axios.get('/order/summary/').then(
         (response) => {
            if(response.data){
               setSummary(response.data);
            }else{
               alert('Unexpected Data Occured while fetching summary details');
            }
         }
      );
      
   }, []);




   return (
      <div className="relative h-full overflow-y-auto bg-gray-200 md:ml-64">
         <Sidebar logout={logout}/>
         <HeaderStats summary={summary}/>
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
