import React, { useState } from "react";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Modal,
  Form,
  notification,
} from "antd";
import BackButton from "components/BackButton/BackButton";
const ALLAges = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  // Defining the columns with grouped headers
  const columns = [
    {
      title: "السنة المالية",
      children: [
        {
          title: "العام",
          dataIndex: "year",
        },
        {
          title: "نسبة التحمل داخل الشبكة",
          dataIndex: "in",
        },
        {
          title: "نسبة التحمل خارج الشبكة",
          dataIndex: "out",
        },
        {
          title: "سعر البطاقة",
          dataIndex: "price",
        },
        {
          title: "السقف المالي",
          dataIndex: "money",
        },
      ],
    },
    {
      title: "الشريحة العمرية",
      children: [
        {
          title: "من عام",
          dataIndex: "from",
        },
        {
          title: "حتى عام",
          dataIndex: "to",
        },
        {
          title: "رسوم التسجيل",
          dataIndex: "fees",
        },
      ],
    },
  ];

  const [bordered, setBordered] = useState(false);
  const [size, setSize] = useState("large");
  const [showHeader, setShowHeader] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps = {
    bordered,
    size,
    showHeader,
    scroll,
    tableLayout,
  };

  return (
    <div className="bg-gray-100 h-full w-full p-1">
      <BackButton/>
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
        className="mt-10"
      />
    </div>
  );
};

export default ALLAges;