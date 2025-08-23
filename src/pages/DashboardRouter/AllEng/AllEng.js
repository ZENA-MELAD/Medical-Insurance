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
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment";
import { usePaginatedQuery } from "Custom Hooks/useGetData";
import { Pagination, Stack } from "@mui/material";
import BackButton from "components/BackButton/BackButton";
import { NavLink } from "react-router-dom";

const AllEng = () => {
  // const [data10, loading,setPage,setPageSize] = useGet2(config.persons);
  const [data11, loading2] = useGet(config.workplaces);
  // const [data12, loading22,setPage2,setPageSize2] = useGet2(config.engineers);
  const [data13, loading223] = useGet(config.specializations);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleFile, setIsModalVisibleFile] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [page, setPage] = useState(1);

  const {
    data: d1,
    isLoading,
    isError,
  } = usePaginatedQuery(
    page,
    "items",
    `  ${config.baseUrl1}/${config.engineers}`,
    10
  );
  //const {data:d2, isLoading2, isError2, page2, nextPage2, prevPage2 } = usePaginatedQuery('items', ${config.baseUrl1}/${config.persons}, 10);
  // useEffect(() => {
  //   if (d1 && data11 && data13) {
  //     const formattedData = d1.items.map((item, index) => {
  //       const workPlaceName =
  //         data11.find((item3) => item3.id === item.workPlaceId)?.name  "";
  //       const specializatioName =
  //         data13.find((item4) => item4.id === item.specializationId)?.name
  //         "";

  //       // استخدام أول صورة من المصفوفة 'images' وأول كلمة من المصفوفة 'words'
  //       const firstImage =
  //         item.images.length > 0 ? item.images[0].fileName : null;
  //       const firstWord = item.words.length > 0 ? item.words[0].fileName : null;

  //       return {
  //         key: index,
  //         id: item.personId,
  //         nameE: item.firstName,
  //         lastN: item.lastName,
  //         nameF: item.fatherName,
  //         nameM: item.motherName,
  //         nationalN: item.nationalId,
  //         mobile: item.mobile,
  //         ensuranceNum: item.ensuranceNumber,
  //         subNum: item.subNumber,
  //         engNum: item.engNumber,
  //         phone: item.phone,
  //         address: item.address,
  //         email: item.email,
  //         birthDate: item.birthDate ? moment(item.birthDate) : null,
  //         gender: item.genderId === 1 ? "ذكر" : "أنثى",
  //         workPlace: workPlaceName,
  //         specialization: specializatioName,
  //         status: item.statusId === 1 ? "متزوج" : "عازب",
  //         image: firstImage,
  //         file: firstWord,
  //       };
  //     });
  //     setData(formattedData);
  //   }
  // }, [d1, data11, data13]);
  useEffect(() => {
    if (d1 && data11 && data13) {
      const formattedData = d1.items.map((item, index) => {
        const workPlaceName =
          data11.find((item3) => item3.id === item.workPlaceId)?.name || "";
        const specializatioName =
          data13.find((item4) => item4.id === item.specializationId)?.name ||
          "";

        // تخزين جميع الصور في مصفوفة
        const images = item.images.map((img) => img.fileName);
        const firstWord = item.words.length > 0 ? item.words[0].fileName : null;

        return {
          key: index,
          id: item.personId,
          nameE: item.firstName,
          lastN: item.lastName,
          nameF: item.fatherName,
          nameM: item.motherName,
          nationalN: item.nationalId,
          mobile: item.mobile,
          ensuranceNum: item.ensuranceNumber,
          subNum: item.subNumber,
          engNum: item.engNumber,
          phone: item.phone,
          address: item.address,
          email: item.email,
          birthDate: item.birthDate,
          gender: item.genderId === 1 ? "ذكر" : "أنثى",
          workPlace: workPlaceName,
          specialization: specializatioName,
          status: item.statusId === 1 ? "متزوج" : "عازب",
          images: images, // تخزين جميع الصور
          file: firstWord,
        };
      });
      setData(formattedData);
    }
  }, [d1, data11, data13]);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handlechange = (event, value) => {
    setPage(value);
    console.log(page);
  };
  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close,
  //   }) => (
  //     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
  //       <Input
  //         ref={searchInput}
  //         placeholder={"بحث"}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ marginBottom: 8, display: "block" }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           بحث
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           إعادة تعيين
  //         </Button>
  //         <Button type="link" size="small" onClick={() => close()}>
  //           إغلاق
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .replace(/\s+/g, "")
  //           .includes(value.toLowerCase().replace(/\s+/g, ""))
  //       : "",
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const showEditFileModal = (record) => {
    console.log("Record passed to showEditModalFile:", record);

    const images = record.images || []; // Assuming record has an 'images' array
    const files = record.files || []; // Assuming record has a 'files' array

    setEditingUnit(record);
    setIsModalVisibleFile(true);

    // Set initial values for the form
    form.setFieldsValue({
      images: images,
      files: files,
    });

    console.log("Form values after setting:", form.getFieldsValue());
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
  const columns = [
    {
      title: "اسم المهندس/ة",
      dataIndex: "nameE",
      // ...getColumnSearchProps("nameE"),
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
      // ...getColumnSearchProps("nationalN"),
    },
    {
      title: "الرقم الفرعي",
      dataIndex: "subNum",
    },
    {
      title: "رقم التأمين",
      dataIndex: "ensuranceNum",
      // ...getColumnSearchProps("ensuranceNum"),
    },
    {
      title: "الرقم الهندسي",
      dataIndex: "engNum",
      // ...getColumnSearchProps("engNum"),
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
      title: "مكان العمل",
      dataIndex: "workPlace",
    },
    {
      title: "الاختصاص",
      dataIndex: "specialization",
    },
    {
      title: "الحالة الاجتماعية",
      dataIndex: "status",
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
      .delete(`${config.baseUrl1}/${config.engineers}/${record.id}`)
      .then((res) => {
        notification.success({
          message: "تم الحذف بنجاح",
          description: `تم حذف المهندس: ${record.nameE}`,
        });
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        notification.error({
          message: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف المهندس",
        });
        console.error(err);
      });
    console.log(record);
  };

  const showEditModal = (record) => {
    console.log("Record passed to showEditModal:", record);
    setEditingUnit(record);
    setIsModalVisible(true);

    // تعيين القيم في النموذج
    form.setFieldsValue({
      nameE: record.nameE,
      lastN: record.lastN,
      nameF: record.nameF,
      nameM: record.nameM,
      address: record.address,
      nationalN: record.nationalN,
      ensuranceNum: record.ensuranceNum,
      engNum: record.engNum,
      email: record.email,
      phone: record.phone,
      mobile: record.mobile,
      birthDate: record.birthDate ? moment(record.birthDate) : null,
      gender: record.gender,
      workPlace: record.workPlace,
      specialization: record.specialization,
      status: record.status,
      subNum: record.subNum,
    });

    console.log("Form values after setting:", form.getFieldsValue());
  };
  // const showEditFileModal = (record) => {
  //   console.log("Record passed to showEditModalFile:", record);

  //   // تحقق من أن السجل يحتوي على الحقول المطلوبة قبل تعيينها في النموذج
  //   const image = record.image ? record.image : "";
  //   const file = record.file ? record.file : "";

  //   setEditingUnit(record);
  //   setIsModalVisibleFile(true);

  //   // تعيين القيم في النموذج بشكل آمن
  //   form.setFieldsValue({
  //     image: image,
  //     file: file,
  //   });

  //   console.log("Form values after setting:", form.getFieldsValue());
  // };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);

        const specializaId = data13.find(
          (item) => item.name === values.specialization
        )?.id;
        console.log("Specialization ID:", specializaId);

        const workId = data11.find(
          (item) => item.name === values.workPlace
        )?.id;
        console.log("Workplace ID:", workId);

        const updatedValues = {
          firstName: values.nameE || null,
          fatherName: values.nameF || null,
          lastName: values.lastN || null,
          motherName: values.nameM || null,
          birthDate: values.birthDate
            ? values.birthDate.format("YYYY-MM-DD")
            : null,
          nationalId: values.nationalN || null,
          ensuranceNumber: values.ensuranceNum || null,
          address: values.address,
          phone: values.phone,
          mobile: values.mobile,
          email: values.email,
          genderId: values.gender === "ذكر" ? 1 : 2 || null,
          engNumber: values.engNum || null,
          subNumber: values.subNum || null,
          statusId: values.status === "متزوج" ? 1 : 2 || null,
          specializationId: specializaId,
          workPlaceId: workId,
        };

        axios
          .put(
            `${config.baseUrl1}/${config.engineers}/${editingUnit.id}/${config.editEng}`,
            updatedValues
          )
          .then(() => {
            notification.success({
              message: "تم التعديل بنجاح",
              description: `تم تعديل بيانات المهندس: ${editingUnit.nameE}`,
            });
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.id
                  ? {
                      ...item,
                      nameE: values.nameE || null,
                      lastN: values.lastN || null,
                      nameF: values.nameF || null,
                      nameM: values.nameM || null,
                      address: values.address || null,
                      nationalN: values.nationalN || null,
                      subNum: values.subNum || null,
                      ensuranceNum: values.ensuranceNum || null,
                      engNum: values.engNum || null,
                      email: values.email || null,
                      phone: values.phone || null,
                      mobile: values.mobile || null,
                      birthDate: values.birthDate
                        ? values.birthDate.format("YYYY-MM-DD")
                        : null,
                      gender: values.gender === "ذكر" ? "ذكر" : "أنثى",
                      workPlace: values.workPlace || null,
                      specialization: values.specialization || null,
                      status: values.status === "متزوج" ? "متزوج" : "عازب",
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
  const handleEditFile = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();

      if (values.image && values.image.length > 0) {
        formData.append("Images", values.image[0].originFileObj); // تأكد من أخذ الملف الأصلي
      }

      if (values.file && values.file.length > 0) {
        formData.append("Words", values.file[0].originFileObj); // تأكد من أخذ الملف الأصلي
      }

      axios
        .put(
          `${config.baseUrl1}/${config.engineers}/${editingUnit.id}/${config.updateImageWord}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          notification.success({
            message: "تم التعديل بنجاح",
            description: `تم تعديل المرفقات`,
          });
          setIsModalVisibleFile(false);
          setData((prevData) =>
            prevData.map((item) =>
              item.id === editingUnit.id
                ? { ...item, image: values.image, file: values.file }
                : item
            )
          );
          setEditingUnit(null);
          form.resetFields();
        })
        .catch((err) => {
          notification.error({
            message: "خطأ في التعديل",
            description: "حدث خطأ أثناء تعديل المرفقات",
          });
          console.error(err);
        });
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
  // const handleNextPage=()=>setPage2(next=>next+1)
  // const handleLastPage=()=>setPage2(prev=>prev-1)
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
    // loading,
    size,
    showHeader,
    scroll,
    tableLayout,
  };

  return (
    <div className="bg-gray-100 h-full w-full p-1">
      <BackButton />
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        className="mt-10"
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="تعديل بيانات المهندس"
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
            name="engNum"
            label="الرقم الهندسي"
            rules={[{ required: false, message: "يرجى إدخال الرقم الهندسي" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subNum"
            label="الرقم الفرعي"
            rules={[{ required: false, message: "يرجى إدخال الرقم الفرعي" }]}
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
            name="workPlace"
            label="مكان العمل"
            rules={[{ required: false, message: "يرجى اختيار مكان العمل" }]}
          >
            <Select>
              {data11 &&
                data11.map((workPlace) => (
                  <Select.Option key={workPlace.id} value={workPlace.name}>
                    {workPlace.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="specialization"
            label="الاختصاص"
            rules={[{ required: false, message: "يرجى اختيار الاختصاص" }]}
          >
            <Select>
              {data13 &&
                data13.map((specialization) => (
                  <Select.Option
                    key={specialization.id}
                    value={specialization.name}
                  >
                    {specialization.name}
                  </Select.Option>
                ))}
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
        </Form>
      </Modal>
      <Modal
        title="تعديل المرفقات"
        visible={isModalVisibleFile}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="الصور">
            {form.getFieldValue("images")?.map((image, index) => (
              <div key={index}>
                <Image src={image} width={100} preview={false} />
                <Form.Item name={`images[${index}]`} noStyle>
                  <Upload
                    beforeUpload={() => false} // Prevent auto-upload
                    showUploadList={false}
                  >
                    <Button type="primary">تعديل الصورة</Button>
                  </Upload>
                </Form.Item>
              </div>
            ))}
          </Form.Item>
          {/* Additional form items for files can be added here */}
        </Form>
      </Modal>

      {/* <div className="w-full flex justify-end items-center">
     <Button onClick={handleNextPage} className="bg-slate-600 text-white shadow-xl">التالي</Button>
     <Button onClick={handleLastPage} className="mr-5 bg-slate-600 text-white shadow-xl">السابق</Button>
    
      </div> */}
      <Stack spacing={2} display={"flex"} justifyContent={"center"}>
        <Pagination
          count={d1 && d1?.totalPages}
          page={page}
          siblingCount={0}
          onChange={handlechange}
        />
      </Stack>
    </div>
  );
};

export default AllEng;
