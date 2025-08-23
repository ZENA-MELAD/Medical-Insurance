import Back from "components/Back/Back";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AnnualStudy = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // عرض معاينة للصورة إذا كان الملف صورة
      if (selectedFile.type.startsWith("image/")) {
        const fileUrl = URL.createObjectURL(selectedFile);
        setFilePreview(fileUrl);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    // إرسال الملف للسيرفر هنا...
  };

  return (
    <div className="w-full h-full bg-gray-100 p-1">
      <div className="flex justify-end">
        <Back />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full pt-10 lg:-mr-14">
          <label
            htmlFor="file-upload"
            className="text-center bg-slate-600 rounded-full text-sm p-2 md:text-lg ml-10 text-white"
          >
            استعراض الملفات
          </label>
          <input
            type="file"
            id="file-upload"
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

        {/* عرض معاينة الصورة أو رابط تحميل الملف */}
        <div className="flex justify-center mt-6">
          {filePreview ? (
            // عرض معاينة الصورة
            <img
              src={filePreview}
              alt="Preview"
              className="max-w-xs max-h-60 object-contain rounded-md shadow-md"
            />
          ) : file ? (
            // عرض رابط التحميل للملفات غير الصور
            <a
              href={URL.createObjectURL(file)}
              download={fileName}
              className="text-blue-500 underline"
            >
              تحميل {fileName}
            </a>
          ) : null}
        </div>

        <div className="flex justify-center md:justify-end w-full mt-20">
          <div className="flex justify-center items-center bg-slate-600 shadow-md rounded-full py-0 mt-2 h-10 w-4/6 md:w-1/4 lg:w-1/6">
            <input style={{ color: "white" }} value="تحميل" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnnualStudy;