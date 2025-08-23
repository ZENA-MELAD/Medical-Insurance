import React, { useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import gender3 from "Assets/Data/gender";
import useGet from "../../../Custom Hooks/useGet";
import config from "../../../Constants/environment";

import status2 from "Assets/Data/status";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import Back from "components/Back/Back";
import Quiries from "components/Quiries/Quiries";
import { BsFillSendFill } from "react-icons/bs";
import moment from "moment";
import { usePaginatedQuery } from "Custom Hooks/useGetData";
import { Spin } from "antd";
const AddUser = () => {
  const [gender, setGender] = useState("");
  const [work, setWork] = useState("");
  const [status, setStatus] = useState("");
  const [option, setOption] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const handleChange22 = (event) => {
    setGender(event.target.value);

    setErrorMessage10("");
  };

  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const [errorMessage5, setErrorMessage5] = useState("");
  const [errorMessage6, setErrorMessage6] = useState("");
  const [errorMessage7, setErrorMessage7] = useState("");
  const [errorMessage8, setErrorMessage8] = useState("");
  const [errorMessage9, setErrorMessage9] = useState("");
  const [errorMessage10, setErrorMessage10] = useState("");
  const [errorMessage11, setErrorMessage11] = useState("");
  const [errorMessage12, setErrorMessage12] = useState("");
  const [errorMessage13, setErrorMessage13] = useState("");

  const [message, setMessage] = useState();
  const [isNumberFound, setIsNumberFound] = useState(false);
  const [isNumberFoundEng, setIsNumberFoundEng] = useState(false);
  const [isNumberFoundSub, setIsNumberFoundSub] = useState(false);
  const [show, setShow] = useState(false);
  const handleChange3 = (event) => {
    setWork(event.target.value);
    setErrorMessage11("");
  };

  const handleChangeNational = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      // يسمح فقط بالأرقام من 0 إلى 11
      setNationalId(newValue);
      console.log(nationalId);
      setErrorMessage6("");
      setError("");
    } else {
      setError("الرجاء إدخال أرقام فقط وبحد أقصى 11 رقمًا");
    }
  };
  const handleChangeSub = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setSubNumber(newValue);
      setError2("");
      setErrorMessage7("");
    } else {
      setError2("الرجاء إدخال أرقام فقط");
    }
  };

  const handleChangeEnc = (e) => {
    const newValue = e.target.value;
    if (/^[\d-]*$/.test(newValue)) {
      setEnsuranceNumber(newValue);
      setError3("");
      setErrorMessage8("");
    } else {
      setError3("الرجاء إدخال أرقام فقط ");
    }
  };
  const handleChangeEng = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setEngNumber(newValue);
      setError4("");
      setErrorMessage9("");
    } else {
      setError4("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangePhone6 = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setMobile(newValue);
      setError6("");
    } else {
      setError6("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangePhone5 = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setPhone(newValue);
      setError5("");
    } else {
      setError5("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChange5 = (event) => {
    setStatus(event.target.value);
    setErrorMessage13("");
  };
  const handleChange6 = (event) => {
    setOption(event.target.value);
    setErrorMessage12("");
  };
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleImages = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setImages(selectedFiles);
    setFileName(selectedFiles.map((file) => file.name).join(", "));
  };

  const [open, setOpen] = useState(false);
  const [username3, setUserName3] = useState();
  const [fatherName, setFatherName] = useState();
  const [lastName, setLastName] = useState();
  const [motherName, setMotherName] = useState();
  const [nationalId, setNationalId] = useState("");
  const [ensuranceNumber, setEnsuranceNumber] = useState("");
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState("");
  const [gender2, setGender2] = useState();
  const [engNumber, setEngNumber] = useState("");
  const [subNumber, setSubNumber] = useState("");
  const [status3, setStatus3] = useState();
  const [specialization, setSpecialization] = useState();
  const [workPlace, setWorkPlace] = useState();
  const [images, setImages] = useState([]);
  const [wordF, setWordF] = useState([]);

  const [year, setYear] = useState();
  // const [pay, setPay] = useState();
  const [engName, setEngName] = useState("");
  const handleChangeGender = (id) => {
    setGender2(id);
    console.log(gender2);
  };

  const handeleChangeStatus = (id3) => {
    setStatus3(id3);

    console.log(status3);
  };
  const handleChangeSpec = (id4) => {
    setSpecialization(id4);
    console.log(id4);
  };
  const handleChangeWork = (id4) => {
    setWorkPlace(id4);
    console.log(id4);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        e.target.value.trim() === "" &&
        e.target !== inputRef9.current &&
        e.target !== inputRef10.current &&
        e.target !== inputRef11.current
      ) {
        e.target.focus();
      } else {
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    }
  };
  const handleEngName = (e) => {
    setUserName3(e.target.value);
    setErrorMessage1("");
  };

  const [fileName2, setFileName2] = useState();
  const handleWord = (e) => {
    const selectedFiles = Array.from(e.target.files); // تحويل FileList إلى مصفوفة
    setWordF(selectedFiles); // تعيين الملفات كمصفوفة
    setFileName2(selectedFiles.map((file) => file.name).join(", ")); // عرض أسماء الملفات
  };
  const handleLastN = (e) => {
    setLastName(e.target.value);
    setErrorMessage2("");
  };
  const handleFatherN = (e) => {
    setFatherName(e.target.value);
    setErrorMessage3("");
  };
  const handleMotherN = (e) => {
    setMotherName(e.target.value);
    setErrorMessage4("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrorMessage5("");
  };
  const [loading, setLoading] = useState(false);

  const [dataw, loadingW] = useGet(config.workplaces);
  const [dataU, loadingU] = useGet(config.engineeringunits);
  const [page, setPage] = useState(1);
  // const [data8, loading8, setPage, setPageSize] = useGet2(config.persons);
  const {
    data: d1,
    isLoading,
    isError,
  } = usePaginatedQuery(
    page,
    "items",
    `${config.baseUrl1}/${config.engineers}`,
    10
  );

  const [data7, setData7] = useState(0);
  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.annualdata}`, {
        params: {
          birthdate: selectedDate,
          year: selectedDate2,
        },
      })
      .then((res) => {
        setData7(res.data);
        console.log("this is annaul data aaaaa", res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate, selectedDate2, data7]);

  const handleLabelClick13 = () => {
    if (inputRef13.current) {
      inputRef13.current.focus();
    }
  };

  useEffect(() => {
    const message1 = message; // Assuming you have another message state or prop
    // const message2 = 200; // For demonstration purposes, assuming second message is always 200

    if (message1 === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);
  // console.log(birthDate);
  console.log("images" + images);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const inputRef12 = useRef(null);
  const inputRef13 = useRef(null);
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleLabelClick1 = () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
  };
  const handleLabelClick2 = () => {
    if (inputRef2.current) {
      inputRef2.current.focus();
    }
  };
  const handleLabelClick3 = () => {
    if (inputRef3.current) {
      inputRef3.current.focus();
    }
  };
  const handleLabelClick4 = () => {
    if (inputRef4.current) {
      inputRef4.current.focus();
    }
  };
  const handleLabelClick5 = () => {
    if (inputRef5.current) {
      inputRef5.current.focus();
    }
  };
  const handleLabelClick6 = () => {
    if (inputRef6.current) {
      inputRef6.current.focus();
    }
  };
  const handleLabelClick7 = () => {
    if (inputRef7.current) {
      inputRef7.current.focus();
    }
  };
  const handleLabelClick8 = () => {
    if (inputRef8.current) {
      inputRef8.current.focus();
    }
  };
  const handleLabelClick9 = () => {
    if (inputRef9.current) {
      inputRef9.current.focus();
    }
  };
  const handleLabelClick10 = () => {
    if (inputRef10.current) {
      inputRef10.current.focus();
    }
  };
  const handleLabelClick11 = () => {
    if (inputRef11.current) {
      inputRef11.current.focus();
    }
  };
  const handleLabelClick12 = () => {
    if (inputRef12.current) {
      inputRef12.current.focus();
    }
  };

  const [specializatio] = useGet(config.specializations);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const checkNumber = (nationalId) => {
    // تحقق من طول الرقم الوطني
    if (nationalId && nationalId.length < 11) {
      createAlert("Error", "الرقم الوطني يجب أن يكون 11 رقماً ");
      setIsNumberFound(false);
      return; // الخروج من الدالة إذا كان الطول أقل من 11
    }

    // إذا كان الطول صحيحاً، نرسل الطلب
    axios
      .get(`${config.baseUrl1}/${config.searchByNational}`, {
        params: {
          nationalId: nationalId,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          createAlert("Error", "هذا الرقم الوطني موجود");
          setIsNumberFound(true);
        } else {
          setIsNumberFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkNumberEng = () => {
    axios
      .get(`${config.baseUrl1}/${config.searchByEng}/${engNumber}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          createAlert("Error", "هذا الرقم الهندسي موجود");
          setIsNumberFoundEng(true);
        } else {
          setIsNumberFoundEng(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkNumberSub = () => {
    axios
      .get(`${config.baseUrl1}/${config.searchBySub}/${subNumber}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          createAlert("Error", "هذا الرقم الفرعي موجود");
          setIsNumberFoundSub(true);
        } else {
          setIsNumberFoundSub(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [noteContent, setNoteContent] = useState("");
  // const [personsId, setPersonsId] = useState();
  const [nePersonId, setNePersonId] = useState(null); // State to hold the person ID
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value); // تحديث حالة noteContent بناءً على إدخال المستخدم
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    await checkNumber(); // الانتظار حتى يتم فحص الرقم الوطني

    // إذا كان الرقم الوطني موجودًا، إيقاف العملية وعرض رسالة الخطأ
    if (isNumberFound) {
      return;
      // إيقاف العملية ومنع إرسال النموذج
    }
    if (!username3) {
      setErrorMessage1(null);
      hasError = true;
    } else {
      setErrorMessage1("");
    }

    if (!lastName) {
      setErrorMessage2(null);
      hasError = true;
    } else {
      setErrorMessage2("");
    }

    if (!fatherName) {
      setErrorMessage3(null);
      hasError = true;
    } else {
      setErrorMessage3("");
    }

    if (!motherName) {
      setErrorMessage4(null);
      hasError = true;
    } else {
      setErrorMessage4("");
    }

    if (!address) {
      setErrorMessage5(null);
      hasError = true;
    } else {
      setErrorMessage5("");
    }

    if (!nationalId) {
      setErrorMessage6(null);
      hasError = true;
    } else {
      setErrorMessage6("");
    }

    if (!subNumber) {
      setErrorMessage7(null);
      hasError = true;
    } else {
      setErrorMessage7("");
    }

    if (!ensuranceNumber) {
      setErrorMessage8(null);
      hasError = true;
    } else {
      setErrorMessage8("");
    }

    if (!engNumber) {
      setErrorMessage9(null);
      hasError = true;
    } else {
      setErrorMessage9("");
    }

    if (!gender) {
      setErrorMessage10(null);
      hasError = true;
    } else {
      setErrorMessage10("");
    }

    if (!work) {
      setErrorMessage11(null);
      hasError = true;
    } else {
      setErrorMessage11("");
    }

    if (!option) {
      setErrorMessage12(null);
      hasError = true;
    } else {
      setErrorMessage12("");
    }

    if (!status) {
      setErrorMessage13(null);
      hasError = true;
    } else {
      setErrorMessage13("");
    }

    if (!hasError) {
      const formData = new FormData();

      formData.append("firstName", username3);
      formData.append("fatherName", fatherName);
      formData.append("lastName", lastName);
      formData.append("motherName", motherName);
      formData.append(
        "birthDate",
        selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
      );

      formData.append("nationalId", nationalId);
      formData.append("ensuranceNumber", ensuranceNumber);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("genderId", gender2);
      formData.append("engNumber", engNumber);
      formData.append("subNumber", subNumber);
      formData.append("statusId", status3);
      formData.append("specializationId", specialization);
      formData.append("workPlaceId", workPlace);

      if (Array.isArray(images)) {
        images.forEach((image) => {
          formData.append("contentImage", image); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }

      // Assuming you have other files to upload
      if (Array.isArray(wordF)) {
        wordF.forEach((file) => {
          formData.append("contentFile", file); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }
      setLoading(true);
      try {
        const response = await axios.post(
          `${config.baseUrl1}/${config.engineers}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const insertedId = response.data.insertedId;
        if (insertedId) {
          axios
            .get(`${config.baseUrl1}/${config.engineers}/${insertedId}`)
            .then((res) => {
              console.log(res.data);
              const fullName = `${res.data.firstName || ""} ${
                res.data.fatherName || ""
              } ${res.data.lastName || ""}`.trim();
              setEngName(fullName);
            })
            .catch((err) => {
              console.log(err);
            });
          setShow(true);
        }
        // احصل على insertedId من استجابة الطلب الأول
        console.log("person id", insertedId);
        setNePersonId(insertedId); // Store the new person ID in state
        await handleAddNote(insertedId); // Call the note addition directly if you want

        setMessage(response.status);
      } catch (error) {
        console.error("Error uploading data:", error);
        createAlert("Error", "فشل الارسال");
      } finally {
        setLoading(false);
      }
      // Reset fields
      setUserName3("");
      setFatherName("");
      setLastName("");
      setMotherName("");
      setAddress("");
      setEmail("");
      inputRef.current.focus();
      setEnsuranceNumber("");
      setMobile("");
      setPhone("");
      setSelectedDate(null);
      setSelectedDate2(null); // Reset date to null
      setNationalId("");
      setGender(""); // Reset gender select
      setEngNumber("");
      setSubNumber("");
      setStatus(""); // Reset status select
      setOption(""); // Reset option select
      setWork("");
      setFileName("");
      setFileName2("");
      // Reset work select
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

  const handleAddNote = async (nePersonId) => {
    if (!nePersonId) {
      createAlert("Error", "يجب إضافة مهندس أولًا قبل إرسال الملاحظات");
      return;
    }

    const noteData = {
      content: noteContent, // الملاحظات التي أدخلها المستخدم
      personId: nePersonId, // استخدام newPersonId بدلاً من personsId
      relationId: 0,
      hospitalId: 0,
      surgicalProcedureId: 0,
      yearConfigId: 0,
    };

    console.log("Note data being sent:", noteData);

    try {
      const response2 = await axios.post(
        `${config.baseUrl1}/${config.notes}`,
        noteData
      );
      console.log("Note added:", response2.data);

      setMessage("تم إضافة الملاحظات بنجاح!");
      // createAlert("Success", "تمت اضافه الملاحظه");
    } catch (error) {
      console.error("Error adding note:", error);
      createAlert("Error", "فشل في إضافة الملاحظات");
    }
  };

  const handleNoteSubmit = () => {
    if (nePersonId) {
      handleAddNote(nePersonId); // Pass the correct person ID
      createAlert("Success", "تمت اضافه الملاحظه");
      setShow(false);
    } else {
      createAlert("Error", "يجب إضافة مهندس أولًا قبل إرسال الملاحظات");
    }
  };

  return (
    <div className="bg-gray-100 w-full p-1">
      <div className="flex justify-between">
        <Quiries title="عرض ذاتية المشتركين" link="/dashboard/alleng" />
        <Back />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full ">
          <div className="w-full  p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
            <div className=" flex flex-col p-2 ">
              <label
                className=" md:text-sm md:mt-1"
                onClick={handleLabelClick}
                style={{ cursor: "pointer" }}
              >
                اسم المهندس/ة
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef}
                onChange={handleEngName}
                onKeyDown={(e) => handleKeyDown(e, inputRef1)}
                value={username3}
                style={{
                  border: errorMessage1 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="  flex flex-col p-2 ">
              <label
                className="w-2/6 md:w-2/6"
                onClick={handleLabelClick1}
                style={{ cursor: "pointer" }}
              >
                الكنية
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef1}
                onChange={handleLastN}
                value={lastName}
                onKeyDown={(e) => handleKeyDown(e, inputRef2)}
                style={{
                  border: errorMessage2 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className=" flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick2}
                style={{ cursor: "pointer" }}
              >
                اسم الأب
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef2}
                onChange={handleFatherN}
                value={fatherName}
                onKeyDown={(e) => handleKeyDown(e, inputRef3)}
                style={{
                  border: errorMessage3 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm md:ml-4"
                onClick={handleLabelClick3}
                style={{ cursor: "pointer" }}
              >
                اسم الأم
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef3}
                onChange={handleMotherN}
                value={motherName}
                onKeyDown={(e) => handleKeyDown(e, inputRef4)}
                style={{
                  border: errorMessage4 == null ? "1px solid red" : "none",
                }} // Navigate to next field
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick4}
                style={{ cursor: "pointer" }}
              >
                العنوان
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef4}
                onChange={handleAddress}
                value={address}
                onKeyDown={(e) => handleKeyDown(e, inputRef5)}
                style={{
                  border: errorMessage5 == null ? "1px solid red" : "none",
                }} // Navigate to next field
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick5}
                style={{ cursor: "pointer" }}
              >
                الرقم الوطني
              </label>
              <input
                type="text"
                ref={inputRef5}
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                onChange={handleChangeNational}
                value={nationalId}
                onKeyDown={(e) => handleKeyDown(e, inputRef6)}
                onBlur={() => checkNumber(nationalId)}
                // Navigate to next field
                placeholder={error}
                style={{
                  border: errorMessage6 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm md:ml-4"
                onClick={handleLabelClick6}
                style={{ cursor: "pointer" }}
              >
                الرقم الفرعي
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef6}
                onChange={handleChangeSub}
                value={subNumber}
                onBlur={checkNumberSub}
                onKeyDown={(e) => handleKeyDown(e, inputRef7)}
                placeholder={error2} // Navigate to next field
                style={{
                  border: errorMessage7 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick7}
                style={{ cursor: "pointer" }}
              >
                رقم التأمين
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef7}
                onChange={handleChangeEnc}
                value={ensuranceNumber}
                onKeyDown={(e) => handleKeyDown(e, inputRef8)}
                // Navigate to next field
                placeholder={error3}
                style={{
                  border: errorMessage8 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick8}
                style={{ cursor: "pointer" }}
              >
                الرقم الهندسي
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef8}
                onChange={handleChangeEng}
                value={engNumber}
                onKeyDown={(e) => handleKeyDown(e, inputRef9)}
                placeholder={error4} // Navigate to next field
                style={{
                  border: errorMessage9 == null ? "1px solid red" : "none",
                }}
                onBlur={checkNumberEng}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                onClick={handleLabelClick10}
                className="w-2/6 md:w-2/6 text-sm"
                style={{ cursor: "pointer" }}
              >
                الإيميل
              </label>
              <input
                type="email"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef9}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onKeyDown={(e) => handleKeyDown(e, inputRef10)} // Navigate to next field
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className="w-2/6 md:w-2/6 text-sm"
                onClick={handleLabelClick11}
                style={{ cursor: "pointer" }}
              >
                الهاتف
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef10}
                onChange={handleChangePhone5}
                value={phone}
                onKeyDown={(e) => handleKeyDown(e, inputRef11)}
                placeholder={error5} // Navigate to next field
              />
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick12}
                style={{ cursor: "pointer" }}
              >
                الموبايل
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                ref={inputRef11}
                onChange={handleChangePhone6}
                value={mobile}
                onKeyDown={(e) => handleKeyDown(e, inputRef12)}
                placeholder={error6}
              />
            </div>
            
              <div className="flex flex-col p-2 ">
                <label
                  className="w-2/6 md:w-full  md:text-sm"
                  style={{ cursor: "pointer" }}
                >
                  العام
                </label>
                <input
                  type="text"
                  value={selectedDate2}
                  onChange={(e) => setSelectedDate2(e.target.value)}
                  maxLength={4}
                  pattern="\d{4}"
                  placeholderText="اضغط لاختيار التاريخ"
                  className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full rounded-2xl p-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2"
                />
                {/* <DatePicker
                selected={selectedDate2}
                onChange={(date) => setSelectedDate2(date)}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 mr-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2"
              /> */}
              </div>
              <div className="flex flex-col p-2">
                <label
                  className="w-2/6 md:w-2/6 md:text-sm mb-2 "
                  onClick={handleLabelClick9}
                  style={{ cursor: "pointer" }}
                >
                  تاريخ الميلاد
                </label>
                {/* <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="اضغط لاختيار التاريخ"
                className="rounded-2xl p-2 mt-2 ml-10 w-fit  md:ml-1 shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline  md:w-10/12 lg:mr-2 "
                onKeyDown={(e) => handleKeyDown(e, inputRef10)} // Navigate to next field
                maxDate={new Date()}
              /> */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="اضغط لاختيار التاريخ"
                  className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2 "
                />
              </div>
              <div className="flex flex-col p-2">
                <p className="w-2/6 md:text-sm lg:ml-7 ">القسط السنوي</p>
                <input
                  type="text"
                  readOnly
                  value={selectedDate ? data7 : 0}
                  className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1"
                />
              </div>
            
          </div>
          <div className=" grid grid-cols-2  mb-2  w-full pt-3 pr-3  md:grid md:grid-cols-3 lg:grid-cols-4  ">
            <FormControl sx={{ m: 1, minWidth: 160, maxWidth: 240 }}>
              <InputLabel label id="demo-simple-select-label">
                الجنس
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="الجنس"
                onChange={handleChange22}
                style={{
                  background: "white",
                  borderRadius: "40px",
                  border: errorMessage10 == null ? "1px solid red" : "none",
                }}
              >
                {gender3 &&
                  gender3.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                      onClick={() => {
                        handleChangeGender(index + 1);
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160, maxWidth: 240 }}>
              <InputLabel label id="demo-simple-select-label">
                مكان العمل
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={work}
                label=" مكان العمل"
                onChange={handleChange3}
                style={{
                  background: "white",
                  borderRadius: "40px",
                  border: errorMessage11 == null ? "1px solid red" : "none",
                }}
              >
                {dataw &&
                  dataw.map((item4) => (
                    <MenuItem
                      value={item4.name}
                      key={item4.id}
                      onClick={() => handleChangeWork(item4.id)}
                    >
                      {item4.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 160, maxWidth: 240 }}>
              <InputLabel label id="demo-simple-select-label">
                الاختصاص
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label="الاختصاص "
                onChange={handleChange6}
                style={{
                  background: "white",
                  borderRadius: "40px",
                  border: errorMessage12 == null ? "1px solid red" : "none",
                }}
              >
                {specializatio &&
                  specializatio.map((item4, index4) => (
                    <MenuItem
                      value={item4.name}
                      key={index4.id}
                      onClick={() => handleChangeSpec(item4.id)}
                    >
                      {item4.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160, maxWidth: 240 }}>
              <InputLabel label id="demo-simple-select-label">
                الحالة الاجتماعية
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label=" الحالة الاجتماعية"
                onChange={handleChange5}
                style={{
                  background: "white",
                  borderRadius: "40px",
                  border: errorMessage13 == null ? "1px solid red" : "none",
                }}
              >
                {status2 &&
                  status2.map((item3, index3) => (
                    <MenuItem
                      value={item3}
                      key={index3}
                      onClick={() => handeleChangeStatus(index3 + 1)}
                    >
                      {item3}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full mr-4  p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
            <div className="flex justify-start items-center mb-4 ">
              <label
                htmlFor="file-upload"
                className="text-center ml-8 w-1/3 bg-slate-600 rounded-full text-xs p-2 md:text-sm text-white "
              >
                استعراض صورة
              </label>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleImages}
                multiple
                accept="image/*"
              />
              <input
                type="text"
                value={fileName}
                readOnly
                placeholder="رابط الملف"
                className="w-2/4 bg-white rounded-full p-2 md:p-3 lg:mr-3"
              />
            </div>
            <div className="flex justify-start items-center  ">
              <label
                htmlFor="file-upload1"
                className="text-center ml-8 w-1/3 bg-slate-600 rounded-full text-xs p-2 md:text-sm text-white lg:mr-4 "
              >
                استعراض ملف وورد
              </label>
              <input
                type="file"
                id="file-upload1"
                style={{ display: "none" }}
                onChange={handleWord}
                multiple
                accept=".doc,.docx"
              />

              <input
                type="text"
                value={fileName2}
                readOnly
                placeholder="رابط الملف"
                className="w-2/4 bg-white rounded-full p-2 md:p-3 lg:-mr-2  "
              />
            </div>
          </div>

          {show == true ? (
            <>
              <div className="flex flex-col mt-6 p-5">
                <label
                  onClick={handleLabelClick13}
                  style={{ cursor: "pointer" }}
                >
                  اضافة ملاحظة
                </label>

                <div className="flex relative">
                  <textarea
                    ref={inputRef13}
                    name="postContent"
                    placeholder={
                      engName
                        ? `إضافة ملاحظة للمهندس ${engName}`
                        : "إضافة ملاحظة"
                    }
                    rows={4}
                    cols={200}
                    className="  p-4 bg-gray-100 border border-black rounded-2xl placeholder:p-4"
                    value={noteContent} // ربط حالة noteContent بالمحتوى
                    onChange={handleNoteChange}
                  ></textarea>
                  <BsFillSendFill
                    className=" absolute bottom-2 left-10 "
                    size={25}
                    onClick={handleNoteSubmit}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="flex justify-between p-2 w-full">
            <div className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0  h-10 md:w-1/4  lg:w-1/6">
              <NavLink to="/dashboard/addmember" className="text-white">
                إضافة فرد عائلة جديد
              </NavLink>
            </div>

            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={loading} // تعطيل الزر أثناء الإرسال
            >
              {loading ? (
                <Spin size="small" /> // عرض Spin عند الإرسال
              ) : (
                "إضافة"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
