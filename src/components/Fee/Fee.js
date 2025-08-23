
import { Button, Modal, Divider, Typography } from "antd"; // Ant Design imports
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;

const Fee = ({ engNumberFee, year, method }) => {
  const [isModalVisible, setIsModalVisible] = useState(true); // Set to true to show modal initially
  const [data, setData] = useState(null);

  const handleModalClose2 = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const handlePrint = () => {
    const printContent = document.getElementById("printable-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              text-align: right; /* Align text to the right for Arabic */
              direction: rtl; /* Right-to-left direction */
              background-color: #f2f2f2; /* Light gray background */
            }
            h4 {
              margin: 10px 0;
            }
            .content {
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 10px;
              background-color: #fff; /* White background */
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px; /* Limit max width */
              margin: auto; /* Center the content */
            }
            .section-title {
              font-size: 1.2em;
              margin: 20px 0 10px;
             
              padding-bottom: 5px;
            }
            p {
              margin: 8px 0; /* Spacing between paragraphs */
            }
            .divider {
              margin: 20px 0; /* Margin around the divider */
              border-top: 1px solid #eee; /* Custom divider style */
            }
            strong {
              color: #333; /* Strong text color */
            }
          </style>
        </head>
        <body onload="window.print()">
          <div class="content">
            <h1 style="text-align: center;">فاتورة المهندس</h1> <!-- Invoice title -->
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.renewalQuiries}`, {
        params: {
          engineerNumber: engNumberFee,
          year: year,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:fffffffffff", error.response.data);
        createAlert("Error", error.response.data);
      });
  }, [engNumberFee, year]);


return (
    <div className="bg-gray-100">
      {data && (
        <Modal
          title="فاتورة المهندس كاملة"
          open={isModalVisible}
          onCancel={handleModalClose2}
          footer={[
            <Button key="print" onClick={handlePrint}>
              طباعة
            </Button>,
            <Button key="close" onClick={handleModalClose2}>
              إغلاق
            </Button>,
          ]}
          centered // Centers the modal on the screen
          width={600} // Set a specific width
        >
          <div id="printable-content" className="p-4">
            <Title level={4}>معلومات المهندس:</Title>
            <Divider />
            <p>
              <Text strong>الاسم الكامل: </Text>
              {`${data.engineerInfo.firstName} ${data.engineerInfo.fatherName} ${data.engineerInfo.lastName}`}
            </p>
            <p>
              <Text strong>الرقم التأميني: </Text>
              {data.engineerInfo.ensuranceNumber}
            </p>
            <p>
              <Text strong>طريقة الدفع: </Text>
              {method}
            </p>
            <p>
              <Text strong>القسط السنوي: </Text>
              {data.engineerInfo.amount}
            </p>
            <div className="divider"></div>
            <Title level={4} className="section-title mt-5">
              الأشخاص المجددين التابعين بالمهندس:
            </Title>

            {data.familyData.length > 0 ? (
              data.familyData.map((member, index) => (
                <div
                  key={index}
                  className="mb-2 border p-2 rounded-lg bg-gray-50 shadow-sm"
                >
                  <p>
                    <Text strong>اسم الفرد: </Text>
                    {`${member.firstName} ${member.fatherName} ${member.lastName}`}
                  </p>
                  <p>
                    <Text strong>الرقم التأميني: </Text>
                    {member.ensuranceNumber}
                  </p>
                  <p>
                    <Text strong>طريقة الدفع: </Text>
                    {method}
                  </p>
                  <p>
                    <Text strong>القسط السنوي: </Text>
                    {member.amount}
                  </p>
                </div>
              ))
            ) : (
              <p>لا يوجد أفراد مجددين.</p>
            )}

            <div className="divider mt-5"></div>
            <Title level={4}>المبلغ الإجمالي:</Title>
            <p>
              <Text strong>{data.totalAmount || "غير متوفر"}</Text>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Fee;