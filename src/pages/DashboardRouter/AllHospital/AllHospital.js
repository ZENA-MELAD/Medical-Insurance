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
import React, { useState, useRef, useEffect } from "react";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import BackButton from "components/BackButton/BackButton";

const AllHospital = () => {
  const [data10, loading] = useGet(config.hospitals);
  const [data11, loading2] = useGet(config.cities);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data10 && data11) {
      const formattedData = data10.map((item, index) => {
        const nameCity =
          data11.find((item2) => item.cityId === item2.id)?.name || "";

        return {
          key: index,
          id: item.id,
          nameC: nameCity,
          nameH: item.name,
          phone: item.phone,
          address: item.address,
          email: item.email,
          outin: item.inside === true ? "داخل الشبكة" : "خارج الشبكة",
        };
      });
      setData(formattedData);
    }
  }, [data10, data11]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`بحث `}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            إعادة تعيين
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            إغلاق
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(value.toLowerCase().replace(/\s+/g, ""))
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "اسم المدينة",
      dataIndex: "nameC",
    },
    {
      title: "اسم المشفى",
      dataIndex: "nameH",
      ...getColumnSearchProps("nameH"),
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
    },
    {
      title: "العنوان",
      dataIndex: "address",
    },
    // {
    //   title: "الإيميل",
    //   dataIndex: "email",
    // },
    // {
    //   title: "داخل أو خارج الشبكة",
    //   dataIndex: "outin",
    //   render: (text) => (
    //     <span style={{ color: text === "داخل الشبكة" ? "green" : "red" }}>
    //       {text}
    //     </span>
    //   ),
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
            <Button type="link" icon={<DeleteOutlined />}>
              حذف
            </Button>
          </Popconfirm>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            تعديل
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    axios
      .delete(`${config.baseUrl1}/${config.hospitals}/${record.id}`)
      .then((res) => {
        notification.success({
          message: "تم الحذف بنجاح",
          description: `تم حذف المشفى: ${record.nameH}`,
        });
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        notification.error({
          message: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف المشفى",
        });
        console.error(err);
      });
  };

  const showEditModal = (record) => {
    setEditingUnit(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      nameC: record.nameC,
      nameH: record.nameH,
      phone: record.phone,
      address: record.address,
      email: record.email,
      outin: record.outin,
    });
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const cityId = data11.find((item) => item.name === values.nameC)?.id;

        const updatedValues = {
          cityId: cityId,
          name: values.nameH,
          address: values.address,
          phone: values.phone,
          email: values.email,
          inside: values.outin === "داخل الشبكة" ? true : false,
          enabled: values.outin === "خارج الشبكة" ? true : false,
        };

        console.log("Updating hospital with values:", updatedValues);

        axios
          .put(
            `${config.baseUrl1}/${config.hospitals}/${editingUnit.id}`,
            updatedValues
          )
          .then(() => {
            notification.success({
              message: "تم التعديل بنجاح",
              description: `تم تعديل المشفى: ${editingUnit.nameH}`,
            });
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.id
                  ? {
                      ...item,
                      nameC: values.nameC,
                      nameH: values.nameH,
                      phone: values.phone,
                      address: values.address,
                      email: values.email,
                      outin: values.outin,
                    }
                  : item
              )
            );
            setEditingUnit(null); // Reset editing unit here
            form.resetFields(); // Reset form fields after editing
          })
          .catch((err) => {
            console.log("Error updating hospital:", err);
            notification.error({
              message: "خطأ في التعديل",
              description: "حدث خطأ أثناء تعديل المشفى",
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
        title="تعديل المدن والمشافي"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nameC"
            label="اسم المدينة"
            rules={[{ required: false, message: "يرجى إدخال اسم المدينة" }]}
          >
            <Select>
              {data11 &&
                data11.map((city) => (
                  <Select.Option key={city.id} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="nameH"
            label="اسم المشفى"
            rules={[{ required: false, message: "يرجى إدخال اسم المشفى" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="رقم الهاتف"
            rules={[{ required: false, message: "يرجى إدخال رقم الهاتف" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="العنوان"
            rules={[{ required: false, message: "يرجى إدخال العنوان" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="الإيميل"
            rules={[{ required: false, message: "يرجى إدخال الإيميل" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="outin"
            label="داخل أو خارج الشبكة"
            rules={[
              {
                required: false,
                message: "يرجى تحديد اذا كانت المشفى داخل أو خارج الشبكة",
              },
            ]}
          >
            <Select>
              <Select.Option value="داخل الشبكة">داخل الشبكة</Select.Option>
              <Select.Option value="خارج الشبكة">خارج الشبكة</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllHospital;
