import { Button, Input, notification, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import config from "Constants/environment";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Form, NavLink } from "react-router-dom";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import useGet from "Custom Hooks/useGet";
const SearchRE = () => {
  const [number2, setNumber2] = useState("");
  const [number, setNumber] = useState("");
  const [error3, setError3] = useState("");
  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null);
  //   const [form] = Form.useForm();
  //   const [form2] = Form.useForm();
  const [engineerId, setEngineerId] = useState("");
  const [isModalVisibleFile, setIsModalVisibleFile] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [relationName, setRelationName] = useState("");
  const [data11, loading2] = useGet(config.workplaces);
  const [data13, loading223] = useGet(config.specializations);
  useEffect(() => {
    if (number2) {
      axios
        .get(`${config.baseUrl1}/${config.searchByEnsurance}/${number2}`)
        .then((res) => {
          // Check if res.data is an array; if not, wrap it in an array
          setData2(Array.isArray(res.data) ? res.data : [res.data]);
        })
        .catch((err) => console.log(err));
    }
  }, [number2]);

  useEffect(() => {
    if (number) {
      axios
        .get(`${config.baseUrl1}/${config.searchByEnsurance}/${number}`)
        .then((res) => {
          setData(Array.isArray(res.data) ? res.data : [res.data]);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [number]);
  useEffect(() => {
    if (data && data11 && data13) {
      // تحويل data إلى مصفوفة من العناصر
      const dataArray = Array.isArray(data) ? data : [data];

      const formattedData = dataArray.map((item, index) => {
        const workPlaceName =
          data11?.find((item3) => item3.id === item.workPlaceId)?.name ||
          "غير محدد";
        const specializatioName =
          data13?.find((item4) => item4.id === item.specializationId)?.name ||
          "غير محدد";

        // إذا لم تكن هناك صور في العنصر، سيتم استخدام مصفوفة فارغة
        const images = item.images
          ? item.images.map((img) => img.fileName)
          : [];
        const firstWord =
          item.words && item.words.length > 0 ? item.words[0].fileName : null;

        return {
          key: index,
          id: item.personId,
          nameE: item.firstName || "غير متوفر",
          lastN: item.lastName || "غير متوفر",
          nameF: item.fatherName || "غير متوفر",
          nameM: item.motherName || "غير متوفر",
          nationalN: item.nationalId || "غير متوفر",
          mobile: item.mobile || "غير متوفر",
          ensuranceNum: item.ensuranceNumber || "غير متوفر",
          subNum: item.subNumber || "غير متوفر",
          engNum: item.engNumber || "غير متوفر",
          phone: item.phone || "غير متوفر",
          address: item.address || "غير متوفر",
          email: item.email || "غير متوفر",
          birthDate: item.birthDate
            ? moment(item.birthDate).format("YYYY-MM-DD")
            : "غير متوفر",
          gender: item.genderId === 1 ? "ذكر" : "أنثى",
          workPlace: workPlaceName,
          specialization: specializatioName,
          status: item.statusId === 1 ? "متزوج" : "عازب",
          images: images.length > 0 ? images : ["لا توجد صور"], // تأكيد عرض صور
          file: firstWord || "لا يوجد ملف",
        };
      });
      setData(formattedData);
    }
  }, [data, data11, data13]);

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
  //   const handleOk = () => {
  //     // Logic to handle the updated data
  //     const updatedValues = form.getFieldsValue();
  //     console.log("Updated Values:", updatedValues);
  //     setIsModalVisibleFile(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModalVisibleFile(false);
  //   };
  const showEditModal = (record) => {
    console.log("Record passed to showEditModal:", record);
    setEditingUnit(record);
    setIsModalVisible(true);

    // تعيين القيم في النموذج
    // form2.setFieldsValue({
    //   nameE: record.nameE,
    //   nameP: record.nameP,
    //   lastN: record.lastN,
    //   nameF: record.nameF,
    //   nameM: record.nameM,
    //   address: record.address,
    //   nationalN: record.nationalN,
    //   ensuranceNum: record.ensuranceNum,
    //   email: record.email,
    //   phone: record.phone,
    //   mobile: record.mobile,
    //   birthDate: record.birthDate ? moment(record.birthDate) : null,

    //   gender: record.gender,
    //   status: record.status,
    //   relationT: record.relationT,
    // });

    // console.log("Form values after setting:", form.getFieldsValue());
  };

  // const handleEdit = () => {
  //     form
  //       .validateFields()
  //       .then((values) => {
  //         console.log("Form values:", values);
  //         const relationId =
  //           relationName &&
  //           relationName.find((item) => item.relationName === values.relationT)
  //             ?.relationId;
  //         console.log("relation ID:", relationId);
  //         const updatedValues = {
  //           firstName: values.nameP,
  //           fatherName: values.nameF,
  //           lastName: values.lastN,
  //           motherName: values.nameM,
  //           birthDate: values.birthDate
  //             ? values.birthDate.format("YYYY-MM-DD")
  //             : null,
  //           nationalId: values.nationalN,
  //           ensuranceNumber: values.ensuranceNum,
  //           address: values.address,
  //           phone: values.phone,
  //           mobile: values.mobile,
  //           email: values.email,
  //           subscrib: true,
  //           affiliate: true,
  //           beneficiary: true,
  //           genderId: values.gender === "ذكر" ? 1 : 2,
  //           engineereId: engineerId,
  //           statusId: values.status === "متزوج" ? 1 : 2,
  //           relationTypeId: relationId,
  //         };
  //         console.log("birthdate", updatedValues.birthDate);
  //         axios
  //           .put(
  //             `${config.baseUrl1}/${config.persons}/${editingUnit.id}/${config.editPerson}`,
  //             updatedValues
  //           )
  //           .then((res) => {
  //             notification.success({
  //               message: "تم التعديل بنجاح",
  //               description: `تم تعديل بيانات المهندس: ${editingUnit.nameE}`,
  //             });
  //             console.log("response the put", res);
  //             setIsModalVisible(false);
  //             setData((prevData) =>
  //               prevData.map((item) =>
  //                 item.id === editingUnit.key
  //                   ? {
  //                       ...item,
  //                       nameE: values.nameE,
  //                       nameP: values.nameP,
  //                       lastN: values.lastN,
  //                       nameF: values.nameF,
  //                       nameM: values.nameM,
  //                       address: values.address,
  //                       nationalN: values.nationalN,
  //                       ensuranceNum: values.ensuranceNum,
  //                       email: values.email,
  //                       phone: values.phone,
  //                       mobile: values.mobile,
  //                       birthDate: values.birthDate
  //                         ? values.birthDate.format("YYYY-MM-DD")
  //                         : null,
  //                       gender: values.gender === "ذكر" ? "ذكر" : "أنثى",
  //                       status: values.status === "متزوج" ? "متزوج" : "عازب",
  //                       relationT: values.relationT,
  //                     }
  //                   : item
  //               )
  //             );
  //             setEditingUnit(null);
  //             // form.resetFields();
  //           })
  //           .catch((err) => {
  //             notification.error({
  //               message: "خطأ في التعديل",
  //               description: "حدث خطأ أثناء تعديل بيانات المهندس",
  //             });
  //             console.error(err);
  //           });
  //       })
  //       .catch((info) => {
  //         console.log("Validate Failed:", info);
  //       });
  //   };

  const columns = [
    {
      title: "اسم المهندس/ة",
      dataIndex: "nameE",
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
      title: "الرقم الفرعي",
      dataIndex: "subNum",
    },
    {
      title: "رقم التأمين",
      dataIndex: "ensuranceNum",
    },
    {
      title: "الرقم الهندسي",
      dataIndex: "engNum",
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
            //   onConfirm={() => handleDelete(record)}
            okText="نعم"
            cancelText="لا"
          >
            {/* <Button type="link" icon={<DeleteOutlined/>}>
                حذف
              </Button> */}
          </Popconfirm>
          {/* <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
            >
              تعديل
            </Button> */}
        </Space>
      ),
    },
  ];
  const columns2 = [
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
  const tableColumns2 = columns2.map((item) => ({
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
    <div>
      <div className="flex  pt-3 md:w-1/3 md:ml-3">
        <label className="w-1/6 ml-10 mt-2 md:w-2/6  md:text-xs lg:ml-0 lg:mt-2 lg:text-sm">
          الرقم التأميني للمهندس
        </label>
        <input
          type="text"
          className="rounded-2xl p-2 w-2/3 mr-6 md:w-3/5 md:p-2 md:ml-3"
          value={number}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^[\d-]*$/.test(newValue)) {
              setNumber(newValue);
              setError3("");
            } else {
              setError3("الرجاء إدخال أرقام فقط ");
            }
          }}
          placeholder={error3}
        />
      </div>
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns}
        dataSource={data.length ? data : []} // تحقق مباشر من وجود بيانات
        className="mt-10"
        scroll={{ x: "max-content" }}
      />
      <div className="flex  pt-3 md:w-1/3 md:ml-3">
        <label className="w-1/6 ml-10 mt-2 md:w-2/6  md:text-xs lg:ml-0 lg:mt-2 lg:text-sm">
          الرقم التأميني للفرد
        </label>
        <input
          type="text"
          className="rounded-2xl p-2 w-2/3 mr-6 md:w-3/5 md:p-2 md:ml-3"
          value={number2}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^[\d-]*$/.test(newValue)) {
              setNumber2(newValue);
              setError3("");
            } else {
              setError3("الرجاء إدخال أرقام فقط ");
            }
          }}
          placeholder={error3}
        />
      </div>
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns2}
        dataSource={hasData ? data2 : []}
        className="mt-10"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default SearchRE;
