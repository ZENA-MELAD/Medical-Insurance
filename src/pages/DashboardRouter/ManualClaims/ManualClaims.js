import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import React, { useEffect, useRef, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import usePost from "Custom Hooks/usePost";
import { NavLink } from "react-router-dom";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";
import axios from "axios";

const ManualClaims = () => {
  const [dataH, loading] = useGet(config.hospitals);
  const [dataS, loading2] = useGet(config.surgicalprocedures);
  const [hospital, setHospital] = useState("");
  const [surgical, setSurgical] = useState("");
  // const [loginDate, setLoginDate] = useState(null);
  // const [exitDate, setExitDate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [ensuranceNumber, setEnsuranceNumber] = useState("");
  const [companyFees, setCompanyFees] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [approvedPrice, setApprovedPrice] = useState("");
  const [nonAdd, setNonAdd] = useState("");
  const [enduranceRatio, setEnduranceRatio] = useState("");
  const [nonAddForPerson, setNonAddForPerson] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [surgicalId, setSurgicalId] = useState("");
  const [dateTod, setDateTod] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [allInfo, setAllInfo] = useState("");
  const [claimNum, setClaimNum] = useState("");
  const [personId, setPersonId] = useState("");
  const [error1, setError1] = useState();
  const [error2, setError2] = useState();
  const [error3, setError3] = useState();
  const [error4, setError4] = useState();
  const [error5, setError5] = useState();
  const [error6, setError6] = useState();
  const [error7, setError7] = useState();
  const [error8, setError8] = useState();
  const handleChange3 = (event) => {
    setHospital(event.target.value);
  };

  const handleChange4 = (event) => {
    setSurgical(event.target.value);
  };

  const handleChangeH = (id) => {
    setHospitalId(id);
  };

  const handleChangeS = (id2) => {
    setSurgicalId(id2);
  };

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);

  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    inputRef1.current.focus();
  }, []);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() === "") {
        e.target.focus();
      } else {
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    }
  };
const handleChangeNum=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
  setClaimNum(newValue)
    setError1("");
  } else {
    setError1("الرجاء إدخال أرقام فقط");
  }
}
const handleChangeEnc=(e)=>{
  const newValue=e.target.value;
  if (/^[\d-]*$/.test(newValue)) {
  setEnsuranceNumber(newValue)
    setError2("");
  } else {
    setError2("الرجاء إدخال أرقام فقط");
  }
}
const handleChangeTotal=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
  setTotalPrice(newValue)
    setError3("");
  } else {
    setError3("الرجاء إدخال أرقام فقط");
  } 
}
const handleChangeApprovied=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
setApprovedPrice(newValue)
    setError4("");
  } else {
    setError4("الرجاء إدخال أرقام فقط");
  } 
}
const handleEnduranceRatio=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
setEnduranceRatio(newValue)
    setError5("");
  } else {
    setError5("الرجاء إدخال أرقام فقط");
  } 
}
const handleNonAdd=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
setNonAdd(newValue)
    setError6("");
  } else {
    setError6("الرجاء إدخال أرقام فقط");
  } 
}
const handleCompanyFees=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
setCompanyFees(newValue)
    setError7("");
  } else {
    setError7("الرجاء إدخال أرقام فقط");
  } 
}
const handleChangeNonAddForPerson=(e)=>{
  const newValue=e.target.value;
  if (/^\d*$/.test(newValue)) {
setNonAddForPerson(newValue)
    setError8("");
  } else {
    setError8("الرجاء إدخال أرقام فقط");
  }   
}
  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.searchByEnsurance}/${ensuranceNumber}`)
      .then((res) => {
        console.log(res.data);
        setAllInfo(res.data);
        const fullName = `${res.data.firstName || ""} ${
          res.data.fatherName || ""
        } ${res.data.lastName || ""}`.trim();
        setFullName(fullName);
        setPersonId(res.data.personId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ensuranceNumber]);

  const [loading4, message2, postFunc2] = usePost(config.addClaim, {
    ensuranceNumber: ensuranceNumber,
    fullName: fullName,
    totalPrice: totalPrice,
    company_fees: companyFees,
    approvedPrice: approvedPrice,
    non_Add: nonAdd,
    non_AddForPerson: nonAddForPerson,
    enduranceRatio: enduranceRatio,
    hospitalId: hospitalId,
    loginDate: "2024-09-15T09:25:27.726Z",
    exitDate: "2024-09-15T09:25:27.726Z",
    personId: personId,
    surgicalProceduresId: surgicalId,
    climeData: dateTod,
    number: claimNum,
    year: selectedDate?.getFullYear() || 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postFunc2();
    // Reset form fields after successful submission
    setHospital("");
    setSurgical("");
    setFullName("");
    setEnsuranceNumber("");
    setApprovedPrice("");
    setCompanyFees("");
    setEnduranceRatio("");
    setNonAdd("");
    setNonAddForPerson("");
    setTotalPrice("");
    setClaimNum("");
  };
  useEffect(() => {
    // الحصول على تاريخ اليوم
    const today = new Date().toISOString().split("T")[0];
    // تعيين التاريخ الحالي كقيمة لحقل الإدخال
    setDateTod(today);
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <div className="flex justify-between mb-5">
        <Quiries title="عرض جميع المطالبات" link="/dashboard/allclaimsmanual" />
        <Back />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="w-full  mb-1 items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex justify-start pt-3 mr-2 md:w-1/2 md:ml-2 lg:mb-3">
              <label
                className="w-1/3 text-sm mt-1 md:w-2/6 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg"
                style={{ cursor: "pointer" }}
              >
                العام
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 mr-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2 lg:px-10 lg:py-3"
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef1)}
              >
                رقم المطالبة
              </label>
              <input
                ref={inputRef1}
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-3 lg:-mr-2"
                onChange={handleChangeNum}
                onKeyDown={(e) => handleKeyDown(e, inputRef2)}
                value={claimNum}
                placeholder={error1}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
              >
                التاريخ الحالي
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1 lg:-mr-4 "
                readOnly
                value={dateTod}
              />
            </div>
          </div>

          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef2)}
              >
                الرقم التأميني
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef2}
                onKeyDown={(e) => handleKeyDown(e, inputRef3)}
                onChange={handleChangeEnc}
                value={ensuranceNumber}
                placeholder={error2}
              />
            </div>
            <div className="flex items-center pt-3 md:w-1/2">
              <p className="w-2/6 md:w-2/5  md:text-sm md:mt-1 ">
                الاسم الكامل
              </p>
              <p className="rounded-2xl p-5 ml-10 w-4/6 md:w-1/2  md:ml-1 lg:w-1/2  bg-gray-400 lg:-m-3">
                {fullName}
              </p>
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef3)}
              >
                قيمة المطالبة
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef3}
                onKeyDown={(e) => handleKeyDown(e, inputRef4)}
                onChange={handleChangeTotal}
                value={totalPrice}
                placeholder={totalPrice}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef4)}
              >
                الموافق عليه
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef4}
                onKeyDown={(e) => handleKeyDown(e, inputRef5)}
                onChange={handleChangeApprovied}
                value={approvedPrice}
                placeholder={error4}
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef5)}
              >
                قيمة التحمل
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef5}
                onKeyDown={(e) => handleKeyDown(e, inputRef6)}
                onChange={handleEnduranceRatio}
                value={enduranceRatio}
                placeholder={error5}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef6)}
              >
                المبلغ الصافي
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef6}
                onKeyDown={(e) => handleKeyDown(e, inputRef7)}
                onChange={handleNonAdd}
                value={nonAdd}
                placeholder={error6}
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef7)}
              >
                أتعاب الشركة
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef7}
                onKeyDown={(e) => handleKeyDown(e, inputRef8)}
                onChange={handleCompanyFees}
                value={companyFees}
                placeholder={error7}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef8)}
              >
                الصافي للمؤمن
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef8}
                onKeyDown={(e) => handleKeyDown(e, inputRef9)}
                onChange={handleChangeNonAddForPerson}
                value={nonAddForPerson}
                placeholder={error8}
              />
            </div>
          </div>
          {/* <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex items-center pt-3 md:w-1/2 md:ml-2">
              <label
                className="w-1/6 ml-28 md:w-2/6 md:text-sm lg:ml-0"
                style={{ cursor: "pointer" }}
              >
                تاريخ الدخول الى المشفى
              </label>
              <DatePicker
                selected={loginDate}
                onChange={(date) => setLoginDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-3  w-fit md:w-11/12 md:ml-1 lg:mr-8 lg:w-full"
                value={loginDate}
              />
            </div>
            <div className="flex items-center pt-3 md:w-1/2 md:ml-2">
              <label
                className="w-1/6 ml-28 md:w-2/6 md:text-sm lg:ml-0"
                style={{ cursor: "pointer" }}
              >
                تاريخ الخروج من المشفى
              </label>
              <DatePicker
                selected={exitDate}
                onChange={(date) => setExitDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="اضغط لاختيار التاريخ"


className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-3  w-fit md:w-11/12 md:ml-1 lg:mr-8 lg:w-full"
                value={exitDate}
              />
            </div>
          </div> */}
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel id="demo-simple-select-label">اسم المشفى</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hospital}
                label=" اسم المشفى"
                onChange={handleChange3}
                style={{ background: "white", borderRadius: "40px" }}
              >
                {dataH &&
                  dataH.map((item4) => (
                    <MenuItem
                      value={item4.name}
                      key={item4.id}
                      onClick={() => handleChangeH(item4.id)}
                    >
                      {item4.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
              >
                اسم المشفى
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1 "
              />
            </div> */}
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel id="demo-simple-select-label">
                اسم الإجراء المرضي
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={surgical}
                label=" اسم الإجراء المرضي"
                onChange={handleChange4}
                style={{ background: "white", borderRadius: "40px" }}
              >
                {dataS &&
                  dataS.map((item4) => (
                    <MenuItem
                      value={item4.name}
                      key={item4.id}
                      onClick={() => handleChangeS(item4.id)}
                    >
                      {item4.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end p-2 w-full">
            <div
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6"
              tabIndex={0}
              ref={inputRef9}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              onClick={handleSubmit}
              id="submitButton"
            >
              {/* <PiPlusCircle color="white" className="w-5 h-5 ml-2" /> */}
              <span style={{ color: "white" }}>إضافة</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManualClaims;