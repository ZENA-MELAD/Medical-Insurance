import React, { useEffect, useRef, useState } from "react";
import Arrow from "../../../Assets/Images/photo_2024-05-20_13-51-33.jpg";
import { IoIosSearch } from "react-icons/io";
import { PiPlusCircle } from "react-icons/pi";
import usePost from "../../../Custom Hooks/usePost";
import config from "../../../Constants/environment";
import useGet from "Custom Hooks/useGet";
import { createAlert } from "components/Alert/Alert";
import { NavLink } from "react-router-dom";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";
const SurgicalProcedures = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [nameS, setNameS] = useState();
  const [data4, loading44] = useGet(config.surgicalprocedures);
  const [financial, setFinancial] = useState(false);
  const [technical, setTechnical] = useState(false);
  const [ratio, setRatio] = useState("");
  const [limit, setLimit] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [data, message, postFunc] = usePost(config.surgicalprocedures, {
    name: name,
    // type: type,
    pathological_specialization: nameS,
    // technical: technical,
    // financial: financial,
    // limit: limit,
    enduranceRatio: ratio,
  });

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef6 = useRef(null);

  const inputRef5 = useRef(null);
  const inputRef8 = useRef(null);

  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const handleOptionChange1 = (event) => {
    setSelectedOption(event.target.value);
    setFinancial(!financial);
    setErrorMessage("");
  };
  const handleOptionChange2 = (event) => {
    setSelectedOption(event.target.value);
    setTechnical(!technical);
    setErrorMessage("");
  };
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
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
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const [errorMessage5, setErrorMessage5] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const handleName = (event) => {
    setName(event.target.value);
    setErrorMessage2("");
  };
//   const handleRatio = (e) => {
//     const newValue = e.target.value;
//     if (/^\d*$/.test(newValue)) {
//       setRatio(newValue);
//       setError2("");
//       setErrorMessage5("");
//  } 
//  else{
//   setError2("الرجاء إدخال أرقام فقط");
//  }
//  };
  const handleNames = (event) => {
    setNameS(event.target.value);
    setErrorMessage3("");
  };
  const handleLimit = (e) => {

   const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setLimit(newValue);
      setError3("");
      setErrorMessage4("");
 } 
 else{
  setError3("الرجاء إدخال أرقام فقط");
 }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;


if (!name) {
      setErrorMessage2(" هذا الحقل مطلوب ");
      hasError = true;
    } else {
      setErrorMessage2("");
    }
    // if (!limit) {
    //   setErrorMessage4(" هذا الحقل مطلوب ");
    //   hasError = true;
    // } else {
    //   setErrorMessage4("");
    // }
    if (!nameS) {
      setErrorMessage3(" هذا الحقل مطلوب ");
      hasError = true;
    } else {
      setErrorMessage3("");
    }
    // if (!ratio) {
    //   setErrorMessage5(" هذا الحقل مطلوب ");
    //   hasError = true;
    // } else {
    //   setErrorMessage5("");
    // }
    // if (!financial && !technical) {
    //   setErrorMessage("يرجى تحديد نوع الإجراء المرضي");
    //   inputRef2.current.focus();
    //   hasError = true; // أضف هذه العبارة لتعيين hasError إلى true
    // } else {
    //   setErrorMessage("");
    // }

    if (!hasError) {
      postFunc();

      setName("");
      setNameS("");


// setFinancial(false);
//       setTechnical(false);
      setSelectedOption("");
      setLimit("");
      // setRatio("");
      inputRef.current.focus();
      setErrorMessage("");
      setErrorMessage2("");
      
      setErrorMessage5("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

  return (
    <div className=" bg-gray-100 h-full w-full p-1  ">
     <div className="flex justify-between mb-4">
     
     <Quiries title="عرض جميع الإجراءات المرضية" link="/dashboard/allsurgicalproced"/>
     <Back/>
     </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-3 mr-5">
          <div className=" pt-10  md:w-full md:ml-3">
            <label
              className="w-2/6 text-lg md:w-2/5    md:mt-1 md:text-xl md:mr-1 lg:w-1/4"
              onClick={handleLabelClick}
              style={{ cursor: "pointer" }}
            >
              اسم الإجراء المرضي
            </label>
            <input
              type="text"
              className="rounded-2xl p-2  w-3/4 md:w-1/2 md:ml-1 md:mr-20"
              ref={inputRef}
              value={name}
              onChange={handleName}
              onKeyDown={(e) => handleKeyDown(e, inputRef5)}
              style={{
                border: errorMessage2 ? "1px solid red" : "none",
              }}
            />
            {setErrorMessage2 && (
              <div className="text-red-600 text-xs text-right mr-60  mt-2  ">
                {errorMessage2}
              </div>
            )}
          </div>

          {/* <div className=" pt-3 md:w-full md:ml-3">
            <label
              className="w-2/6 text-lg md:w-2/5    md:mt-1 md:text-xl md:mr-1 lg:w-1/4"
              onClick={handleLabelClick}
              style={{ cursor: "pointer" }}
            >
              اسم التخصص الطبي
            </label>
            <input
              type="text"
              className="rounded-2xl p-2  w-3/4 md:w-1/2 md:ml-1 md:mr-16 "
              ref={inputRef5}
              value={nameS}
              onChange={handleNames}
              onKeyDown={(e) => handleKeyDown(e, inputRef8)}
              style={{
                border: errorMessage3 ? "1px solid red" : "none",
              }}
            />
            {setErrorMessage3 && (
              <div className="text-red-600 text-xs text-right mr-60  mt-2  ">
                {errorMessage3}
              </div>
            )}
          </div> */}
          {/* <div className="flex pt-3 md:w-full md:ml-3">
            <label
              className="w-2/6 text-lg md:w-2/5 md:text-xl  md:mt-1  lg:w-1/4"
              onClick={handleLabelClick}
              style={{ cursor: "pointer" }}
            >
              نوع الاجراء الطبي
            </label>


<div className="flex justify-between items-center">
              <div className="flex pt-3 md:w-1/3 md:ml-0 ">
                <label
                  className="w-2/6 font-extrabold text-xl md:w-2/6"
                  onClick={() => handleLabelClick(inputRef5)}
                  style={{ cursor: "pointer" }}
                  htmlFor="in"
                >
                  فني
                </label>
                <input
                  type="radio"
                  value="technical"
                  id="in"
                  checked={selectedOption === "technical"}
                  onChange={handleOptionChange1}
                  className="rounded-2xl p-2 mr-5  w-5 md:w-7 md:ml-1"
                  ref={inputRef2}
                  onKeyDown={(e) => handleKeyDown(e, inputRef3)}
                />
              </div>
              <div className="flex pt-3 md:w-1/3 md:ml-0 ">
                <label
                  className="w-2/6 font-extrabold text-xl md:w-2/6"
                  onClick={() => handleLabelClick(inputRef6)}
                  style={{ cursor: "pointer" }}
                  htmlFor="out"
                >
                  مالي
                </label>
                <input
                  className="rounded-2xl p-2 mr-5   w-5 md:w-7 md:ml-1"
                  id="out"
                  type="radio"
                  value="financial "
                  checked={selectedOption === "financial "}
                  onChange={handleOptionChange2}
                  ref={inputRef3}
                  onKeyDown={(e) => handleKeyDown(e, inputRef10)}
                />
              </div>
            </div>
          </div> */}
          {/* {setErrorMessage && (
            <div className="text-red-600 text-xs text-right mr-64  mt-2  ">
              {errorMessage}
            </div>
          )} */}
          {/* <div className=" pt-3 md:w-full md:ml-3">
            <label
              className="w-2/6 text-lg md:w-2/5    md:mt-1 md:text-xl lg:w-1/4"
              onClick={handleLabelClick}
              style={{ cursor: "pointer" }}
            >
              الحد الأقصى للإجراء
            </label>
            <input
              type="text"
              className="rounded-2xl p-2  w-3/4 md:w-1/2 md:ml-1 md:mr-24 "
              ref={inputRef10}
              value={limit}
              onChange={handleLimit}
              onKeyDown={(e) => handleKeyDown(e, inputRef11)}
              style={{
                border: errorMessage4 ? "1px solid red" : "none",
              }}
              placeholder={error3}
            />
            {setErrorMessage4 && (
              <div className="text-red-600 text-xs text-right mr-60  mt-2  ">
                {errorMessage4}
              </div>
            )}
          </div> */}
          {/* <div className=" pt-3 md:w-full md:ml-3">
            <label
              className="w-2/6 text-lg md:w-2/5    md:mt-1 md:text-xl lg:w-1/4"
              onClick={handleLabelClick}
              style={{ cursor: "pointer" }}
            >
              نسبة التحمل لهذا الإجراء
            </label>
            <input
              type="text"
              className="rounded-2xl p-2  w-3/4 md:w-1/2 md:ml-1 md:mr-14 "
              ref={inputRef11}
              value={ratio}
              onChange={handleRatio}
              onKeyDown={(e) => handleKeyDown(e, inputRef8)}
              style={{
                border: errorMessage5 ? "1px solid red" : "none",
              }}
              placeholder={error2}
            />
            {setErrorMessage5 && (
              <div className="text-red-600 text-xs text-right mr-60  mt-2  ">
                {errorMessage5}
              </div>
            )}
          </div> */}
          <div className="flex mt-16 justify-end p-2  w-full ">
            <div
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 lg:ml-3 md:w-1/4 lg:w-1/6"
              tabIndex={0}
              ref={inputRef8}


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

export default SurgicalProcedures;