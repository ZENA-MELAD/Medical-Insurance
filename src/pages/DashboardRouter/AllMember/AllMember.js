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
  DatePicker,
  Upload,
  Image,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment";
import BackButton from "components/BackButton/BackButton";
import { render } from "@testing-library/react";
import { NavLink } from "react-router-dom";
const AllMember = () => {
  const [number, setNumber] = useState("");
  const [data10, setData10] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [engineerId, setEngineerId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [relationName, setRelationName] = useState("");
  const [isModalVisibleFile, setIsModalVisibleFile] = useState(false);
  // const [dataRelation, loading2] = useGet(config.relation);
  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.relativeEng}/${number}`)
      .then((res) => {
        setData10(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [number]);
  const handleYearChange = (date) => {
    const year = date ? moment(date).year() : null; // استخراج السنة كعدد صحيح
    setSelectedDate(year); // تخزين السنة كـ integer
  };
  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`${config.baseUrl1}/${config.relationYear}/${selectedDate}`)
        .then((res) => {
          console.log(res.data);
          setRelationName(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (data10) {
      const engId = data10.person.id;
      const nameEng = data10.person.firstName;
      console.log("nameeng", nameEng);
      console.log(engId);
      setEngineerId(engId);
      const relations = data10.relations.map((item) => {
        const relationName2 =
          (relationName &&
            relationName.find(
              (item3) => item3.relationId === item.relationTypeId
            )?.relationName) ||
          "";
        return {
          key: item.person.id,
          nameE: nameEng, // ensure each item has a unique key
          nameP: item.person.firstName,
          lastN: item.person.lastName,
          nameF: item.person.fatherName,
          nameM: item.person.motherName,
          nationalN: item.person.nationalId,
          ensuranceNum: item.person.ensuranceNumber,
          address: item.person.address,
          phone: item.person.phone,
          mobile: item.person.mobile,
          email: item.person.email,
          birthDate: item.person.birthDate,
          gender: item.person.genderId === 1 ? "ذكر" : "أنثى",
          status: item.person.statusId === 1 ? "متزوج" : "عازب",
          relationT: relationName2,
          images: item.person.images.map((img) => img.fileName), // تخزين جميع الصور
          file: item.person.words.length > 0 ? item.words[0].fileName : null,
        };
      });

      const formattedData = relations.map((relation, index) => ({
        key: index, // ensure each item has a unique key
        id: relation.key,
        nameE: data10.person.firstName,
        ...relation,
      }));

      setData(formattedData);
    }
  }, [data10]);

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
          placeholder={"بحث"}
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
  // const showEditFileModal = (record) => {
  //   console.log("Record passed to showEditModalFile:", record);

  //   const images = record.images || []; // Assuming record has an 'images' array
  //   const files = record.files || []; // Assuming record has a 'files' array

  //   setEditingUnit(record);
  //   setIsModalVisibleFile(true);

  //   // Set initial values for the form
  //   form.setFieldsValue({
  //     images: images,
  //     files: files,
  //   });

  //   console.log("Form values after setting:", form.getFieldsValue());
  // };
  const columns = [
    {
      title: "اسم المهندس/ة",
      dataIndex: "nameE",
    },
    {
      title: "اسم الشخص القريب",
      dataIndex: "nameP",
    },
    {
      title: "الكنية",
      dataIndex: "lastN",
    },
    {
      title: "اسم الأب",
      dataIndex: "nameF",
    },
    {
      title: "اسم الأم",
      dataIndex: "nameM",
    },
    {
      title: "العنوان",
      dataIndex: "address",
    },
    {
      title: "الرقم الوطني",
      dataIndex: "nationalN",
    },
    {
      title: "رقم التأمين",
      dataIndex: "ensuranceNum",
    },
    {
      title: "الإيميل",
      dataIndex: "email",
    },
    {
      title: "الهاتف",
      dataIndex: "phone",
    },
    {
      title: "الموبايل",
      dataIndex: "mobile",
    },
    {
      title: "تاريخ الميلاد",
      dataIndex: "birthDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "الجنس",
      dataIndex: "gender",
    },
    {
      title: "الحالة الاجتماعية",
      dataIndex: "status",
    },
    {
      title: "درجة القرابة",
      dataIndex: "relationT",
    },
    {
      title: "استعراض الصور",
      dataIndex: "images", // استخدام اسم الحقل الجديد
      render: (images) =>
        images && images.length > 0 ? (
          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // فتح نافذة جديدة لكل صورة
              images.forEach((image, index) => {
                // استخدام window.open هنا
                const newWindow = window.open();
                newWindow.document.write(`
              <html>
                <head>
                  <title>عرض الصورة ${index + 1}</title>
                </head>
                <body>
                  <img src="data:image/jpeg;base64,${image}" alt="الصورة" style="width:100%; margin-bottom:10px;" />
                </body>
              </html>
            `);
                newWindow.document.close(); // تأكد من إغلاق المستند
              });
            }}
          >
            عرض جميع الصور
          </NavLink>
        ) : (
          "لا توجد صور"
        ),
    },
    {
      title: "استعراض ملف",
      dataIndex: "file",
      render: (file) =>
        file ? (
          // هنا يتم فك تشفير الـ Base64 واستخدامه كعنوان URL
          <a
            href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            عرض الملف
          </a>
        ) : (
          "لا يوجد ملف"
        ),
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
          {/* <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditFileModal(record)}
          >
            تعديل المرفقات
          </Button> */}
        </Space>
      ),
    },
  ];
  const handleDelete = (record) => {
    axios
      .delete(`${config.baseUrl1}/${config.persons}/${record.id}`)
      .then((res) => {
        notification.success({
          message: "تم الحذف بنجاح",
          description: `تم حذف القريب: ${record.nameP}`,
        });
        setData((prevData) =>
          prevData.filter((item) => item.id !== record.key)
        );
      })
      .catch((err) => {
        notification.error({
          message: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف القريب",
        });
        console.error(err);
      });
  };

  const showEditModal = (record) => {
    console.log("Record passed to showEditModal:", record);
    setEditingUnit(record);
    setIsModalVisible(true);

    // تعيين القيم في النموذج
    form.setFieldsValue({
      nameE: record.nameE,
      nameP: record.nameP,
      lastN: record.lastN,
      nameF: record.nameF,
      nameM: record.nameM,
      address: record.address,
      nationalN: record.nationalN,
      ensuranceNum: record.ensuranceNum,
      email: record.email,
      phone: record.phone,
      mobile: record.mobile,
      birthDate: record.birthDate ? moment(record.birthDate) : null,

      gender: record.gender,
      status: record.status,
      relationT: record.relationT,
    });

    console.log("Form values after setting:", form.getFieldsValue());
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        const relationId =
          relationName &&
          relationName.find((item) => item.relationName === values.relationT)
            ?.relationId;
        console.log("relation ID:", relationId);
        const updatedValues = {
          firstName: values.nameP,
          fatherName: values.nameF,
          lastName: values.lastN,
          motherName: values.nameM,
          birthDate: values.birthDate
            ? values.birthDate.format("YYYY-MM-DD")
            : null,
          nationalId: values.nationalN,
          ensuranceNumber: values.ensuranceNum,
          address: values.address,
          phone: values.phone,
          mobile: values.mobile,
          email: values.email,
          subscrib: true,
          affiliate: true,
          beneficiary: true,
          genderId: values.gender === "ذكر" ? 1 : 2,
          engineereId: engineerId,
          statusId: values.status === "متزوج" ? 1 : 2,
          relationTypeId: relationId,
        };
        console.log("birthdate", updatedValues.birthDate);
        axios
          .put(
            `${config.baseUrl1}/${config.persons}/${editingUnit.id}/${config.editPerson}`,
            updatedValues
          )
          .then((res) => {
            notification.success({
              message: "تم التعديل بنجاح",
              description: `تم تعديل بيانات المهندس: ${editingUnit.nameE}`,
            });
            console.log("response the put", res);
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.key
                  ? {
                      ...item,
                      nameE: values.nameE,
                      nameP: values.nameP,
                      lastN: values.lastN,
                      nameF: values.nameF,
                      nameM: values.nameM,
                      address: values.address,
                      nationalN: values.nationalN,
                      ensuranceNum: values.ensuranceNum,
                      email: values.email,
                      phone: values.phone,
                      mobile: values.mobile,
                      birthDate: values.birthDate
                        ? values.birthDate.format("YYYY-MM-DD")
                        : null,
                      gender: values.gender === "ذكر" ? "ذكر" : "أنثى",
                      status: values.status === "متزوج" ? "متزوج" : "عازب",
                      relationT: values.relationT,
                    }
                  : item
              )
            );
            setEditingUnit(null);
            form.resetFields();
          })
          .catch((err) => {
            notification.error({
              message: "خطأ في التعديل",
              description: "حدث خطأ أثناء تعديل بيانات المهندس",
            });
            console.error(err);
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
    size,
    showHeader,
    scroll,
    tableLayout,
  };
  const handleOk = () => {
    // Logic to handle the updated data
    const updatedValues = form.getFieldsValue();
    console.log("Updated Values:", updatedValues);
    setIsModalVisibleFile(false);
  };
  const handleCancel = () => {
    setIsModalVisibleFile(false);
  };
  return (
    <div className="flex  flex-col">
      <BackButton />
      <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
        <div className="flex pt-3 md:w-1/3 md:ml-2 items-center">
          <label
            className="w-1/3 text-sm mt-1 md:w-2/6 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg"
            style={{ cursor: "pointer" }}
          >
            العام
          </label>
          <DatePicker
            picker="year" // عرض السنوات فقط
            value={selectedDate ? moment().year(selectedDate) : null} // عرض السنة إذا كانت محددة
            onChange={handleYearChange}
            placeholder="اضغط لاختيار العام" // النص باللغة العربية
            className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl p-2 mr-2  md:ml-1 md:w-1/2 lg:-mr-14 lg:mt-2"
          />
        </div>
        <div className="flex pt-3 md:w-1/3 md:ml-3">
          <label
            className="w-1/2 md:w-2/5  md:text-sm md:mt-1 flex items-center"
            style={{ cursor: "pointer" }}
          >
            الرقم الهندسي للمهندس
          </label>
          <input
            type="text"
            className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        className="mt-10"
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="تعديل بيانات القريب"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nameE"
            label="اسم المهندس"
            rules={[{ required: false, message: "يرجى إدخال اسم المهندس" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameP"
            label="اسم القريب"
            rules={[{ required: false, message: "يرجى إدخال اسم القريب" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastN"
            label="الكنية"
            rules={[{ required: false, message: "يرجى إدخال الكنية" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameF"
            label="اسم الأب"
            rules={[{ required: false, message: "يرجى إدخال اسم الأب" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameM"
            label="اسم الأم"
            rules={[{ required: false, message: "يرجى إدخال اسم الأم" }]}
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
            name="nationalN"
            label="الرقم الوطني"
            rules={[{ required: false, message: "يرجى إدخال الرقم الوطني" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ensuranceNum"
            label="رقم التأمين"
            rules={[{ required: false, message: "يرجى إدخال رقم التأمين" }]}
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
            name="phone"
            label="الهاتف"
            rules={[{ required: false, message: "يرجى إدخال رقم الهاتف" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="الموبايل"
            rules={[{ required: false, message: "يرجى إدخال رقم الموبايل" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="تاريخ الميلاد"
            rules={[{ required: false, message: "يرجى إدخال تاريخ الميلاد" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="gender"
            label="الجنس"
            rules={[{ required: false, message: "يرجى تحديد الجنس" }]}
          >
            <Select>
              <Select.Option value="ذكر">ذكر</Select.Option>
              <Select.Option value="أنثى">أنثى</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="الحالة الاجتماعية"
            rules={[
              { required: false, message: "يرجى تحديد الحالة الاجتماعية" },
            ]}
          >
            <Select>
              <Select.Option value="متزوج">متزوج</Select.Option>
              <Select.Option value="عازب">عازب</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="relationT"
            label="درجة القرابة"
            rules={[
              { required: false, message: "يرجى تحديد الحالة الاجتماعية" },
            ]}
          >
            <Select>
              {relationName &&
                relationName.map((item) => (
                  <Select.Option
                    key={item.relationId}
                    value={item.relationName}
                  >
                    {item.relationName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllMember;
