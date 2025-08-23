import {
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
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import { Table,Button, Spin } from "antd";
const Hospitals = ({year,cardPrice}) => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [message, setMessage] = useState();
  const [onSendForm, setOnSendForm] = useState(false);
  const [cityId, setCityId] = useState("");
  const [data4, loading44] = useGet(config.cities);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [noteHospital, setNoteHospital] = useState("");
  const [callingCode, setCallingCode] = useState(""); // Separate calling code state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({
    name: "",
    enabled: true,
    inside: true,
    cityId: 0,
    address: "",
    email: "",
    phone: "",
    longitude: 0,
    latitude: 0,
    year: 0,
    noteContent: "",
  });
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const handleChangeCity = (e) => {
    const { name, value } = e.target;
    const selectedCity = data4.find((item) => item.id === value);
    if (selectedCity) {
      setCity(selectedCity.name);
      setCallingCode(selectedCity.callingCode); // Set the calling code
      setPhoneNumber(""); // Clear the previous phone number
      setCityId(value);
      
      setNewHospital({
        ...newHospital,
        [name]: value,
      });
    }
    console.log("kkkk" + value);
    console.log("idddd" + cityId);
  };
  const handleChangePhone = (e) => {
    const input = e.target.value;

    // Ensure that the phone number doesn't include the calling code
    const numberPart = input.startsWith(callingCode + "-")
      ? input.slice(callingCode.length + 1)
      : input;

    // Verify that the input is numeric
    if (/^\d*$/.test(numberPart)) {
      setPhoneNumber(numberPart); // Update only the number part
    }
    const { name, value } = e.target;
    setNewHospital({
      ...newHospital,
      [name]: value,
    });
  };
  const handleNewHospitalChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({
      ...newHospital,
      [name]: value,
    });
  };
  const addHospital = () => {
    if (newHospital.cityId && newHospital.name && newHospital.address) {
      setHospitals([...hospitals, newHospital]);
      setNewHospital({
        name: "",
        enabled: true,
        inside: true,
        cityId: 0,
        address: "",
        email: "",
        phone: "",
        longitude: 0,
        latitude: 0,
        year: 0,
        noteContent: "",
      });
      setCallingCode("")
      setPhoneNumber("")
      setCityId("")
    }
    else createAlert('Warning', "جميع الحقول مطلوبة")
  };
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if (onSendForm) return;
    setOnSendForm(true);
    const hasError=false
    if(hospitals.length===0){
        createAlert("Error", "يرجى إضافة مشفى واحد على الأقل");
        setOnSendForm(false)
        return;
    }
    if(!hasError){
        const allHospitals = hospitals.map((item) => {
          return { ...item, noteContent: noteHospital};
        });
      await  axios.post(`${config.baseUrl1}/${config.annualSetting}/hospitals`,{
          year: year?.getFullYear() || 0,
          cardPrice: cardPrice,
          ageSegments: [],
          relationTypes:  [
            
          ],
          hospitals: allHospitals,
          surgicals: [
           
          ],
  })
        .then(res=>{
          console.log(res)
          setMessage(res.status);
          setHospitals([]);
          setNoteHospital("");
        })
        .catch(err=>{
          console.error(err)
        })
      }
       else {
        createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
      }
      setOnSendForm(false)
  }
  useEffect(() => {
    const message1 = message; // Assuming you have another message state or prop
    // const message2 = 200; // For demonstration purposes, assuming second message is always 200

    if (message1 === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);
  const handleDelete = (record) => {
    setHospitals(hospitals.filter(hospital => hospital.name !== record.name || hospital.address !== record.address));
  };
  const columns = [
    {
      title: "المدينة",
      dataIndex: "cityId",  // نستخدم cityId هنا
      key: "cityId",
      align:"center",
      render: (cityId) => {
        const city = data4.find((item) => item.id === cityId); // العثور على المدينة من cityId
        return city ? city.name : "غير معروف"; // عرض اسم المدينة أو "غير معروف" إذا لم يتم العثور
      },
    },
    {
      title: "اسم المشفى",
      dataIndex: "name",
      key: "name",
      align:"center",
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
      align:"center",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
      align:"center",
    },
    {
      title: "الاجراء",
      align:"center",
      key: "delete",
      render: (text, record) => (
        <Button type="link" icon={<DeleteOutlined />}  onClick={()=>handleDelete(record)}>
        حذف
      </Button>
     ) },
    
  ];
  
  return (
    <div className="bg-gray-200 rounded-3xl mt-4 p-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <h2 className="text-2xl mt-2"> المشافي المتعاقدة لهذا العام</h2>
        </div>

        <div className="flex justify-center items-center mt-4">
          <h3 className="text-lg mt-2 text-slate-600">إضافة مشفى جديدة </h3>
        </div>
        <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
            <InputLabel
              label
              id="demo-simple-select-label"
            >
              اختر مدينة
            </InputLabel>
            <Select
            name="cityId"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityId}
              label="اختر مدينة"
              onChange={handleChangeCity}
              style={{
                background: "white",
                borderRadius: "40px",
              }}
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
        <div className="mb-2 flex justify-center items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
          <div className="flex pt-3 md:w-1/2 md:ml-3">
            <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg ">
              اسم المشفى
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 "
              ref={inputRef1}
              onChange={handleNewHospitalChange}
              name="name"
              value={newHospital.name}
            />
          </div>
          <div className=" md:w-1/2 ">
            <label
              className="w-2/6 text-lg ml-10 md:w-1/3  md:mt-1 md:text-lg lg:w-1/3"
              onClick={() => handleLabelClick(inputRef3)}
              style={{ cursor: "pointer" }}
            >
              العنوان
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 w-3/6 md:ml-1 md:mb-2 md:mr-6 lg:mr-4"
              name="address"
              ref={inputRef2}
              onChange={handleNewHospitalChange}
              value={newHospital.address}
            />
          </div>
        </div>
        <div className="mb-2 flex justify-center items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
          <div className="flex pt-3 md:w-1/2 md:ml-3">
            <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg ">
              رقم الهاتف
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 "
              ref={inputRef3}
              onChange={handleChangePhone}
              name="phone"
              value={callingCode + "-" +phoneNumber}
            />
          </div>
        </div>
    <div className="flex justify-end items-center ml-9">
          {/* <NavLink
            to="/dashboard/allhospital"
            className="mt-4 bg-slate-600 text-white rounded-full px-8 py-2 hover:bg-slate-500 lg:text-xs "
          >
            عرض جميع المشافي
          </NavLink> */}
          <button
            type="button"
            onClick={addHospital}
            className="mt-4 bg-slate-600 text-white rounded-full px-8 py-2 hover:bg-slate-500 lg:text-xs "
          >
            إضافة مشفى
          </button>
        </div>
        {hospitals.length > 0 && (
           <div style={{ marginTop: '20px', width: '100%' }}> {/* عرض الجدول ممتد بالكامل */}
           <Table
             dataSource={hospitals}
             columns={columns}
             rowKey={(record) => `${record.name}-${record.address}`} // مفتاح لكل صف في الجدول
             pagination={false}
             size="small" // لجعل الجدول أصغر
             style={{ width: '100%' }}
           />
         </div>
         
          )}
        <div className="flex flex-col mt-6 p-5">
            <label onClick={()=>handleLabelClick(inputRef2)} style={{ cursor: "pointer" }}>
              الملاحظات:
            </label>
            <div className="flex relative">
              <textarea
                ref={inputRef2}
                name="noteContent"
                value={noteHospital}
                onChange={(e)=>setNoteHospital(e.target.value)}
                placeholder="إضافة ملاحظات"
                rows={4}
                cols={200}
                className="  p-4 bg-gray-100 border border-black rounded-2xl placeholder:p-4"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end p-2 w-full">
            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={onSendForm} // تعطيل الزر أثناء الإرسال
            >
              {onSendForm ? (
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

export default Hospitals;
