import React, { useState } from "react";
import axios from "axios";
import config from "Constants/environment";
import PaymentMethods from "components/PaymentMethods/PaymentMethods";
import Back from "components/Back/Back";

const UploadSubscribes = () => {

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <Back/>
    <PaymentMethods title="استعراض ملفات كاش" endPoint={`${config.cashExcel}`}/>
  
   
    </div>
  );
};

export default UploadSubscribes;



    


