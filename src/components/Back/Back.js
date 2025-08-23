import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
const Back = () => {
    const navigate = useNavigate();
const handleNavegaite = () => {
  navigate("/dashboard");
};
  return (
    <div>
          <div className="mb-3 flex justify-end ml-2 mt-2">
        <NavLink to="/dashboard" className="ml-1 w-3/4 md:w-fit">
          عودة الى الصفحة الرئيسية
        </NavLink>
        <FaArrowCircleLeft size={26} onClick={handleNavegaite} className='-mr-5 md:-mr-0'/>
      </div>
    </div>
  )
}

export default Back