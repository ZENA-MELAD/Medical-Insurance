import { Button, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { DeleteOutlined } from "@ant-design/icons";
import { createAlert } from "components/Alert/Alert";
import axios from "axios";
import config from "Constants/environment";
const EnduranceRatios = ({year,cardPrice}) => {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const [enduranceRatios, setEnduranceRatios] = useState([]);
  const [onSendForm, setOnSendForm] = useState(false);
  const [message, setMessage] = useState();
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const [newenduranceRatio, setNewEnduranceRatio] = useState({
    name: "",
    pathological_specialization: "",
    price: "",
    ceiling: "",
    in: "",
    out: "",
    noteContent: "",
    year: 0
  });
  const handleNewEndurance = (e) => {
    const { name, value } = e.target;
    setNewEnduranceRatio({
      ...newenduranceRatio,
      [name]: value,
    });
  };
  const handleNumber = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewEnduranceRatio({
        ...newenduranceRatio,
        [name]: value,
      });
      if (name === "price") {
        inputRef2.current.placeholder = "";
      }
      if(name==="ceiling"){
        inputRef5.current.placeholder=""
      }
      if(name==="in"){
        inputRef3.current.placeholder=""
      }
      if(name==="out"){
        inputRef4.current.placeholder=""
      }
    } else {
      if (name == "price") 
        inputRef2.current.placeholder = "الرجاء ادخال أرقام فقط";
      
      if (name == "ceiling") 
        inputRef5.current.placeholder = "الرجاء ادخال أرقام فقط";
      
      if (name === "in") 
        inputRef3.current.placeholder = "الرجاء ادخال أرقام فقط";
      
      if (name === "out") 
        inputRef4.current.placeholder = "الرجاء ادخال أرقام فقط";
      
    }
  };
  const addEndurance = () => {
    if (newenduranceRatio.name && newenduranceRatio.price&&newenduranceRatio.ceiling&&newenduranceRatio.in&&newenduranceRatio.out) {
      setEnduranceRatios([...enduranceRatios, newenduranceRatio]);
      setNewEnduranceRatio({
        name: "",
      ceiling:"",
        pathological_specialization: "",
        price: "",
        in:"",
        out:"",
        noteContent: "",
        year: 0,
      });
    } else createAlert("Warning", "جميع الحقول مطلوبة");
  };
  const handleDelete = (record) => {
    setEnduranceRatios(
      EnduranceRatios.filter(
        (endurance) => endurance.name !== record.name || endurance.price
      )
    );
  };
  const handleSubmit= async(e)=>{
e.preventDefault()
if(onSendForm) return
setOnSendForm(true)
const hasError=false
if(enduranceRatios.length===0){
  createAlert("Error", "يرجى إضافة نسبة تحمل واحدة على الأقل");
  setOnSendForm(false)
  return;
 }
if(!hasError){
 await axios.post(`${config.baseUrl1}/${config.annualSetting}/surgicals`,{
    year: year?.getFullYear() || 0,
    cardPrice: cardPrice,
    ageSegments: [],
    relationTypes:  [
      
    ],
    hospitals: [],
    surgicals: enduranceRatios.map(enduracne=>({
      name: enduracne.name,
      pathological_specialization: "",
      price: enduracne.price,
      ceiling: enduracne.ceiling,
      in:enduracne.in,
      out:enduracne.out,
      noteContent: enduracne.noteContent,
      year: 0
    })),
})
  .then(res=>{
    console.log(res)
    setMessage(res.status);
    setEnduranceRatios([])
  })
  .catch(err=>{
    console.error(err)
    createAlert("Error","فشل الارسال")
  })
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
  const columns = [
    {
      title: "اسم الاجراء",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "القيمة",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "داخل الشبكة",
      dataIndex: "in",
      key: "in",
      align: "center",
    },
    {
      title: "خارج الشبكة",
      dataIndex: "out",
      key: "out",
      align: "center",
    },
    {
      title: "السقف العام",
      dataIndex: "ceiling",
      key: "ceiling",
      align: "center",
    },
    {
      title: "الملاحظات",
      dataIndex: "noteContent",
      key: "noteContent",
      align: "center",
    },
    {
      title: "الاجراء",
      key: "delete",
      align: "center",
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          حذف
        </Button>
      ),
    },
  ];
  return (
    <>
      <div className="bg-gray-200 rounded-3xl mt-4 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl mt-2">نسب التحمل</h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <h3 className="text-lg mt-2 text-slate-600">إضافة نسبة تحمل</h3>
          </div>

          <div className="w-full mb-2 items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg"
                onClick={() => handleLabelClick(inputRef1)}
              >
                اسم الإجراء الطبي
              </label>
              <input
                name="name"
                type="text"
                value={newenduranceRatio.name}
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 lg:-mr-5"
                ref={inputRef1}
                onChange={handleNewEndurance}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-1/6 ml-10 mt-2 md:w-1/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg"
                onClick={() => handleLabelClick(inputRef2)}
              >
                القيمة
              </label>
              <input
                name="price"
                value={newenduranceRatio.price}
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 lg:mr-5"
                ref={inputRef2}
                onChange={handleNumber}
              />
            </div>
          </div>
          <div className="w-full mb-2 items-center  md:flex md:flex-row md:mr-4">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg lg:w-1/5 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef3)}
              >
                داخل الشبكة
              </label>
              <input
              name="in"
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 lg:mr-8 "
                ref={inputRef3}
                onChange={handleNumber}
                value={newenduranceRatio.in}
              />
              <div className="mt-2">
                <AiOutlinePercentage size={20} />
              </div>
            </div>

            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg lg:w-1/5 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef4)}
              >
                خارج الشبكة
              </label>
              <input
              name="out"
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2  "
                ref={inputRef4}
                onChange={handleNumber}
                value={newenduranceRatio.out}
              />
              <div className="mt-2">
                <AiOutlinePercentage size={20} />
              </div>
            </div>
          </div>
          <div className="w-full mb-2 items-center  md:flex md:flex-row md:mr-4">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg lg:w-1/5 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef5)}
              >
                السقف العام
              </label>
              <input
              name="ceiling"
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 lg:mr-8"
                ref={inputRef5}
                onChange={handleNumber}
                value={newenduranceRatio.ceiling}
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 ml-2 md:w-2/5 md:text-sm md:mt-1 lg:text-lg lg:w-1/5 "
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef6)}
              >
                الملاحظات
              </label>
              <input
                name="noteContent"
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2"
                ref={inputRef6}
                onChange={handleNewEndurance}
                value={newenduranceRatio.noteContent}
              />
            </div>
          </div>
          <div className="flex justify-end items-center ml-6">
            <button
              type="button"
              className="mt-4 bg-slate-600 text-white rounded-full px-4 py-2 hover:bg-slate-500 lg:text-xs "
              onClick={addEndurance}
            >
              إضافة نسبة التحمل
            </button>
          </div>
          {enduranceRatios.length > 0 && (
            <div style={{ marginTop: "20px", width: "100%" }}>
              {" "}
              {/* عرض الجدول ممتد بالكامل */}
              <Table
                dataSource={enduranceRatios}
                columns={columns}
                rowKey={(record) => `${record.name}-${record.price}`} // مفتاح لكل صف في الجدول
                pagination={false}
                size="small" // لجعل الجدول أصغر
                style={{ width: "100%" }}
              />
            </div>
          )}
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
    </>
  );
};
export default EnduranceRatios;
