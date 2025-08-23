import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import React, { useEffect, useRef, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import usePost from "Custom Hooks/usePost";
import { NavLink } from "react-router-dom";
import useGet2 from "Custom Hooks/useGet2";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";

const AddClaims = () => {
  const [dataH, loading] = useGet(config.hospitals);
  const [dataS, loading2] = useGet(config.surgicalprocedures);
  const [hospital, setHospital] = useState("");
  const [surgical, setSurgical] = useState("");
  const [loginDate, setLoginDate] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const [surgicalDate, setSurgicalDate] = useState(null);
  const [count, setCount] = useState();
  const [count1, setCount1] = useState();
  const [bookNumber, setBookNumber] = useState("");
  const [recoveryNum, setRecoveryNum] = useState("");
  const [ensuranceNumber, setEnsuranceNumber] = useState("");
  const [companyFees, setCompanyFees] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [approvedPrice, setApprovedPrice] = useState("");
  const [nonAdd, setNonAdd] = useState("");
  const [enduranceRatio, setEnduranceRatio] = useState("");
  const [nonAddForPerson, setNonAddForPerson] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [surgicalId, setSurgicalId] = useState("");
  const [phone, setPhone] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");

  const[personId,setPersonId]=useState("")
  const [dateTod, setDateTod] = useState();
  const[fullName,setFullName]=useState("")
  const [error1, setError1] = useState();
  const [error2, setError2] = useState();
  const [error3, setError3] = useState();
  const [error4, setError4] = useState();
  const [error5, setError5] = useState();
  const [message, setMessage] = useState();
  const [hospital1, setHospital1] = useState();
  const [hospitalOut, setHospitalOut] = useState("");
  const handleChange3 = (event) => {
    setHospital(event.target.value);
  };
  const handleChange33 = (event) => {
    setHospital1(event.target.value);
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
  // useEffect(() => {
  //   axios
  //     .get(`${config.baseUrl1}/${config.recovereds}`)
  //     .then((res) => {
  //       setDataR(res.data.recovereds);

  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   const c = dataR ? dataR.length + 1 : null;
  //   setCount(c);
  // }, [dataR]);
  useEffect(() => {
    // الحصول على تاريخ اليوم
    const today = new Date().toISOString().split("T")[0];
    // تعيين التاريخ الحالي كقيمة لحقل الإدخال
    setDateTod(today);
  }, []);
  const inputRef = useRef(null);
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
  const handleChangeBookNum = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setBookNumber(newValue);
      setError1("");
    } else {
      setError1("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangeRecoveryNum = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setRecoveryNum(newValue);
      setError2("");
    } else {
      setError2("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangePhone = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setPhone(newValue);
      setError3("");
    } else {
      setError3("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangeEnc = (e) => {
    const newValue = e.target.value;
    if (/^[\d-]*$/.test(newValue)) {
      setEnsuranceNumber(newValue);
      setError4("");
    } else {
      setError4("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangeInvoiceValue = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInvoiceValue(newValue);
      setError5("");
    } else {
      setError5("الرجاء إدخال أرقام فقط");
    }
  };
  
    useEffect(() => {
      axios
        .get(`${config.baseUrl1}/${config.searchByEnsurance}/${ensuranceNumber}`)
        .then((res) => {
          console.log(res.data);
       setPersonId(res.data.personId)
       const fullName = `${res.data.firstName || ""} ${
        res.data.fatherName || ""
      } ${res.data.lastName || ""}`.trim();
      setFullName(fullName);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [ensuranceNumber]);
  const [loading4, message2, postFunc2] = usePost(config.recovereds, {
    ensuranceNumber: ensuranceNumber,
    fullName: fullName,
    totalPrice: invoiceValue,
    company_fees: 0,
    approvedPrice: 0,
    non_Add: 0,
    non_AddForPerson: 0,
    enduranceRatio: 0,
    hospitalId: hospitalId,
    status: true,
    loginDate: "2024-09-18T11:16:58.635Z",
    exitDate: "2024-09-18T11:16:58.635Z",
    personId: personId,
    surgicalProceduresId: surgicalId,
    recoDate: dateTod,
    number: recoveryNum,
  dateSurgicalProcedures: surgicalDate,
    nameHospital_Out: hospitalOut,
    numberBOK: bookNumber,
    phone: phone
  });

  const handleSubmit = (event) => {
    event.preventDefault();
postFunc2()
 setBookNumber("")
 setRecoveryNum("")
 setSurgicalDate(null)
 setPhone("")
 setHospitalOut("")
 setEnsuranceNumber("")
 setFullName("")
 setInvoiceValue("")
 setHospital(null)
 setSurgical(null)
 inputRef1.current.focus()
  };

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <div className="flex justify-between mb-5">
        <Quiries title="عرض جميع الاستردادات" link="/dashboard/allclaims" />
        <Back />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="w-full  mb-2    items-center p-3 md:flex md:flex-row md:mr-3 ">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={()=>handleLabelClick(inputRef1)}
              >
                رقم الكتاب
              </label>
              <input
              ref={inputRef1}
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                onChange={handleChangeBookNum}
                onKeyDown={(e)=>handleKeyDown(e,inputRef2)}
                value={bookNumber}
                placeholder={error1}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={()=>handleLabelClick(inputRef2)}
              >
                رقم الاسترداد
              </label>
              <input

                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef2}
                onChange={handleChangeRecoveryNum}
                value={recoveryNum}
                placeholder={error2}
                onKeyDown={(e)=>handleKeyDown(e,inputRef3)}
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex items-center pt-3 md:w-1/2 md:ml-2">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1"
                style={{ cursor: "pointer" }}
              >
                تاريخ الإجراء المرضي
              </label>
              <DatePicker
                selected={surgicalDate}
                onChange={(date) => setSurgicalDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-3  w-11/12 px-6 mr-0  md:w-11/12 md:ml-1 lg:w-5/6 lg:px-12 lg:mr-1"
                value={surgicalDate}
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
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1 "
                readOnly
                value={dateTod}
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={()=>handleLabelClick(inputRef3)}
              >
                رقم الهاتف
              </label>
              <input
              ref={inputRef3}
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                onChange={handleChangePhone}
                onKeyDown={(e)=>handleKeyDown(e,inputRef4)}
                value={phone}
                placeholder={error3}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={()=>handleLabelClick(inputRef4)}
              >
                اسم المشفى
              </label>
              <input
              
                type="text"
                ref={inputRef4}
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1 "
                onChange={(e) => setHospitalOut(e.target.value)}
                onKeyDown={(e)=>handleKeyDown(e,inputRef5)}
                value={hospitalOut}
                placeholder={error4}
              />
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="w-full  mb-2 justify-start  items-center p-3 md:flex md:flex-row ">
              <div className="flex pt-3 md:w-1/2 md:ml-3">
                <label
                  className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                  style={{ cursor: "pointer" }}
                  onClick={()=>handleLabelClick(inputRef5)}
                >
                  رقم التأمين
                </label>
                <input
                  type="text"
                  className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                  ref={inputRef5}
                  onChange={handleChangeEnc}
                  onKeyDown={(e)=>handleKeyDown(e,inputRef6)}
                  value={ensuranceNumber}
                  placeholder={error4}
                />
              </div>
              <div className="flex items-center pt-3 md:w-1/2">
                <p className="w-2/6 ml-2 md:w-2/5 md:text-sm ">الاسم الكامل </p>
                <p className="rounded-2xl p-5 ml-10 w-4/6 md:w-1/2 md:ml-0   lg:-mr-1 bg-gray-400">
             {fullName}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                style={{ cursor: "pointer" }}
                onClick={()=>handleLabelClick(inputRef6)}
              >
                قيمة الفاتورة
              </label>
              <input
              ref={inputRef6}
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1 lg:-mr-4"
                onChange={handleChangeInvoiceValue}
                value={invoiceValue}
                placeholder={error5}
              />
            </div>
          </div>
          <div className="w-full  mb-2  items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex lg:mr-2 md:mr-3">
              <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">
                  اسم المشفى داخل الشبكة
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hospital}
                  label="اسم المشفى داخل الشبكة"
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
              <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 200 }}>
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
              <span style={{ color: "white", fontSize: "18px" }}>إضافة</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClaims;
