import React, { useState, useEffect } from "react";
import { Space, Table, Button, Modal } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "components/Back/Back";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import axios from "axios";
import AllRenewal from "../AllRenewall/AllRenewall";
import AllMemberR from "../AllMemberR/AllMemberR";

import RenewEngineer from "components/RenewEngineer/RenewEngineer";
import Fee from "components/Fee/Fee";
import { createAlert } from "components/Alert/Alert";

const Renewal = () => {
  const location = useLocation();
  // const { data } = location.state  {}; // استقبال البيانات من الـ state
  const [data, setData] = useState(
    sessionStorage.getItem("engId")
      ? JSON.parse(sessionStorage.getItem("engId"))
      : null
  );
  const [selectedEngineer, setSelectedEngineer] = useState(null); // لتتبع المهندس الذي يتم عرض جدول الاستفادة له
  const [engNumber1, setEngNumber1] = useState(false);
  const [data11] = useGet(config.workplaces);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [data2, loading] = useGet(config.specializations);
  const [activeFamilyButtons, setActiveFamilyButtons] = useState({});
  const [activeTable, setActiveTable] = useState({});
  const [modalData, setModalData] = useState(null);
  const [modalData2, setModalData2] = useState(null); //fee
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [renewalData, setRenewalData] = useState([]);
  const [fee, setFee] = useState();
  const [number, setNumber] = useState("");
  const [data10, setData10] = useState("");

  const [data1, setData1] = useState([]);

  const [activeButton, setActiveButton] = useState(null);
  const [activeButton1, setActiveButton1] = useState(null);
  const [activeButton2, setActiveButton2] = useState(null);
  const [activeButton3, setActiveButton3] = useState(null);
  const [activeButton4, setActiveButton4] = useState(null);
  const [activeRenewEngineerButton, setActiveRenewEngineerButton] =
    useState(null);
  const [showRenewEngineer, setShowRenewEngineer] = useState(false);
  const [showFee, setShowFee] = useState(false);
  const handleButtonClick = (key) => {
    setActiveButton((prev) => (prev === key ? null : key)); // Toggle button active state
  };

  const handleButtonClick2 = (key) => {
    setActiveButton2((prev) => (prev === key ? null : key)); // Toggle button 2 active state
  };

  const getButtonClass = (key) => {
    return activeButton === key
      ? "border px-11 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-11 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };

  const getButtonClass3 = (key) => {
    return activeButton3 === key
      ? "border px-20 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-20 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };
  const getButtonClass2 = (key) => {
    return activeButton2 === key
      ? "border px-10 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-10 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };
  const getButtonClass4 = (key) => {
    return activeButton4 === key
      ? "border px-12 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-12 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };
  useEffect(() => {
    sessionStorage.removeItem("temp");
    return () => {
      setData(null);
      sessionStorage.removeItem("engId");
      sessionStorage.removeItem("temp");
    };
  }, []);

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem("engId")) || null);
  }, [location]);

  const toggleRenewEngineer = (key) => {
    setShowRenewEngineer((prev) => !prev); // تبديل حالة عرض RenewEngineer
    setActiveRenewEngineerButton((prev) => (prev === key ? null : key)); // تبديل حالة زر تجديد الاشتراك
  };
  const toggleFee = (key) => {
    if (!selectedDate2) {
      createAlert("Error", "يجب تحديد العام الحالي قبل طباعةالفاتورة"); // Set error message if year is not selected
      return;
    }
    // Clear the error if year is selected
    setShowFee((prev) => !prev);
  };
  const getRenewEngineerButtonClass = (key) => {
    return activeRenewEngineerButton === key
      ? "border px-14 py-1 bg-gray-500 !text-white hover:!bg-gray-600"
      : "border px-14 py-1 bg-blue-500 !text-white hover:!bg-blue-700";
  };
  // Function to fetch the payment method for each engineer
  const [method, setMethod] = useState();
  const fetchPaymentMethod = async (engineerId) => {
    try {
      const response = await axios.get(
        `${config.baseUrl1}/${config.GetPayMethod}`,
        {
          params: {
            engineerId,
          },
        }
      );
      setMethod(response.data.nameMethod);
      return response.data.nameMethod || "N/A";
    } catch (error) {
      console.error("Error fetching payment method:", error);
      return "N/A";
    }
  };
  console.log("nnnnnnnnnnnn", method);
  const fetchRelative = async (engNumber) => {
    try {
      const response = await axios.get(
        `${config.baseUrl1}/${config.relativeEng}/${engNumber}`
      );
      if (response.data && response.data.engNumber) {
        setNumber(response.data.engNumber); // Update the state with the engineer number
        setData10(response.data); // Store full relative data
      } else {
        setNumber(null);
        setData10(null);
      }
    } catch (error) {
      console.error("Error fetching relatives:", error);
      setNumber(null);
      setData10(null);
    }
  };

  useEffect(() => {
    if (data10) {
      const relations = data10.relations.map((item) => {
        return {
          key: item.id, // Use the relation ID as a unique key
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
            item.relationTypeId === 1
              ? "زوج/ة"
              : item.relationTypeId === 2
              ? "ابن"
              : "ابنة",
        };
      });

      const formattedData = relations.map((relation) => ({
        key: relation.key, // Ensure unique keys
        id: data10.id,
        nameE: data10.person.firstName,
        ...relation,
      }));

      setData1(formattedData);
    }
  }, [data10]);
  console.log("datapersonid", data && data.personId);
  console.log("data10", data1);
  // Format data and fetch payment methods
  const formatData = async (data) => {
    const dataArray = Array.isArray(data) ? data : [data];

    const formattedData = await Promise.all(
      dataArray.map(async (item) => {
        const paymentMethod = await fetchPaymentMethod(item.personId);
        const relative = await fetchRelative(item.engNumber); // Fetch payment method
        return {
          key: item.personId,
          numI: item.ensuranceNumber || "N/A", // الرقم التأميني
          name: `${item.firstName} ${item.fatherName} ${item.lastName}`.trim(),
          nameMother: item.motherName, // اسم الأم
          national: item.nationalId || "N/A",
          engNum: item.engNumber,

          subNum: item.subNumber, // الرقم الفرعي
          mobile: item.mobile || "N/A", // الموبايل
          email: item.email || "N/A", // البريد الإلكتروني
          amount: item.amount !== null ? item.amount : "N/A", // القسط السنوي
          status: item.statusId === 1 ? "متزوج" : "أعزب", // الحالة الاجتماعية
          address: item.address,
          sp:
            (data2 &&
              data2.find((spItem) => spItem.id === item.specializationId)
                ?.name) ||
            "N/A",
          work:
            (data11 &&
              data11.find((workItem) => workItem.id === item.workPlaceId)
                ?.name) ||
            "N/A", // اسم مكان العمل
          gender: item.genderId === 1 ? "ذكر" : "أنثى", // الجنس
          pay: paymentMethod, // طريقة الدفع
          showFamily: false, // حالة عرض أفراد العائلة
          showBenefit: false, // حالة عرض جدول الاستفادة
          showDetails: false,
          showFee: false,
        };
      })
    );

    return formattedData;
  };

  const normalizeText = (text) =>
    text.trim().toLowerCase().replace(/\s+/g, " ");

  const filterData = (data) => {
    const normalizedSearchText = normalizeText(searchText);
    return data.filter((item) => {
      const normalizedName = normalizeText(item.name);
      return normalizedName.includes(normalizedSearchText);
    });
  };

  useEffect(() => {
    if (data && data1) {
      formatData(data).then((formattedData) => {
        setRenewalData(formattedData);
        setFilteredData(filterData(formattedData));
        // تأكد من تحديث filteredData1 هنا
        // هذه سطر محوري
      });
    }
  }, [data, data11]);

  useEffect(() => {
    setFilteredData(filterData(renewalData));
  }, [searchText, renewalData]);

  const handleModalClose = () => {
    setIsModalVisible(false); // إخفاء المودال
    setModalData(null); // إعادة تعيين بيانات العنصر الحالي
    setActiveButton1(null); // إعادة تعيين حالة الزر لإعادة لونه
  };
  const handleModalClose2 = () => {
    setIsModalVisible(false); // إخفاء المودال
    setModalData2(null); // إعادة تعيين بيانات العنصر الحالي
    setActiveButton3(null); // إعادة تعيين حالة الزر لإعادة لونه
  };
  console.log("data", data && data.engNumber);
  const handleToggleFamily = (key) => {
    if (data && data.engNumber) {
      setEngNumber1(!engNumber1);
      setRenewalData((prevData) =>
        prevData.map((item) =>
          item.key === key ? { ...item, showFamily: !item.showFamily } : item
        )
      );
      setActiveFamilyButtons((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
      handleButtonClick(key);
      fetchRelative(key); // Fetch relative data based on engineer number
    } else {
      console.error("Engineer number is missing or invalid.");
    }
  };

  const handleShowDetails = (record) => {
    setModalData(record); // تعيين بيانات المهندس الحالي للـ modal
    setIsModalVisible(true); // إظهار الـ modal
  };

  const handleToggleBenefit = (key) => {
    const selected = renewalData.find((item) => item.key === key);
    setSelectedEngineer((prev) => (prev && prev.key === key ? null : selected)); // تتبع المهندس المختار
    handleButtonClick2(key);
    setRenewalData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, showBenefit: !item.showBenefit } : item
      )
    );

    setActiveTable((prev) => ({
      ...prev,
      [key]: !prev[key], // تبديل الحالة الحالية
    }));
  };

  const columns = [
    {
      title: "الاسم الكامل",
      dataIndex: "name",
      align: "center",
    },
    { title: "اسم الأم", dataIndex: "nameMother", align: "center" },
    { title: "الرقم التأميني", dataIndex: "numI", align: "center" },
    { title: "الرقم الهندسي", dataIndex: "engNum", align: "center" },
    { title: "الرقم الوطني", dataIndex: "national", align: "center" },
    { title: "القسط السنوي", dataIndex: "amount", align: "center" },
    { title: "طريقة الدفع", dataIndex: "pay", align: "center" }, // Display payment method
    {
      title: "",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle" className="flex flex-col">
          <Button
            type="link"
            onClick={() => handleToggleFamily(record.key)}
            className={getButtonClass(record.key)}
          >
            {record.showFamily ? "إخفاء أفراد العائلة" : "عرض أفراد العائلة"}
          </Button>
          <Button
            type="link"
            onClick={() => handleToggleBenefit(record.key)}
            className={getButtonClass2(record.key)}
          >
            {record.showBenefit ? "الاستفادة والتسجيل" : "  الاستفادة والتسجيل"}
          </Button>
          <Button
            type="link"
            onClick={() => handleShowDetails(record)}
            className={getButtonClass4(record.key)}
          >
            عرض التفاصيل...
          </Button>
          <Button
            type="link"
            onClick={() => toggleRenewEngineer(record.key)} // استخدام المفتاح لتحديد الزر
            className={getRenewEngineerButtonClass(record.key)} // استخدام الدالة الجديدة لتحديد اللون
          >
            {showRenewEngineer ? " تجديد الاشتراك" : "تجديد الاشتراك"}
            {/* تبديل النص بناءً على حالة العرض */}
          </Button>
          <Button
            type="link"
            onClick={() => toggleFee(record.key)}
            className={getButtonClass3(record.key)}
          >
            الفاتورة
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-100   ">
      <Back />
      {modalData && (
        <Modal
          title="معلومات المهندس كاملة "
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              إغلاق
            </Button>,
          ]}
        >
          <p>الاسم: {modalData.name}</p>
          <p>اسم الأم: {modalData.nameMother}</p>
          <p>الرقم التأميني: {modalData.numI}</p>
          <p>العنوان: {modalData.address}</p>
          <p>رقم الهاتف: {modalData.mobile}</p>
          <p>البريد الإلكتروني: {modalData.email}</p>
          <p>الجنس: {modalData.gender}</p>
          <p>مكان العمل: {modalData.work}</p>
          <p>الرقم الفرعي: {modalData.subNum}</p>
          <p>الرقم الهندسي: {modalData.engNum}</p>
          <p>الرقم الوطني: {modalData.national}</p>
          <p> القسط السنوي: {modalData.amount}</p>
          <p> الحالة الاجتماعية: {modalData.status}</p>
          <p> الاختصاص: {modalData.sp}</p>
          <p> طريقة الدفع: {modalData.pay}</p>
        </Modal>
      )}
      <div>
        <div className="flex pt-3 md:w-1/3 md:ml-2 items-center">
          <label
            className="w-1/3 text-sm mt-1 md:w-2/6 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg"
            style={{ cursor: "pointer" }}
          >
            العام
          </label>
          <DatePicker
            selected={selectedDate2}
            onChange={(date) => {
              setSelectedDate2(date);
              // Clear error on date selection
            }}
            dateFormat="yyyy"
            showYearPicker
            placeholderText="اضغط لاختيار التاريخ"
            className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 mr-2 md:w-11/12 md:ml-1 lg:w-11/12 lg:mt-2"
          />
        </div>
      </div>
      <Table
        bordered
        size="large"
        showHeader
        pagination={false}
        columns={columns}
        dataSource={filteredData} // عرض البيانات التي تم تصفيتها
        scroll={{ x: "max-content" }}
        className="mt-10"
      />
      {selectedEngineer && (
        <AllRenewal
          personId={data && data.personId}
          name={data && data.firstName}
          last={data && data.lastName}
        />
      )}
      {engNumber1 && (
        <AllMemberR
          engNumber={data && data.engNumber}
          engId={data && data.personId}
        />
      )}
      {showRenewEngineer && (
        <RenewEngineer
          ensuranceNum={data && data.ensuranceNumber}
          name={data && data.firstName}
          last={data && data.lastName}
        />
      )}
      {showFee &&
        selectedDate2 && ( // Ensure selectedDate2 is not null before passing it
          <Fee
            engNumberFee={data && data.engNumber}
            year={selectedDate2.getFullYear()}
            method={method}
          /> // Pass the year when needed
        )}
    </div>
  );
};

export default Renewal;
