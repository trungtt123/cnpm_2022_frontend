import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";
import "../styles/DashBoard.css";
import _ from "lodash";
import { loadUser } from "../Redux/authSlice";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const userData = useRef({});
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  
  return (
    <>
      <div className="container">DASHBOARD</div>
    </>
  );
};
export default DashBoard;
