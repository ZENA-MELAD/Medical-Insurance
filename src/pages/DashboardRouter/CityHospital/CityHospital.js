
import React, { useEffect, useRef, useState } from "react";
import Arrow from "../../../Assets/Images/photo_2024-05-20_13-51-33.jpg";
import { IoIosSearch } from "react-icons/io";
import config from "../../../Constants/environment";
import usePost from "../../../Custom Hooks/usePost";
import { PiPlusCircle } from "react-icons/pi";
import useGet from "../../../Custom Hooks/useGet";
import cities from "Assets/Data/cities";
import { Input, Radio, Space } from "antd";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { createAlert } from "components/Alert/Alert";
import { NavLink } from "react-router-dom";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";

const CityHospital = () => {
  const [city, setCity] = useState("");
  const [cityId, setCityId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [inside, setInside] = useState(true);
  const [outside, setOutside] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const [errorMessage5, setErrorMessage5] = useState("");
  const [error, setError] = useState("");
  //const [phone2,setPhone2]=useState("");
  const [callingCode, setCallingCode] = useState(""); // Separate calling code state
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOptionChange1 = (event) => {
    setSelectedOption(event.target.value);
    setInside(!inside);
    setErrorMessage("");
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption(event.target.value);
    setOutside(!outside);
    setErrorMessage("");
  };

  const handleChangePhone = (e) => {
    const input = e.target.value;

    // Ensure that the phone number doesn't include the calling code
    const numberPart = input.startsWith(callingCode + "-") ? input.slice(callingCode.length + 1) : input;

    // Verify that the input is numeric
    if (/^\d*$/.test(numberPart)) {
      setPhoneNumber(numberPart); // Update only the number part
      setError("");
      setErrorMessage4("");
    } else {
      setError("الرجاء إدخال أرقام فقط");
    }
  };
  

  
  
  
  
  

  const [data4, loading44] = useGet(config.cities);
  const [data4hh, loading4hh4] = useGet(config.hospitals);

  const handleChangeCity = (id3) => {
    const selectedCity = data4.find((item) => item.id === id3);
    if (selectedCity) {
      setCity(selectedCity.name);
      setCallingCode(selectedCity.callingCode); // Set the calling code
      setPhoneNumber(""); // Clear the previous phone number
      setCityId(id3);
    }
    console.log("kkkk"+id3)
    console.log("idddd"+ cityId)
  };

  const [loadindjj, message2, postFunc1] = usePost(config.hospitals, {
    name: hospitalName,
    enabled: false,
    inside: true,
    address: address,
    email: email,
    phone: phone,
    cityId: cityId,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    if (inside == false) {
      setErrorMessage("يرجى تحديد اذا كانت المشفى داخل أو خارج الشبكة");
      hasError = true;
      inputRef5.current.focus();
    } else {
      setErrorMessage("");
    }
    // if (!city) {
    //   setErrorMessage2("يرجى تحديد المدينة");
    //   hasError = true;
    // } else {
    //   setErrorMessage2("");
    // }
    if (!hospitalName) {
      setErrorMessage3("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage3("");
    }
    if (!phone) {
      setErrorMessage4("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage4("");
    }
    if (!address) {
      setErrorMessage5("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage5("");
    }


if (!hasError) {
      postFunc1();
      setHospitalName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setInside(false);
      setOutside(false);
      setSelectedOption("");
      inputRef1.current.focus();
      setErrorMessage("");
      setErrorMessage2("");
      setErrorMessage3("");
      setErrorMessage4("");
      setErrorMessage5("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);

  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  useEffect(() => {
    if (cityId && data4[cityId - 1]) {
      const selectedCityCallingCode = data4[cityId - 1].callingCode;
      if (!phoneNumber) {
        setCallingCode(selectedCityCallingCode); // Update the calling code if phone number is empty
      }
    }
  }, [cityId, phoneNumber]);
  return (
    <div className=" bg-gray-100 h-full w-full p-3 ">
      <div className="flex justify-between mb-4">
        <Quiries title="عرض جميع جميع المشافي" link="/dashboard/allhospital" />
        <Back />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
            <InputLabel
              label
              id="demo-simple-select-label"
              onClick={() => handleLabelClick(inputRef7)}
            >
              اختر مدينة
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityId}
              label="اختر مدينة"
              onChange={(e) => handleChangeCity(e.target.value)}
              required
              style={{
                background: "white",
                borderRadius: "40px",
                border: errorMessage2 ? "1px solid red" : "none",
              }}
              ref={inputRef7}
            >
              {data4 &&
                data4.map((item3) => (
                  <MenuItem
                    value={item3.id} // تغيير القيمة لاختيار ID المدينة
                    key={item3.id}
                  >
                    {item3.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {errorMessage2 && (
            <div className="text-red-600 text-xs text-right mr-4 mb-2  ">
              {errorMessage2}
            </div>
          )}

          <div className=" w-full mb-4">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef1)}
              style={{ cursor: "pointer" }}
            >
              اسم المشفى
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-6"
              onChange={(e) => setHospitalName(e.target.value)}
              ref={inputRef1}
              value={hospitalName}
              required
              style={{
                border: errorMessage3 ? "1px solid red" : "none",
              }}
            />
            {errorMessage3 && (
              <div className="text-red-600 text-xs text-right mr-44 mb-1  ">
                {errorMessage3}
              </div>
            )}
          </div>


<div className="w-full mb-4">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3 lg:ml-14"
              onClick={() => handleLabelClick(inputRef2)}
              style={{ cursor: "pointer" }}
            >
              رقم الهاتف
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-6 "
              ref={inputRef2}
              onChange={handleChangePhone}
              value={callingCode + "-" + phoneNumber} // تأكد أن الهاتف يتم تعيينه هنا
              required
              style={{
                border: errorMessage4 ? "1px solid red" : "none",
              }}
            />
            {errorMessage4 && (
              <div className="text-red-600 text-xs text-right mr-44 mb-2 ">
                {errorMessage4}
              </div>
            )}
          </div>

          <div className="w-full mb-4">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef3)}
              style={{ cursor: "pointer" }}
            >
              العنوان
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-6 lg:mr-16"
              ref={inputRef3}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              style={{
                border: errorMessage5 ? "1px solid red" : "none",
              }}
            />
            {errorMessage5 && (
              <div className="text-red-600 text-xs text-right mr-44 mb-2 ">
                {errorMessage5}
              </div>
            )}
          </div>

          <div className="w-full mb-4">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef4)}
              style={{ cursor: "pointer" }}
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={inputRef4}
            />
          </div>


{/* <div className="flex justify-start ml-16 mt-3">
            <label className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3">
              داخل الشبكة
            </label>
            <Radio.Group onChange={handleOptionChange1} value={inside}>
              <Space direction="horizontal">
                <Radio value={true}>نعم</Radio>
                <Radio value={false}>لا</Radio>
              </Space>
            </Radio.Group>
          </div> */}
          <div className="flex pt-3 md:w-1/3 md:ml-0 ">
            <label
              className="w-2/6 font-extrabold text-xl md:w-2/6 md:text-xl"
              onClick={() => handleLabelClick(inputRef5)}
              style={{ cursor: "pointer" }}
              htmlFor="in"
            >
              داخل الشبكة
            </label>
            <input
              type="radio"
              value="inside"
              id="in"
              checked="true"
              onChange={handleOptionChange1}
              className="rounded-2xl p-2  w-5 md:w-7 md:ml-1 lg:w-6"
              ref={inputRef5}
              // onKeyDown={(e) => handleKeyDown(e, inputRef8)}
            />
          </div>
          {/* <div className="flex justify-start ml-16 mt-3">
            <label className="w-2/6 text-lg ml-10 md:w-1/3 font-semibold md:mt-1 md:text-lg lg:w-1/3">
              خارج الشبكة
            </label>
            <Radio.Group onChange={handleOptionChange2} value={outside}>
              <Space direction="horizontal">
                <Radio value={true}>نعم</Radio>
                <Radio value={false}>لا</Radio>
              </Space>
            </Radio.Group>
          </div> */}
        </div>

        <div className="flex justify-end items-center w-full mt-3 ">
          <div className="flex mt-44 justify-end p-2 w-full">
            <div
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6"
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

export default CityHospital;