
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import usePost from "Custom Hooks/usePost";
import { IoIosSearch } from "react-icons/io";
import React, { useRef, useState, useEffect } from "react";
import { createAlert } from "components/Alert/Alert";
import { NavLink } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";

const Specializatio = () => {
  const [depart, setDepart] = useState("");
  const [data4, loading44] = useGet(config.engineeringedepars);
  const [depId, setDepId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [data5, loading5] = useGet(config.specializations);
  const inputRef3 = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (data4 && depart) {
      const selectedDept = data4.find((item) => item.name === depart);
      if (selectedDept) {
        setDepId(selectedDept.id);
        const filteredSpecializations = data5.filter(
          (item) => item.engineeringeDeparId === selectedDept.id
        );
        setSpecializations(filteredSpecializations);
      }
    }
  }, [depart, data4, data5]);

  const handleChange5b = (event) => {
    setDepart(event.target.value);
    setErrorMessage1("");
  };

  // const [loagindkk,message1, postFunc] = usePost(config.engineeringedepars, {
  //   name: depart,
  // });
  const [loadindjj, message, postFunc1] = usePost(config.specializations, {
    engineeringeDeparId: depId,
    name: specialization,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
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
  const handleName = (event) => {
    setSpecialization(event.target.value);
    setErrorMessage("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!specialization) {
      setErrorMessage("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage("");
    }
    if (!depart) {
      setErrorMessage1("يرجى تحديد القسم الهندسي ");
      hasError = true;
    } else {
      setErrorMessage1("");
    }
    if (!hasError) {
      postFunc1();
      setSpecialization("");

      inputRef3.current.focus();
      setErrorMessage("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };


const handleLabelClick3 = () => {
    if (inputRef3.current) {
      inputRef3.current.focus();
    }
  };
  useEffect(() => {
    inputRef3.current.focus();
  }, []);
  return (
    <div className=" bg-gray-100 h-full w-full p-3">
      {/* <div className="w-full flex-col justify-center items-center p-2 md:flex md:flex-row md:justify-normal ">
        <div className=" relative w-full mt-3 flex justify-center items-center lg:px-6 ">
          <input
            type="search"
            placeholder="ابحث هنا"
            className=" bg-gray-300 w-full placeholder:text-black rounded-full p-3  pr-14"
          />
          <IoIosSearch className="absolute left-8 top-3  h-6 w-6  md:right-6 lg:right-10  " />
        </div>
      </div> */}
      <div className="flex justify-between mb-3">
     
     <Quiries title="عرض جميع الاختصاصات الهندسية" link="/dashboard/allspecialization"/>
     <Back/>
     </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          <div className="flex pt-3 md:w-full md:ml-3">
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel label id="demo-simple-select-label">
                اختر قسم هندسي
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={depart}
                label="اختر قسم هندسي"
                onChange={handleChange5b}
                required
                style={{
                  background: "white",
                  borderRadius: "40px",
                }}
              >
                {data4 &&
                  data4.map((item3, index3) => (
                    <MenuItem value={item3.name} key={index3}>
                      {item3.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {errorMessage && (
              <div className="text-red-600 text-xs text-right -mr-36  mt-16  ">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="flex items-center pt-3 md:w-full md:ml-3 mr-3">
            <label
              className="w-2/6 text-sm   md:w-2/5 md:ml-5   md:mt-1 md:text-xl lg:w-1/4"
              onClick={handleLabelClick3}
              style={{ cursor: "pointer" }}
            >
              الاختصاص الهندسي
            </label>
            <input
              type="text"
              className="rounded-2xl p-2  w-3/4 md:w-1/2 md:ml-1"
              ref={inputRef3}
              value={specialization}
              onChange={handleName}
              onKeyDown={(e) => handleKeyDown(e, inputRef)}
              style={{
                border: errorMessage ? "1px solid red" : "none",
              }}
            />
            {errorMessage && (
              <div className="text-red-600 text-xs text-right mr-48  mt-2  ">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center w-full mt-32  ">
          <div className="flex justify-end p-2 w-full">
            <div className="flex mt-44 justify-end p-2 w-full">
              <div
                className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6"
                tabIndex={0}
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                onClick={handleSubmit}
                id="submitButton"
              >
                {/* <PiPlusCircle color="white" className="w-5 h-5 ml-2" /> */}
                <span style={{ color: "white" }}>إضافة</span>
              </div>
            </div>
          </div>
        </div>
      </form>
   
    </div>
  );
};

export default Specializatio;