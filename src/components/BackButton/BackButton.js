import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
const BackButton = () => {
    const navigate = useNavigate();
    const handleNavegaite = () => {
      navigate(-1);
    };
  return (
    <div>
              <div className="mb-3 flex justify-end ml-7 mt-2">
        <NavLink  className="ml-1" onClick={handleNavegaite}>
          عودة
        </NavLink>
        <button>
        <FaArrowCircleLeft size={26} onClick={handleNavegaite} />
        </button>
      </div>
    </div>
  )
}

export default BackButton