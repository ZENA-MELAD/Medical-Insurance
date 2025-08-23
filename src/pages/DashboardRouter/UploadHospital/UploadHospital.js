import React, { useState } from "react";
import axios from "axios";
import config from "Constants/environment";
import { NavLink } from "react-router-dom";
import Back from "components/Back/Back";

const UploadHospital = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${config.baseUrl1}/${config.claims}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="w-full h-full bg-gray-100 p-1">
      <div className="flex justify-end">
      {/* <div className="text-left mt-3 mr-3">
        <NavLink to="/dashboard/addclaims" className="text-slate-600 underline ">
         إضافة استرداد
        </NavLink>
      </div> */}
      <Back/>
      </div>

  <form onSubmit={handleSubmit}>
 <div className="flex justify-center items-center w-full pt-10 lg:-mr-14">
  <label
    htmlFor="file-upload"
    className="text-center bg-slate-600 rounded-full text-sm p-2 md:text-lg ml-10    text-white"
  >
    استعراض الملفات
  </label>
  <input
    type="file"
    id="file-upload"
    style={{ display: "none" }}
    onChange={handleFileChange}
  />
  <input
    type="text"
    value={fileName}
    readOnly
    placeholder="رابط الملف"
    className="w-4/6 bg-white rounded-full p-2 md:p-3 "
  />
</div>
<div className="flex justify-center md:justify-end w-full mt-80 ">
  <div className="flex justify-center items-center bg-slate-600  shadow-md rounded-full  py-0  mt-2  h-10 w-4/6 md:w-1/4  lg:w-1/6">
    <input
      
      style={{ color: "white" }}
      value="تحميل"
      type="submit"
    />
  </div>
</div>
</form> 

    </div>
  );
};

export default UploadHospital;


