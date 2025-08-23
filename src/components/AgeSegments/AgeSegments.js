import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import { Spin, Table, Button } from 'antd'; // استيراد Spin وجدول وأزرار من ant design
import { DeleteOutlined } from '@ant-design/icons'; // استيراد أيقونة الحذف
import React, { useEffect, useRef, useState } from "react";

const AgeSegments = ({ cardPrice, year }) => {
  const [ageSegments, setAgeSegments] = useState([]);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [message, setMessage] = useState();
  const [noteAgeSegment, setNoteAgeSegment] = useState("");
  const [newSegment, setNewSegment] = useState({
    fromYear: "",
    toYear: "",
    theAmount: "",
    enduranceRatio: 20,
    noteContent: "",
  });

  const [onSendForm, setOnSendForm] = useState(false); // حالة الإرسال

  const addAgeSegment = () => {
    if (newSegment.fromYear && newSegment.toYear && newSegment.theAmount) {
      setAgeSegments([...ageSegments, newSegment]);
      setNewSegment({
        fromYear: "",
        toYear: "",
        theAmount: "",
        enduranceRatio: 20,
        noteContent: "",
      });
    } else {
      createAlert('Warning', "جميع الحقول مطلوبة");
    }
  };

  const handleNewSegmentChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewSegment({
        ...newSegment,
        [name]: value,
      });
      if (name === "fromYear") {
        inputRef1.current.placeholder = "";
      }
      if (name === "toYear") {
        inputRef2.current.placeholder = "";
       }
      if (name === "theAmount") {
        inputRef3.current.placeholder = "";
       }
    } else {
      if (name === "fromYear")
        inputRef1.current.placeholder = "الرجاء إدخال أرقام فقط";
      if (name === "toYear")
        inputRef2.current.placeholder = "الرجاء إدخال أرقام فقط";
      if (name === "theAmount")
        inputRef3.current.placeholder = "الرجاء إدخال أرقام فقط";
    }
  };

  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleDelete = (record) => {
    setAgeSegments(ageSegments.filter(segment => segment.fromYear !== record.fromYear || segment.toYear !== record.toYear));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(onSendForm) return
    setOnSendForm(true)

    if (ageSegments.length === 0) {
      createAlert("Error", "يرجى إضافة شريحة عمرية واحدة على الأقل");
      setOnSendForm(false)
      return;
    }
  
    const allageSegments = ageSegments.map((item) => {
      return { ...item, noteContent: noteAgeSegment };
    });
  
   await axios
      .post(`${config.baseUrl1}/${config.annualSetting}/agesegment`, {
        year: year?.getFullYear() || 0,
        cardPrice: cardPrice,
        ageSegments: allageSegments,
        relationTypes: [],
        hospitals: [],
        surgicals: [],
      })
      .then((res) => {
        console.log(res);
        setMessage(res.status);
  
        // تفريغ الشرائح العمرية والملاحظات بعد نجاح الإرسال
        setAgeSegments([]);
        setNoteAgeSegment("");

      })
      .catch((err) => {
        console.error(err);
        createAlert("Error", "فشل الارسال");
      });

      setOnSendForm(false)
  };
  
  useEffect(() => {
    if (message === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);

  // الأعمدة الخاصة بالجدول
  const columns = [
    {
      title: "من عام",
      dataIndex: "fromYear",
      key: "fromYear",
      align: "center",
    },
    {
      title: "حتى عام",
      dataIndex: "toYear",
      key: "toYear",
      align: "center",
    },
    {
      title: "رسم التسجيل",
      dataIndex: "theAmount",
      key: "theAmount",
      align: "center",
    },
    {
      title: "الإجراء",
      align: "center",
      key: "delete",
      render: (text, record) => (
        <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
          حذف
        </Button>
      ),
    }
  ];

  return (
    <>
      <div className="bg-gray-200 rounded-3xl mt-4 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl mt-2">رسوم الاشتراك بالتأمين حسب الشرائح العمرية</h2>
          </div>

          <div className="flex justify-center items-center mt-4">
            <h3 className="text-lg mt-2 text-slate-600">شريحة جديدة</h3>
          </div>

          <div className="w-full mb-2 items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef1)}>
                من عام
              </label>
              <input
                type="text"
                name="fromYear"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2"
                value={newSegment.fromYear}
                onChange={handleNewSegmentChange}
                ref={inputRef1}
              />
            </div>

            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef2)}>
                حتى عام
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2"
                name="toYear"
                value={newSegment.toYear}
                onChange={handleNewSegmentChange}
                ref={inputRef2}
              />
            </div>

            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef3)}>
                رسم التسجيل
              </label>
              <input
                type="text"
                name="theAmount"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2"
                value={newSegment.theAmount}
                onChange={handleNewSegmentChange}
                ref={inputRef3}
              />
            </div>
          </div>

          <div className="flex justify-end items-center ml-5">
            <button
              type="button"
              onClick={addAgeSegment}
              className="mt-4 bg-slate-600 text-white rounded-full px-4 py-2 hover:bg-slate-500 lg:text-xs"
            >
              إضافة شريحة عمرية
            </button>
          </div>

          {/* عرض الجدول أسفل زر إضافة الشريحة */}
          {ageSegments.length > 0 && (
            <div style={{ marginTop: '20px', width: '100%' }}>
              <Table
                dataSource={ageSegments}
                columns={columns}
                rowKey={(record) => `${record.fromYear}-${record.toYear}`}
                pagination={false}
                size="small"
                style={{ width: '100%' }}
              />
            </div>
          )}

          <div className="flex flex-col mt-6 p-5">
            <label onClick={() => handleLabelClick(inputRef4)}>الملاحظات:</label>
            <div className="flex relative">
              <textarea
                ref={inputRef4}
                name="noteContent"
                placeholder="إضافة ملاحظات"
                value={noteAgeSegment}
                rows={4}
                cols={200}
                className="p-4 bg-gray-100 border border-black rounded-2xl placeholder:p-4"
                onChange={(e) => setNoteAgeSegment(e.target.value)}
              />
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
    </>
  );
};
export default AgeSegments;
