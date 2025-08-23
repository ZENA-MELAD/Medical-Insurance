
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { PiPlusCircle } from "react-icons/pi";
import usePost from "../../../Custom Hooks/usePost";
import config from "../../../Constants/environment";
import useGet from "../../../Custom Hooks/useGet";
import { createAlert } from "components/Alert/Alert";
import axios from "axios";

import { NavLink } from "react-router-dom";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";
const UnitWorkPlace = () => {
  const [nameU, setNameU] = useState("");
  const [emailpresident, setEmailpresident] = useState("");
  const [namepresident, setNamepresident] = useState("");
  const [phonepresiden, setPhonepresiden] = useState("");
  const [number, setNumber] = useState("");
  const [dataId, setDataId] = useState();

  const [data44, loading44] = useGet(config.engineeringunits);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");

  const [loading34, message, postFunc3] = usePost(config.engineeringunits, {
    engineeringUnitsId: dataId,
    name: nameU,
    emailpresident: emailpresident,
    namepresident: namepresident,
    phonepresident: phonepresiden,
    number: number,
  });

  // const handleSearch = () => {
  //   axios
  //     .get(${config.baseUrl1}/${config.searchByEngUnits}/${data11})
  //     .then((res) => {
  //       setData10(res.data);

  //       console.log(res.data); // Corrected logging
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef7 = useRef(null);

  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() === "" && e.target !== inputRef3.current) {
        e.target.focus();
      } else {
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    }
  };
  const handleChangeNumber = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setNumber(newValue);
      setError("");
      setErrorMessage1("");
    } else {
      setError("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangeNameU = (e) => {
    setNameU(e.target.value);
    setErrorMessage2("");
  };
  const handleChangeNameP = (e) => {
    setNamepresident(e.target.value);
    setErrorMessage3("");
  };
  const handleChangePhone = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setPhonepresiden(newValue);
      setError2("");
      setErrorMessage4("");
    } else {
      setError2("الرجاء إدخال أرقام فقط");
    }
  };
  // const handleDelete = (record) => {
  //   const unitToDelete =
  //     data44 && data44.find((item) => item.name === "unit33");

  //   if (unitToDelete) {
  //     axios
  //       .delete(
  //         ${config.baseUrl1}/${config.engineeringunits}/${unitToDelete.id}
  //       )
  //       .then((res) => {
  //         console.log(Deleted unit with name: ${unitToDelete.name});
  //         // يمكنك تحديث الحالة هنا إذا لزم الأمر
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     console.log("Unit not found");
  //   }
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!number) {
      setErrorMessage1("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage1("");
    }

    if (!nameU) {
      setErrorMessage2("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage2("");
    }


if (!namepresident) {
      setErrorMessage3("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage3("");
    }
    if (!phonepresiden) {
      setErrorMessage4("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage4("");
    }

    if (!hasError) {
      postFunc3();

      setNameU("");
      setEmailpresident("");
      setPhonepresiden("");
      setNamepresident("");
      setNumber("");
      inputRef7.current.focus();
      setErrorMessage1("");
      setErrorMessage2("");
      setErrorMessage3("");
      setErrorMessage4("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

  useEffect(() => {
    inputRef7.current.focus();
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full p-3">
      <div className="flex justify-between mb-3">
     
      <Quiries title="عرض جميع الوحدات الهندسية" link="/dashboard/allunits"/>
      <Back/>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full mt-4">
          <div className="w-full">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3  md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef7)}
              style={{ cursor: "pointer" }}
            >
              رقم الوحدة الهندسية
            </label>
            <input
              ref={inputRef7}
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-6"
              value={number}
              type="text"
              onChange={handleChangeNumber}
              onKeyDown={(e) => handleKeyDown(e, inputRef)}
              style={{
                border: errorMessage1 ? "1px solid red" : "none",
              }}
              placeholder={error}
            />

            {errorMessage1 && (
              <div className="text-red-600 text-xs text-right mr-56 mb-2  ">
                {errorMessage1}
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <label
              className="w-2/6 text-lg  ml-9 md:w-1/3 md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef)}
              style={{ cursor: "pointer" }}
            >
              اسم الوحدة الهندسية
            </label>
            <input
              ref={inputRef}
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mr-5"
              value={nameU}
              onChange={handleChangeNameU}
              onKeyDown={(e) => handleKeyDown(e, inputRef1)}
              required
              style={{
                border: errorMessage2 ? "1px solid red" : "none",
              }}
            />
            {errorMessage1 && (
              <div className="text-red-600 text-xs text-right mr-56 mb-2  ">
                {errorMessage1}
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <label
              className="w-2/6 text-lg ml-12 md:w-2/5 md:mt-1 md:text-lg lg:w-1/4"
              onClick={() => handleLabelClick(inputRef1)}
              style={{ cursor: "pointer" }}
            >
              اسم رئيس الوحدة
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 mr-3 w-3/6 md:ml-1 md:mr-8"
              value={namepresident}
              onChange={handleChangeNameP}
              ref={inputRef1}
              onKeyDown={(e) => handleKeyDown(e, inputRef2)}
              required
              style={{
                border: errorMessage3 ? "1px solid red" : "none",
              }}
            />
            {errorMessage1 && (
              <div className="text-red-600 text-xs text-right mr-56 mb-2  ">
                {errorMessage1}
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <label
              className="w-2/6 text-lg ml-3 md:w-2/5 md:mt-1  md:text-lg lg:w-1/4"
              onClick={() => handleLabelClick(inputRef2)}
              style={{ cursor: "pointer" }}
            >
              رقم موبايل رئيس الوحدة
            </label>
            <input
              ref={inputRef2}
              type="text"


className="rounded-2xl p-2 w-3/6 md:ml-1 md:mr-5"
              value={phonepresiden}
              onChange={handleChangePhone}
              onKeyDown={(e) => handleKeyDown(e, inputRef3)}
              style={{
                border: errorMessage4 ? "1px solid red" : "none",
              }}
              placeholder={error2}
            />
            {/* {error2 && (
              <p className=" text-red-600 text-sm text-center">{error2}</p>
            )} */}
            {errorMessage1 && (
              <div className="text-red-600 text-xs text-right mr-56 mb-2  ">
                {errorMessage1}
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <label
              className="w-2/6 text-lg ml-14 md:w-2/5 md:mt-1 md:text-lg lg:w-1/4"
              onClick={() => handleLabelClick(inputRef3)}
              style={{ cursor: "pointer" }}
            >
              ايميل رئيس الوحدة
            </label>
            <input
              ref={inputRef3}
              type="email"
              className=" rounded-2xl p-2 w-3/6 md:ml-1 md:mr-5"
              value={emailpresident}
              onChange={(e) => setEmailpresident(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, inputRef5)}
            />
          </div>
          <div className="flex mt-44 justify-end p-2 w-full">
            <div
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6"
              tabIndex={0}
              ref={inputRef5}
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

export default UnitWorkPlace;