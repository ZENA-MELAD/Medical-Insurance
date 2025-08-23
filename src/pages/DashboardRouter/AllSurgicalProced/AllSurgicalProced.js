
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Modal,
  Form,
  notification,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "components/BackButton/BackButton";

const AllSurgicalProced = () => {
  const [data10, loading] = useGet(config.surgicalprocedures);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data10) {
      const formattedData = data10.map((item, index) => ({
        key: index,
        id: item.id,
        namep: item.name,
        names: item.pathological_specialization,
        // type: item.financial ? "مالي" : "فني",
        // limit: item.limit,
        ratio: item.enduranceRatio,
      }));
      setData(formattedData);
    }
  }, [data10]);

  const columns = [
    {
      title: "اسم الإجراء المرضي",
      dataIndex: "namep",
    },
    // {
    //   title: "اسم التخصص الطبي",
    //   dataIndex: "names",
    // },
    // {
    //   title: "نوع الإجراء الطبي",
    //   dataIndex: "type",
    // },
    // {
    //   title: " الحد الأقصى للإجراء",
    //   dataIndex: "limit",
    // },
    // {
    //   title: "نسبة التحمل للإجراء",
    //   dataIndex: "ratio",
    // },

    {
      title: "الإجراءات",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="هل أنت متأكد من الحذف؟"
            onConfirm={() => handleDelete(record)}
            okText="نعم"
            cancelText="لا"
          >
            <Button type="link">حذف</Button>
          </Popconfirm>
          <Button type="link" onClick={() => showEditModal(record)}>
            تعديل
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${config.baseUrl1}/${config.surgicalprocedures}/${record.id}`
      );
      console.log(`Deleted unit with id: ${record.id}`);
      setData((prevData) => prevData.filter((item) => item.id !== record.id));
      notification.success({
        message: "تم الحذف بنجاح",
        description:`تم حذف الإجراء : ${record.namep}`,
      });
    } catch (err) {
      console.error(`Error deleting unit with id: ${record.id}`, err);
      notification.error({
        message: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الإجراء",
      });
    }
  };

  const showEditModal = (record) => {
    setEditingUnit(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      namep: record.namep,
      names: record.names,
      // type: record.type,
      // limit: record.limit,
      ratio: record.ratio,
    });
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedValues = {
          id: editingUnit.id,
          name: values.namep,
          pathological_specialization: values.names,
          // financial: values.type === "مالي",
          // limit: values.limit,
          enduranceRatio: values.ratio,
        };

axios.put(`${config.baseUrl1}/${config.surgicalprocedures}/${editingUnit.id}`,
            updatedValues
          )
          .then((res) => {
            console.log(`Updated unit with id: ${editingUnit.id}`);
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.id ? { ...item, ...values } : item
              )
            );
            notification.success({
              message: "تم التعديل بنجاح",
              description:` تم تعديل الإجراء : ${editingUnit.namep}`,
            });
          })
          .catch((err) => {
            console.error(err);
            notification.error({
              message: "خطأ في التعديل",
              description: "حدث خطأ أثناء تعديل الإجراء",
            });
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const [bordered, setBordered] = useState(false);
  const [size, setSize] = useState("large");
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
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
    loading,
    size,
    showHeader,
    // rowSelection,
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
      <Modal
        title="تعديل الإجراءالمرضي"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="namep"
            label="اسم الإجراء المرضي"
            rules={[
              { required: false, message: "يرجى إدخال اسم الإجراء المرضي" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="names"
            label="اسم التخصص الطبي"
            rules={[
              { required: false, message: "يرجى إدخال اسم التخصص الطبي" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="type"
            label="نوع الإجراء الطبي"
            rules={[
              { required: false, message: "يرجى إدخال نوع الإجراء الطبي" },
            ]}
          >
            <Select>
              <Select.Option value="فني">فني</Select.Option>
              <Select.Option value="مالي">مالي</Select.Option>
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            name="limit"
            label="الحد الأقصى للإجراء"
            rules={[
              {
                required: false,
                message: "يرجى إدخال الحد الأقصى للإجراء",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="ratio"
            label=" نسبة التحمل لهذا الإجراء"
            rules={[
              {
                required: false,
                message: "يرجى إدخال نسبة التحمل لهذا الإجراء",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllSurgicalProced;