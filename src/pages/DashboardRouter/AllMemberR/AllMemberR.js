
import { Button, Modal, Space, Table } from "antd";
import axios from "axios";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import React, { useEffect, useState } from "react";
import AllRenewallR from "../AllRenewallR/AllRenewallR";
import RenewPerson from "components/RenewPerson/RenewPerson";

const AllMemberR = ({ engNumber, engId }) => {
  const [modalData2, setModalData2] = useState(null); // تخزين بيانات العنصر الحالي
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [renewalData, setRenewalData] = useState([]);
  const [data1, setData1] = useState([]);
  const [idPerson, setIdPerson] = useState();
  const [idPerson2, setIdPerson2] = useState();
  const [namePerson, setNamaPerson] = useState();
  const [modalData, setModalData] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const [number, setNumber] = useState("");
  const [data10, setData10] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
         ` ${config.baseUrl1}/${config.relativeEng}/${engNumber}`
        );
        setNumber(response.data.engNumber);
        setData10(response.data);
        console.log("response.data.engNumber", response.data.engNumber);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching payment method:", error);
      }
    };

    fetchData();
  }, [engNumber]);

  useEffect(() => {
    if (data10) {
      const relations = data10.relations.map((item) => {
        return {
          key: item.person.id, // Use the relation ID as a unique key
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
          gender: item.person.genderId === 1 ? "ذكر" : "أنثى",
          status: item.person.statusId === 1 ? "متزوج" : "عازب",
          relationT:
          item.relationTypeId == 1
            ? "أب"
            : item.relationTypeId == 2
            ? "أم"
            : item.relationTypeId == 3
            ? "زوج"
            : item.relationTypeId == 4
            ? "زوجة"
            : item.relationTypeId == 5
            ? "ابن"
            : item.relationTypeId == 6
            ? "ابنة"
            : "غير معروف" // قيمة افتراضية في حال لم تتطابق أي من الحالات السابقة
        
              
        };
      });

      console.log("dfghjkl", data10);
      const formattedData = relations.map((relation) => ({
        key: relation.key, // Ensure unique keys
        id: data10.id,
        nameE: data10.person.firstName,
        ...relation,
      }));

      setData1(formattedData);
    }
  }, [data10]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [activeTable, setActiveTable] = useState({});
  const [activeButton1, setActiveButton1] = useState(null);
  const [activeButton2, setActiveButton2] = useState(null);
  const [nameMember, setNameMember] = useState(null);
  const closeTable = (key) => {
    setActiveTable((prev) => ({
      ...prev,
      [key]: false, // إغلاق الجدول المحدد
    }));
    setIdPerson(null); // إعادة تعيين personId
  };
  const handleToggleBenefit = (record) => {
    setActiveTable((prev) => ({
      ...prev,
      [record.key]: !prev[record.key], // Toggle the visibility of the table for the selected key
    }));
   const { nameP, nameF, lastN } = record;


// تحديث state مع الاسماء المستخرجة
   setNameMember(`${nameP} ${nameF} ${lastN}`);
    // إذا كان الجدول يظهر الآن، نحدد الـ person ID ونجعل الزر نشطًا
    if (!activeTable[record.key]) {
      setIdPerson(record.key); // Set person ID when the table is shown
      setActiveButton2(record.key);
      // Set the button as active
    } else {
      setIdPerson(null); // Reset person ID when the table is hidden
      setActiveButton2(null); // Reset the button to inactive
    }
  };
  
  console.log("bbbbbbbbbbbb", idPerson);
  const [activeRenewPersonButton, setActiveRenewPersonButton] = useState(null);
  const [showRenewPerson, setShowRenewPerson] = useState("");


const toggleRenewPerson = (record) => {
    // setShowRenewPerson((prev) => !prev); // تبديل حالة عرض RenewEngineer
    setActiveRenewPersonButton((prev) =>
      prev === record.key ? null : record.key
    ); // تبديل حالة زر تجديد الاشتراك


// استخراج القيم المطلوبة
    const { nameP, nameF, lastN } = record;

    // تحديث state مع الاسماء المستخرجة
    setNamaPerson(`${nameP} ${nameF} ${lastN}`);
    setIdPerson2(record.key);
    // طباعة القيم في وحدة التحكم
    console.log("اسم الشخص:", nameP, nameF, lastN);
    console.log("البيانات الكاملة للشخص:", record);
  };

  const getButtonClass2 = (key) => {
    return activeButton2 === key
      ? "border px-11 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-11 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };
  console.log("data1", data1);
  // Format data and fetch payment methods

  const [searchText, setSearchText] = useState("");
  const normalizeText = (text) =>
    text.trim().toLowerCase().replace(/\s+/g, " ");

  const filterData = (data) => {
    const normalizedSearchText = normalizeText(searchText);
    return data.filter((item) => {
      const normalizedName = normalizeText(item.name);
      return normalizedName.includes(normalizedSearchText);
    });
  };

  const [filteredData, setFilteredData] = useState([]);
  const getButtonClass1 = (key) => {
    return activeButton1 === key
      ? "border px-12 py-1 bg-gray-500 !text-white hover:!bg-gray-600" // اللون النشط
      : "border px-12 py-1 bg-blue-500 !text-white hover:!bg-blue-700"; // اللون الافتراضي
  };

  const getRenewPersonButtonClass = (key) => {
    return activeRenewPersonButton === key
      ? "border px-7 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-7 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };

  useEffect(() => {
    setFilteredData(filterData(renewalData));
  }, [searchText, renewalData]);
  const handleButtonClick2 = (key) => {
    setActiveButton((prev) => (prev === key ? null : key)); // Toggle the button's active state
  };
  const handleShowDetails2 = (record) => {
    setModalData2(record); // تخزين بيانات العنصر الحالي
    setIsModalVisible(true);
    setActiveButton1(record.key); // تغيير حالة الزر إلى نشط عند عرض التفاصيل
  };
  const columnsFamily = [
    {
      title: "اسم الشخص القريب",
      dataIndex: "nameP",
      align: "center",
    },
    {
      title: "الكنية",
      dataIndex: "lastN",
      align: "center",
    },
    {
      title: "اسم الأب",
      dataIndex: "nameF",
      align: "center",
    },

    {
      title: "الرقم الوطني",
      dataIndex: "nationalN",
      align: "center",
    },
    {
      title: "رقم التأمين",
      dataIndex: "ensuranceNum",
      align: "center",
    },


{
      title: "الحالة الاجتماعية",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "درجة القرابة",
      dataIndex: "relationT",
      align: "center",
    },
    {
      title: "",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle" className="flex flex-col">
          <Button
            type="link"
            className={getButtonClass1(record.key)}
            onClick={() => handleShowDetails2(record)} // عرض التفاصيل في المودال
            style={{
              color: "slateblue",
            }}
           
          >
            عرض التفاصيل...
          </Button>
          <Button
            type="link"
            onClick={() => handleToggleBenefit(record)} // Control the toggle behavior here
            className={getButtonClass2(record.key)}
          >
            {activeTable[record.key]
              ? " الاستفادة والتسجيل"
              : "الاستفادة والتسجيل"}
          </Button>

          <Button
            type="link"
            // Control the toggle behavior here
            className={getRenewPersonButtonClass(record.key)}
            onClick={() => toggleRenewPerson(record)}
          >
            إضافة الى قائمة المجددين
          </Button>
        </Space>
      ),
    },
  ];
  console.log("personidddd", idPerson);
  const handleModalClose2 = () => {
    setIsModalVisible(false); // إخفاء الـ modal
    setModalData(null); // إعادة تعيين بيانات العنصر الحالي
    setActiveButton1(null); // إعادة تعيين الزر كأنه غير نشط عند إغلاق الـ modal
  };


return (
  <div className="bg-gray-100  ">
    <Table
      className="!mt-5"
      columns={columnsFamily}
      dataSource={data1}
      pagination={false}
    />

    {modalData2 && (
      <Modal
        title="معلومات الفرد كاملة "
        visible={isModalVisible}
        onCancel={handleModalClose2}
        footer={[
          <Button key="close" onClick={handleModalClose2}>
            إغلاق
          </Button>,
        ]}
      >
        <p>الاسم: {modalData2.nameP}</p>
        <p>اسم الأم: {modalData2.nameM}</p>
        <p>اسم الأب: {modalData2.nameF}</p>
        <p>الرقم التأميني: {modalData2.ensuranceNum}</p>
        <p>العنوان: {modalData2.address}</p>
        <p>رقم الموبايل: {modalData2.mobile}</p>
        <p>رقم الهاتف: {modalData2.phone}</p>
        <p>البريد الإلكتروني: {modalData2.email}</p>
        <p>الجنس: {modalData2.gender}</p>
        <p>مكان العمل: {modalData2.work}</p>

        <p>الرقم الوطني: {modalData2.nationalN}</p>
        <p> القسط السنوي: {modalData2.amount}</p>
        <p> الحالة الاجتماعية: {modalData2.status}</p>
      </Modal>
    )}
    {idPerson && <AllRenewallR personId={idPerson} personName={nameMember} />}
    {namePerson && (
      <RenewPerson engId={engId} personId2={idPerson2} name={namePerson} />
    )}
  </div>
);
};

export default AllMemberR;