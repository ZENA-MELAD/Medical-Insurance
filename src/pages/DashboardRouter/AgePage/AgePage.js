import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import Back from "components/Back/Back";
import AgeSegments from "components/AgeSegments/AgeSegments";
import RelationTypes from "components/RelationTypes/RelationTypes";
import Hospitals from "components/Hospitals/Hospitals";
import EnduranceRatios from "components/EnduranceRatios/EnduranceRatios";
import Collapse from "components/Collapse/Collapse";

const AgePage = () => {
  const [cardPrice, setCardPrice] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const handlCardprice = (e) => {
    setCardPrice(e.target.value);
  };

  return (
    <div className="bg-gray-100 w-full p-3 rounded-md h-full">
      <div className="flex justify-end mb-4">
        <Back />
      </div>
      <div>
        <div className=" p-2">
          <div className=" flex justify-start">
            <div className="w-full mb-2 items-center p-3 md:flex md:flex-row md:mr-4">
              <div className="flex justify-start items-center pt-3 mr-2 md:w-1/2 md:ml-2 lg:mb-3">
                <label
                  className="w-1/3 text-sm mt-1 md:w-2/6 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg"
                  style={{ cursor: "pointer" }}
                >
                  العام
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy"
                  showYearPicker
                  placeholderText="اضغط لاختيار التاريخ"
                  className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 mr-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2"
                />
              </div>
              <div className="flex pt-3 md:w-1/2 md:ml-2 lg:mr-5">
                <label
                  className="w-2/6 mt-1 md:w-2/5 md:text-sm md:mt-1 lg:text-lg "
                  style={{ cursor: "pointer" }}
                >
                  سعر البطاقة
                </label>
                <input
                  type="text"
                  className="rounded-2xl p-1 w-2/3 mr-2 md:w-1/3 md:p-1 md:ml-1 lg:w-3/5 lg:p-2"
                  value={cardPrice}
                  onChange={handlCardprice}
                />
                <div className="mt-1 ml-1">
                  <h4>ل.س</h4>
                </div>
              </div>
            </div>
            <div className="flex  md:w-1/2 md:ml-3  lg:mr-5"></div>
          </div>
        </div>
        <Collapse title={"رسوم الاشتراك بالتأمين حسب الشرائح العمرية"}>
          <AgeSegments year={selectedDate} cardPrice={cardPrice} />
        </Collapse>
        <Collapse title={"نسب التحمل"}>
          <EnduranceRatios year={selectedDate} cardPrice={cardPrice} />
        </Collapse>
        <Collapse title={"افراد العائلة"}>
          <RelationTypes year={selectedDate} cardPrice={cardPrice} />
        </Collapse>
        <Collapse title={"المشافي المتعاقدة لهذا العام"}>
          <Hospitals year={selectedDate} cardPrice={cardPrice} />
        </Collapse>
      </div>
    </div>
  );
};

export default AgePage;
