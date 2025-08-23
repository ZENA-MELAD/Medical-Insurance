import { Table, Checkbox } from "antd";
import axios from "axios";
import BackButton from "components/BackButton/BackButton";
import config from "Constants/environment";
import React, { useEffect, useState } from "react";

const RenewTest = ({engNumber}) => {
const[data,setData]=useState()
  console.log("enggggnum",engNumber)
useEffect(()=>{
 axios.get(`${config.baseUrl1}/${config.relativeEng}/${engNumber}`)
 .then(res=>{
  console.log(res.data)
  setData(res.data)
 })
 .catch(err=>{
  console.error(err)
 })
},[engNumber])
useEffect(()=>{
  if(data){
    
  }
},[data])
  const columns = [
    {
      title: "اسم المؤمن",
      dataIndex: "name",
    },
    {
      title: "الرقم التأميني",
      dataIndex: "ensuranceNumber",
    },
    {
      title: "درجة القرابة",
      dataIndex: "relation",
    },
    {
      title: "الخيارات",
      dataIndex: "options",
      render: (text, record) => (
        <div>
          <Checkbox>انتظار</Checkbox>
          <Checkbox>عدم استفادة لهذا العام</Checkbox>
          <Checkbox>تجديد اشتراك</Checkbox>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 h-full w-full p-1">
      <BackButton />
      <Table
        pagination={false}
        columns={columns}
        // dataSource={tableData}
        className="mt-10"
      />
    </div>
  );
};

export default RenewTest;
