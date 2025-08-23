import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import useGet2 from "Custom Hooks/useGet2";
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { AiOutlinePercentage } from "react-icons/ai";
import { PiPlusCircle } from "react-icons/pi";
import usePost from "Custom Hooks/usePost";
import paymethod from "Assets/Data/paymethod";
import Back from "components/Back/Back";
import axios from "axios";
import { Spin } from "antd";
import { createAlert } from "components/Alert/Alert";

const AddNew = () => {
  const [nameEng1, setNameEng1] = useState("");
  const [nameR, setNameR] = useState("");
  // const [data4b, loading7b] = useGet2(config.engineers);
  // const [data3b, loading6b] = useGet2(config.persons);
  const [dataw, loadingW] = useGet(config.workplaces);
  const [dataU, loadingU] = useGet(config.engineeringunits);
  const [dataP, loadingp] = useGet(config.paymethod);
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [work, setWork] = useState("");
  const [unit, setUnit] = useState("");
  const [unitId, setUnitId] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [workPlaceId, setWorkPlaceId] = useState();
  const [unitEng, setUnitEng] = useState("");
  const [workPlaceEng, setWorkPlaceEng] = useState("");
  const [paid, setPaid] = useState("");
  const [pay, setPay] = useState();
  const [persons, setPersons] = useState([]);
  const [engineerId, setEngineerId] = useState();
  const [idPerson, setIdPerson] = useState();
  const[relations,setRelations]=useState([])
  const [enc2, setEnc2] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (number) {
      axios
        .get(`${config.baseUrl1}/${config.searchByEng}/${number}`)
        .then((res) => {
          console.log(res.data);
          const fullName = `${res.data.firstName || ""} ${
            res.data.fatherName || ""
          } ${res.data.lastName || ""}`.trim();
          const workId = res.data.workPlaceId;
          const unitId = res.data.specializationId;
          setWorkPlaceId(workId);
          setUnitId(unitId);
          const workPlaceName =
            dataw.find((item) => item.id === workId)?.name || "";
          const unitName = dataU.find((item) => item.id === unitId)?.name || "";
          setWorkPlaceEng(workPlaceName);
          setUnitEng(unitName);
          setNameEng1(fullName);
          setEngineerId(res.data.personId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNameEng1("");
      setWorkPlaceEng("") 
      setUnitEng("")// إذا تم حذف الرقم، إعادة تعيين الاسم إلى قيمة فارغة
      setEngineerId(null); // إعادة تعيين معرف المهندس
    }
  }, [number]);
  useEffect(() => {
    if (number2) {
      axios
        .get(`${config.baseUrl1}/${config.searchByEnsurance}/${number2}`)
        .then((res) => {
          console.log(res.data);
          const fullName2 = `${res.data.firstName || ""} ${
            res.data.fatherName || ""
          } ${res.data.lastName || ""}`.trim();
          setNameR(fullName2);
          setIdPerson(res.data.personId);
          setEnc2(res.data.ensuranceNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNameR(""); // إذا تم حذف الرقم التأميني، إعادة تعيين اسم الفرد إلى قيمة فارغة
      setIdPerson(null); // إعادة تعيين معرف الشخص
      setEnc2(""); // إعادة تعيين رقم التأمين
    }
  }, [number2]);
useEffect(()=>{
  if(number){
    axios.get(`${config.baseUrl1}/${config.relativeEng}/${number}`)
    .then(res=>{
      console.log(res.data.relations)
      setRelations(res.data.relations)
    })
    .catch(err=>{
      console.error(err)
    })
  }
  else{
    setRelations([])
    
    setPersons([])
  }
 
},[number])
const addFamilyMember = (personData) => {
  const isPersonAlreadyAdded = persons.some(
    (person) => person.id === personData.id
  );

  if (isPersonAlreadyAdded) {
    // عرض تنبيه إذا كان الشخص موجودًا بالفعل في القائمة
   createAlert("Warning","هذا الفرد تمت اضافته مسبقا") // باستخدام toast
    // أو يمكن استخدام alert
    // alert("هذا الفرد تم إضافته مسبقًا");
  } else {
    setPersons([
      ...persons,
      {
        ensuranceNumber: personData.ensuranceNumber,
        name: `${personData.firstName} ${personData.fatherName} ${personData.lastName}`,
        id: personData.id,
      },
    ]);
  }
};


  const [loading2, message, postFunc] = usePost(config.AnnualData, {
    engineerId: engineerId,
    engineerIsRegistered: true,
    persons:
      persons &&
      persons.map((person) => ({
        personId: person.id,
        subscrib: true,
        affiliate: true,
        beneficiary: true,
        cardStatuse: true,
        exAmount: 0,
        year: 0,
        waiting: true,
      })),

    year: selectedDate ? selectedDate.getFullYear() : null,
    hisDic: new Date().toISOString(),
    cardStatuse: true,
    payMethodId: pay,
    workPlaceId: workPlaceId,
    engineeringUnitsId: unitId,
    amount: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postFunc();
    setPersons([]);
    setNumber("");
    setNameEng1("");
    setNameR("");
    setWorkPlaceEng("");
    setUnitEng("");
    setPaid("");
  };

  return (
    <div className="bg-gray-100 w-full p-3">
      <Back />
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-200 rounded-3xl p-2">
          <div className="flex justify-start pt-3 mr-3 md:w-1/2 md:mr-4 md:ml-3 lg:mb-3">
            <label
              className="w-1/3 text-sm mt-2 md:w-2/6 md:text-sm  lg:ml-0 lg:mt-2 lg:text-lg"
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
              className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 mr-6 md:w-9/12 md:ml-6 lg:mr-14 lg:w-7/12 "
            />
          </div>

          <div className="w-full mb-2 items-center md:flex md:flex-row md:mr-4">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg">
                الرقم الهندسي للمهندس
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3  md:w-3/5 md:p-2 md:ml-3"
                value={number}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d*$/.test(newValue)) {
                    setNumber(newValue);
                    setError2("");
                  } else {
                    setError2("الرجاء إدخال أرقام فقط");
                  }
                }}
                placeholder={error2}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-2/6 md:w-1/4  md:text-sm md:mt-1 lg:text-lg">
                اسم المهندس
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3 md:w-3/5 md:p-2 md:ml-3"
                value={nameEng1}
                readOnly
              />
            </div>
          </div>
          <div className="w-full mb-2 items-center md:flex md:flex-row md:mr-4">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg">
                مكان العمل
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3  md:w-3/5 md:p-2 md:ml-3"
                value={workPlaceEng}
                readOnly
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-2/6 md:w-1/4  md:text-sm md:mt-1 lg:text-lg">
                اسم الوحدة
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3 md:w-3/5 md:p-2 md:ml-3"
                value={unitEng}
                readOnly
              />
            </div>
          </div>
          <div className="w-full mb-2 items-center md:flex md:flex-row md:mr-4 ">
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 200 }}>
              <InputLabel label id="demo-simple-select-label">
                طريقة الدفع
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paid}
                label="طريقة الدفع"
                onChange={(e) => setPaid(e.target.value)}
                style={{ background: "white", borderRadius: "40px" }}
              >
                {dataP?.map((item3, index3) => (
                  <MenuItem
                    value={item3.nameMethod}
                    key={item3.id}
                    onClick={() => setPay(item3.id)}
                  >
                    {item3.nameMethod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="bg-gray-200 rounded-3xl  p-3 mt-5">
          <div className="flex justify-center items-center">
            <h2 className="text-2xl mt-2"> أفراد عائلة المهندس</h2>
          </div>
      
          {/* <div className="w-full mb-2 items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-1/6 ml-10 mt-2 md:w-2/6  md:text-sm lg:ml-0 lg:mt-2 lg:text-lg">
                الرقم التأميني للفرد
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3 mr-6 md:w-3/5 md:p-2 md:ml-3"
                value={number2}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[\d-]*$/.test(newValue)) {
                    setNumber2(newValue);
                    setError3("");
                  } else {
                    setError3("الرجاء إدخال أرقام فقط");
                  }
                }}
                placeholder={error3}
              />
            </div>

            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-2/6 md:w-1/4  md:text-sm md:mt-1 lg:text-lg">
                اسم الفرد
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 w-2/3 md:w-3/5 md:p-2 md:ml-3"
                value={nameR}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            {nameR ? (
              <>
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="mt-4 bg-slate-600 text-white rounded-full px-8 py-2 hover:bg-slate-500 lg:text-xs"
                >
                  إضافة المؤمن
                </button>
              </>
            ) : (
              ""
            )}
          </div> */}
           {relations.map((relation, index) => (
            <div key={index} className="w-full mb-2 items-center md:flex md:flex-row md:mr-4 lg:mt-4">
                <div className="flex pt-3 md:w-1/2 md:ml-3">
                <label className="w-2/6 md:w-1/4 md:text-sm md:mt-1 lg:text-lg">
                  اسم الفرد
                </label>
                <input
                  type="text"
                  className="rounded-2xl p-2 w-2/3 md:w-3/5 md:p-2 md:ml-3"
                  value={`${relation.person.firstName} ${relation.person.fatherName} ${relation.person.lastName}`}
                  readOnly
                />
              </div>
              <div className="flex pt-3 md:w-1/2 md:ml-3">
                <label className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg">
                  الرقم التأميني
                </label>
                <input
                  type="text"
                  className="rounded-2xl p-2 w-2/3 md:w-3/5 md:p-2 md:ml-3"
                  value={relation.person.ensuranceNumber}
                  readOnly
                />
              </div>
            
              <button
  type="button"
  onClick={() => addFamilyMember(relation.person)}
  className="mt-4 bg-slate-600 text-white rounded-full px-2  py-3 hover:bg-slate-500 lg:text-sm lg:w-1/6 lg:ml-5"
>
  إضافة الفرد
</button>

            </div>
          ))}

{persons?.length > 0 && (
  <div className="w-full mb-2 items-center md:flex md:flex-row md:mr-4">
    <div className="md:w-1/2 md:ml-3">
      <label className="w-full block font-bold mt-4 text-lg text-slate-600">
        أفراد العائلة المؤمنين :
      </label>
      {persons.map((person, index) => (
        <div
          key={index}
          className="w-full mb-2 items-center p-3 md:flex md:flex-row md:mr-4 lg:mt-4"
        >
          <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2">
            {person.name}
          </label>
          <input
            type="text"
            className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2"
            value={person.ensuranceNumber}
            readOnly
          />
        </div>
      ))}
    </div>
  </div>
)}

        </div>
        <div className="flex justify-end p-2 w-full">
          <button
            className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
            style={{ color: "white", fontSize: "18px" }}
            disabled={loading2} // تعطيل الزر أثناء الإرسال
          >
            {loading2 ? (
              <Spin size="small" /> // عرض Spin عند الإرسال
            ) : (
              "إضافة"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
