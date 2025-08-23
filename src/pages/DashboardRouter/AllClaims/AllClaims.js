import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import moment from "moment";
import BackButton from "components/BackButton/BackButton";

const AllClaims = () => {
  const [data10, setData10] = useState([]);
  const [loadingR, setLoadingR] = useState(true);
  const [data11, loading2] = useGet(config.surgicalprocedures);
  const [data12, loading23] = useGet(config.hospitals);
  const [data13, loading13] = useGet(config.persons);
  const [approvedSum, setApprovedSum] = useState();
  const [companySum, setCompanySum] = useState();
  const [count, setCount] = useState();
  const [nonAddPersonSum, setNonAddPersonSum] = useState();
  const [nonAddSum, setNonAddSum] = useState();
  const [totalSum, setTotalSum] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.recovereds}`)
      .then((res) => {
        setLoadingR(false);
        setData10(res.data.recovereds);
        setApprovedSum(res.data.approvedPriceSum);
        setCompanySum(res.data.companyFeesSum);
        setTotalSum(res.data.totalPriceSum);
        setCount(res.data.count);
        setNonAddPersonSum(res.data.nonAddForPersonSum);
        setNonAddSum(res.data.nonAddSum);
        console.log(res.data);
      })
      .catch((err) => {
        setLoadingR(true);
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   if (data10 && data11 && data12) {
  //     const formattedData = data10.map((item, index) => {
  //       const nameSurgical =
  //         data11.find((item2) => item.surgicalProceduresId === item2.id)
  //           ?.name || "";
  //       const nameHospital =
  //         data12.find((item2) => item.hospitalId === item2.id)?.name || "";

  //       return {
  //         key: index,
  //         id: item.id,
  //         nameS: nameSurgical,
  //         nameH: nameHospital,
  //         fullName: item.fullName,
  //         ensurNum: item.ensuranceNumber,
  //         totalPrice: item.totalPrice,
  //         approvedPrice: item.approvedPrice,
  //         enduranceRatio: item.enduranceRatio,
  //         companyFees: item.company_fees,
  //         nonAdd: item.non_Add,
  //         nonAddForPerson: item.non_AddForPerson,
  //         loginDate: item.loginDate ? moment(item.loginDate) : null,
  //         exitDate: item.exitDate ? moment(item.exitDate) : null,
  //         send: "قيد المعالجة",
  //       };
  //     });
  //     setData(formattedData);
  //   }
  // }, [data10, data11, data12]);

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
          placeholder="بحث"
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
      title: "رقم الكتاب",
      dataIndex: "numB",
    },
    {
      title: "تاريخ الكتاب",
      dataIndex: "dateB",
    },
    {
      title: "رقم الاسترداد",
      dataIndex: "num",
    },
    {
      title: "تاريخ الاسترداد",
      dataIndex: "date",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
    },
    {
      title: "اسم المشفى خارج الشبكة",
      dataIndex: "nameHospitalOut",
    },
    {
      title: "الرقم التأميني",
      dataIndex: "ensurNum",
      ...getColumnSearchProps("ensurNum"),
    },
    {
      title: "الاسم",
      dataIndex: "name",
    },
    {
      title: "تاريخ الدخول الى المشفى",
      dataIndex: "loginDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "تاريخ الخروج من المشفى",
      dataIndex: "exitDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "تاريخ الاجراء المرضي ",
      dataIndex: "surDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "قيمة الفاتورة",
      dataIndex: "price",
    },
    {
      title: "اسم المشفى",
      dataIndex: "hospitalName",
    },
    {
      title: "اسم الاجراء الطبي",
      dataIndex: "surgicalName",
    },

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
      .delete(`${config.baseUrl1}/${config.recovereds}/${record.id}`)
      .then((res) => {
        notification.success({
          message: "تم الحذف بنجاح",
          description: `تم حذف المطالبة بنجاح`,
        });
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        notification.error({
          message: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف المطالبة",
        });
        console.error(err);
      });
  };

  const showEditModal = (record) => {
    setEditingUnit(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      nameS: record.nameS,
      nameH: record.nameH,
      fullName: record.fullName,
      ensurNum: record.ensurNum,
      send: record.send,
      totalPrice: record.totalPrice,
      approvedPrice: record.approvedPrice,
      enduranceRatio: record.enduranceRatio,
      companyFees: record.companyFees,
      nonAdd: record.nonAdd,
      nonAddForPerson: record.nonAddForPerson,
      loginDate: record.loginDate,
      exitDate: record.exitDate,
    });
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const surgicalId = data11.find(
          (item) => item.name === values.nameS
        )?.id;
        const hospitalId = data12.find(
          (item) => item.name === values.nameH
        )?.id;
        const personId = data13.find(
          (item) => item.ensuranceNumber === values.ensurNum
        )?.id;

        const updatedValues = {
          surgicalProceduresId: surgicalId,
          hospitalId: hospitalId,
          fullName: values.fullName,
          ensuranceNumber: values.ensurNum,
          totalPrice: values.totalPrice,
          company_fees: values.companyFees,
          approvedPrice: values.approvedPrice,
          non_Add: values.nonAdd,
          non_AddForPerson: values.nonAddForPerson,
          enduranceRatio: values.enduranceRatio,
          send: true,
          loginDate: values.loginDate
            ? values.loginDate.format("YYYY-MM-DD")
            : null,
          exitDate: values.exitDate
            ? values.exitDate.format("YYYY-MM-DD")
            : null,
          personId: personId,
        };

        axios
          .put(
            `${config.baseUrl1}/${config.recovereds}/${editingUnit.id}`,
            updatedValues
          )
          .then(() => {
            notification.success({
              message: "تم التعديل بنجاح",
              description: " تم تعديل المطالبة بنجاح",
            });
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.id
                  ? {
                      ...item,
                      ...updatedValues,
                      nameS: values.nameS,
                      nameH: values.nameH,
                    }
                  : item
              )
            );
            setEditingUnit(null);
            form.resetFields();
          })
          .catch((err) => {
            console.error("Error updating:", err);
            notification.error({
              message: "خطأ في التعديل",
              description: "حدث خطأ أثناء تعديل المطالبة",
            });
          });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUnit(null);
    form.resetFields();
  };

  return (
    <div className="bg-gray-100 h-full w-full p-1">
      <BackButton />
      <Table
        dataSource={data}
        columns={columns}
        loading={loadingR}
        pagination={false}
        scroll={{ x: "max-content" }}
        // summary={() => (
        //   <Table.Summary fixed>
        //     <Table.Summary.Row>
        //       <Table.Summary.Cell index={0}>
        //         إجمالي الموافقات:
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={1}>{approvedSum}</Table.Summary.Cell>
        //       <Table.Summary.Cell index={2}>
        //         إجمالي أتعاب الشركة:
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={3}>{companySum}</Table.Summary.Cell>
        //       <Table.Summary.Cell index={4}>
        //         إجمالي الصافي للمؤمن:
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={5}>
        //         {nonAddPersonSum}
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={6}>إجمالي الصافي:</Table.Summary.Cell>
        //       <Table.Summary.Cell index={7}>{nonAddSum}</Table.Summary.Cell>
        //       <Table.Summary.Cell index={8}>
        //         إجمالي عدد المطالبات:
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={9}>{count}</Table.Summary.Cell>
        //       <Table.Summary.Cell index={10}>
        //         إجمالي قيم المطالبات:
        //       </Table.Summary.Cell>
        //       <Table.Summary.Cell index={11}>{totalSum}</Table.Summary.Cell>
        //     </Table.Summary.Row>
        //   </Table.Summary>
        // )}
      />
      <Modal
        title="تعديل المطالبة"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="nameS"
            label="اسم الاجراء المرضي"
            rules={[
              { required: false, message: "يرجى إدخال اسم الاجراء المرضي" },
            ]}
          >
            <Select>
              {data11 &&
                data11.map((surgical) => (
                  <Select.Option key={surgical.id} value={surgical.name}>
                    {surgical.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="nameH"
            label="اسم المشفى"
            rules={[{ required: false, message: "يرجى إدخال اسم المشفى" }]}
          >
            <Select>
              {data12 &&
                data12.map((hospital) => (
                  <Select.Option key={hospital.id} value={hospital.name}>
                    {hospital.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="fullName" label="الاسم الكامل">
            <Input />
          </Form.Item>
          <Form.Item
            name="ensurNum"
            label="الرقم التأميني"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="قيمة المطالبة"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="approvedPrice"
            label="الموافق عليه"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enduranceRatio"
            label="قيمة التحمل"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="companyFees"
            label="أتعاب الشركة"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nonAdd"
            label="المبلغ الصافي"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nonAddForPerson"
            label="الصافي للمؤمن"
            rules={[
              { required: false },
              { pattern: /^\d+$/, message: "يرجى إدخال أرقام فقط" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="loginDate" label="تاريخ الدخول الى المشفى">
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(currentDate) => {
                const exitDate = form.getFieldValue("exitDate");
                return exitDate && currentDate.isAfter(exitDate, "day");
              }}
            />
          </Form.Item>
          <Form.Item name="exitDate" label="تاريخ الخروج من المشفى">
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(currentDate) => {
                const loginDate = form.getFieldValue("loginDate");
                return loginDate && currentDate.isBefore(loginDate, "day");
              }}
            />
          </Form.Item>

          <Form.Item name="send" label="الحالة">
            <Select>
              <Select.Option value="قيد المعالجة">قيد المعالجة</Select.Option>
              <Select.Option value="تم الرفض">تم الرفض</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllClaims;
