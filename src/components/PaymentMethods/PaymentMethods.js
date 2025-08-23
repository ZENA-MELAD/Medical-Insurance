import React, { useState } from "react";
import axios from "axios";
import config from "Constants/environment";

const PaymentMethods = (props) => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${config.baseUrl1}/${props.endPoint}`, formData)
      .then((res) => {
        console.log(res);
        // Clear the input fields after submission
        setFile(null);
        setFileName("");
        document.getElementById(`file-upload-${props.title}`).value = null;
      })
      .catch((err) => {
        console.log(err);
        setFile(null);
        setFileName("");
        document.getElementById(`file-upload-${props.title}`).value = null;
      });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full pt-10 ">
          <label
            htmlFor={`file-upload-${props.title}`}
            className="text-center bg-slate-600 rounded-full text-sm p-2 md:text-lg ml-10 lg:-mr-14 text-white"
          >
            {props.title}
          </label>
          <input
            type="file"
            id={`file-upload-${props.title}`}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type="text"
            value={fileName}
            readOnly
            placeholder="رابط الملف"
            className="w-4/6 bg-white rounded-full p-2 md:p-3"
          />
        </div>
        <div className="flex justify-center md:justify-end w-full mt-4">
          <div className="flex justify-center items-center bg-slate-600 shadow-md rounded-full py-0 mt-2 h-10 w-4/6 md:w-1/4 lg:w-1/6">
            <input style={{ color: "white" }} value="تحميل" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;
