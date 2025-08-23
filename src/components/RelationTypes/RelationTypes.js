import { Button, Spin, Table } from "antd";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import React, { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import relative from "Assets/Data/relative";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
const RelationTypes = ({ year, cardPrice }) => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [noteRelation, setNoteRelation] = useState("");
  const [relationTypes, setRelationTypes] = useState([]);
  const [message, setMessage] = useState();
  const [onSendForm, setOnSendForm] = useState(false);
  const [rel, setRel] = useState("");
  const [newRelation, setNewRelation] = useState({
    name: "",
    year: 0,
    noteContent: "",
  });
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const handleNewRelationChange = (e) => {
    const { name, value } = e.target;
    setNewRelation({
      ...newRelation,
      [name]: value,
    });
    setRel(value);
  };
  const addRelationType = () => {
    if (newRelation.name) {
      setRelationTypes([...relationTypes, newRelation]);
      setNewRelation({
        name: "",
        year: 0,
        noteContent: "",
      });
    } else createAlert("Warning", "جميع الحقول مطلوبة");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSendForm) return;
    setOnSendForm(true);
    const hasError = false;
    if (relationTypes.length === 0) {
      createAlert("Error", "يرجى إضافة صلة قرابة واحدة على الأقل");
      setOnSendForm(false)
      return;
    }
    if (!hasError) {
      const allRelationTypes = relationTypes.map((item) => {
        return { ...item, noteContent: noteRelation };
      });
      await axios
        .post(`${config.baseUrl1}/${config.annualSetting}/relationtype`, {
          year: year?.getFullYear() || 0,
          cardPrice: cardPrice,
          ageSegments: [],
          relationTypes: allRelationTypes,
          hospitals: [],
          surgicals: [],
        })
        .then((res) => {
          console.log(res);
          setMessage(res.status);
          setRelationTypes([]);
          setNoteRelation("");
        })
        .catch((err) => {
          console.error(err);
          createAlert("Error", "فشل الارسال");
        });
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
    setOnSendForm(false)
  };
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
    setRelationTypes(
      relationTypes.filter((relation) => relation.name !== record.name)
    );
  };
  const columns = [
    {
      title: "صلة القرابة",
      dataIndex: "name",
      key: "name",
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
    <div className="bg-gray-200 rounded-3xl mt-4 p-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <h2 className="text-2xl mt-2">أفراد العائلة</h2>
        </div>
        <div className="flex justify-center items-center mt-4">
          <h3 className="text-lg mt-2 text-slate-600">إضافة صلة قرابة </h3>
        </div>

        <div className="w-full mb-2 items-center p-0 md:flex md:flex-row md:mr-4 lg:mt-4 lg:justify-start">
          <div className="flex pt-3 md:w-1/2 md:ml-3">
            {/* <label className="w-1/6 ml-10 mt-2 md:w-2/6 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg ">
                صلة القرابة
              </label>
              <input
                type="text"
                name="name"
                className="rounded-2xl p-2 ml-2 w-4/6 md:w-1/2 lg:-mr-8"
                onChange={handleNewRelationChange}
                value={newRelation.name}
                ref={inputRef1}
              /> */}
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel label id="demo-simple-select-label">
                اختر صلة القرابة
              </InputLabel>
              <Select
                name="name"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newRelation.name}
                label="اختر مدينة"
                onChange={handleNewRelationChange}
                style={{
                  background: "white",
                  borderRadius: "40px",
                }}
              >
                {relative &&
                  relative.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex justify-end items-center ml-6">
          <button
            type="button"
            onClick={addRelationType}
            className="mt-4 bg-slate-600 text-white rounded-full px-4 py-2 hover:bg-slate-500 lg:text-xs "
          >
            إضافة صلة القرابة
          </button>
        </div>
        {relationTypes.length > 0 && (
          <div style={{ marginTop: "20px", width: "100%" }}>
            {" "}
            {/* عرض الجدول ممتد بالكامل */}
            <Table
              dataSource={relationTypes}
              columns={columns}
              rowKey={(record) => `${record.name}`} // مفتاح لكل صف في الجدول
              pagination={false}
              size="small" // لجعل الجدول أصغر
              style={{ width: "100%" }}
            />
          </div>
        )}
        <div className="flex flex-col mt-6 p-5">
          <label
            onClick={() => handleLabelClick(inputRef2)}
            style={{ cursor: "pointer" }}
          >
            الملاحظات:
          </label>
          <div className="flex relative">
            <textarea
              ref={inputRef2}
              name="noteContent"
              value={noteRelation}
              onChange={(e) => setNoteRelation(e.target.value)}
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

export default RelationTypes;
