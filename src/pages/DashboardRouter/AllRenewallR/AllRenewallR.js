import { Table, Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "Constants/environment";

const AllRenewallR = ({ personId, personName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [benefitValue, setBenefitValue] = useState(null);
  const [visibleBenefitValues, setVisibleBenefitValues] = useState({});

  // دالة لإظهار الـ Modal وتحديد قيمة الاستفادة لعرضها
  const showBenefitModal = (benefitValue) => {
    setBenefitValue(benefitValue);
    setIsModalVisible(true);
  };

  // حالة لتخزين البيانات المسترجعة من الـ API
  const [data10, setData10] = useState([]);

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.baseUrl1}/${config.GetBenifitesFamily}/${personId}`
        );
        // ترتيب البيانات حسب السنة (تصاعدي)
        const sortedData = response.data.sort((a, b) => a.year - b.year);
        setData10(sortedData); // تخزين البيانات في الحالة
      } catch (error) {
        console.error("Error fetching benefits data:", error);
      }
    };

    fetchData();
  }, [personId]);

  // دالة لإظهار أو إخفاء قيمة الاستفادة عند النقر
  const toggleBenefitValueVisibility = (record) => {
    setVisibleBenefitValues((prevState) => ({
      ...prevState,
      [record.year]: !prevState[record.year], // تبديل بين الإظهار والإخفاء
    }));
  };

  // تعريف الأعمدة للجدول
  const columns = [
    {
      title:  `جدول التسجيل/عدم التسجيل/الاستفادة/عدم الاستفادة للفرد ${personName}` ,
      children: [
        {
          title: "العام",
          dataIndex: "year",
          align: "center",
          width: "33%",
        },
        {
          title: "الحالة",
          dataIndex: "status",
          align: "center",
          width: "33%",
          render: (text) =>
            text === "مستفيد" ? (
              <>
                {text}
                <Button
                  type="link"
                  onClick={() => showBenefitModal("تفاصيل الاستفادة")}
                >
                  عرض
                </Button>
              </>
            ) : (
              text
            ),
        },
        {
          title: "قيمة الاستفادة",
          dataIndex: "nonAddForPersonSum",
          align: "center",
          width: "33%",
          render: (text, record) => (
            <>
              {visibleBenefitValues[record.year] ? (
                <>
                  {text ? text : "لا يوجد"}
                  <Button
                    type="link"
                    onClick={() => toggleBenefitValueVisibility(record)}
                  >
                    إخفاء
                  </Button>
                </>
              ) : (
                <Button
                  type="link"
                  onClick={() => toggleBenefitValueVisibility(record)}
                >
                  عرض
                </Button>
              )}
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100">
      {/* عرض الجدول مع البيانات */}
      <Table
        pagination={false}
        columns={columns}
        dataSource={data10} // البيانات المسترجعة
        rowKey={(record) => record.year} // استخدام العام كمفتاح فريد
        className="mt-10"
      />

      {/* نافذة عرض تفاصيل الاستفادة */}
      <Modal
        title="تفاصيل الاستفادة"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{benefitValue}</p>
      </Modal>
    </div>
  );
};

export default AllRenewallR;