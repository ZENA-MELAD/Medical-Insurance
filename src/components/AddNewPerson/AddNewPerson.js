import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiPlusCircle } from "react-icons/pi";
import SaveImage from "../../Assets/Images/rafiki1.png";
import statusR from "../../Assets/Data/statusrelativee";
import relative from "../../Assets/Data/relative";
import usePost from "../../Custom Hooks/usePost";
import config from "../../Constants/environment";
import useGet from "../../Custom Hooks/useGet";
// import { createAlert } from "../../components/Alert/Alert.jsx";
const AddNewPerson = () => {
  const [status, setStatus] = useState("");
  const [family, setFamily] = useState("");
  const [statusRe, setStatusRe] = useState();
  const [relativee, setRelativee] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [email, setEmail] = useState();
  const [ensuranceNumber, setEnsuranceNumber] = useState();
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState();
  const [phone, setPhone] = useState();
  const [dataw, loadingW] = useGet(config.persons);
  const [data4, loading555] = useGet(config.engineers);
  const [dataId, setDataId] = useState();
  const [dataId2, setDataId21] = useState();
  const [nationalId, setNationalId] = useState();
  useEffect(() => {
    if (data4 && data4.length > 0) {
      const dt = data4 && data4[data4 && data4.length - 1].id;
      console.log("آخر عنصر في المصفوفة هو: ", dt);
      setDataId(dt);
      setDataId21(dataId + 1);
    }
  }, [data4 && data4.length]);
  const [loading, postFunc] = usePost(config.persons, {
    firstName: firstName,
    fatherName: fatherName,
    lastName: lastName,
    motherName: motherName,
    ensuranceNumber: ensuranceNumber,
    address: address,
    phone: phone,
    mobile: mobile,
    email: email,
    engineereId: dataId,
    personId: dataId2,
    relationTypeId: relativee,
    nationalId: nationalId,
    // statusid: statusRe,
  });
  const handleChangeRelative = (id2) => {
    setRelativee(id2);
    console.log(relativee);
  };
  const handleChangeStatusR = (id3) => {
    setStatusRe(id3);
    console.log(statusRe);
  };
  const handleChange5 = (event) => {
    setStatus(event.target.value);
  };
  const handleChange4 = (event) => {
    setFamily(event.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);

  const inputRef9b = useRef(null);

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
  const handleLabelClick9b = () => {
    if (inputRef9b.current) {
      inputRef9b.current.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postFunc();
    setFirstName("");
    setLastName("");
    setFatherName("");
    setMotherName("");
    setAddress("");
    setEmail("");
    setEnsuranceNumber("");
    setMobile("");
    setPhone("");
    setRelativee(0);

    // setStatusRe(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex  flex-col">
          <div className="flex">
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel label id="demo-simple-select-label">
                درجة القرابة
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={family}
                label="درجة القرابة "
                onChange={handleChange4}
                style={{
                  background: "white",
                  borderRadius: "40px",
                }}
              >
                {relative &&
                  relative.map((item2, index2) => (
                    <MenuItem
                      value={item2}
                      key={index2}
                      onClick={() => handleChangeRelative(index2 + 1)}
                    >
                      {item2}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
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
                }}
              >
                {statusR &&
                  statusR.map((item3, index3) => (
                    <MenuItem
                      value={item3}
                      key={index3}
                      onClick={() => handleChangeStatusR(index3 + 1)}
                    >
                      {item3}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          {/* {status == 2 ? createAlert() : <></>} */}
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/3 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                onClick={handleLabelClick}
                style={{ cursor: "pointer" }}
              >
                الاسم
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6"
                onClick={handleLabelClick1}
                style={{ cursor: "pointer" }}
              >
                الكنية
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef1}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick2}
                style={{ cursor: "pointer" }}
              >
                اسم الأب
              </label>
              <input
                type="text"
                className="rounded-2xl ml-10 p-2 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef2}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full  mb-2 justify-center items-center p-3 md:flex md:flex-row  ">
            <div className="flex pt-3 md:w-1/3 md:ml-2">
              <label
                className="w-2/6 md:w-2/6 md:text-sm md:ml-4"
                onClick={handleLabelClick3}
                style={{ cursor: "pointer" }}
              >
                اسم الأم
              </label>
              <input
                type="text"
                className="rounded-2xl ml-10 p-2  w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef3}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>
            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick4}
                style={{ cursor: "pointer" }}
              >
                العنوان
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef4}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick5}
                style={{ cursor: "pointer" }}
              >
                الرقم التأمين
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef5}
                onChange={(e) => setEnsuranceNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex pt-3 md:w-1/3 md:ml-2 ">
            <label
              className="w-2/6 md:w-2/6 md:text-sm"
              onClick={handleLabelClick9b}
              style={{ cursor: "pointer" }}
            >
              الرقم الوطني
            </label>
            <input
              type="text"
              className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
              ref={inputRef9b}
              onChange={(e) => setNationalId(e.target.value)}
              required
            />
          </div>
          <div className="w-full  mb-2   items-center p-3 md:flex md:flex-row ">
            <div className="flex pt-3 md:w-1/3 md:ml-3">
              <label
                className="w-2/6 md:w-2/5  md:text-sm md:mt-1 "
                onClick={handleLabelClick6}
                style={{ cursor: "pointer" }}
              >
                الإيميل
              </label>
              <input
                type="email"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef6}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6 text-sm"
                onClick={handleLabelClick7}
                style={{ cursor: "pointer" }}
              >
                الهاتف
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-10 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef7}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex pt-3 md:w-1/3 md:ml-2 ">
              <label
                className="w-2/6 md:w-2/6 md:text-sm"
                onClick={handleLabelClick8}
                style={{ cursor: "pointer" }}
              >
                الموبايل
              </label>
              <input
                type="text"
                className="rounded-2xl ml-10 p-2 w-4/6 md:w-1/2 md:ml-1"
                ref={inputRef8}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="flex  justify-end p-2 w-full">
            <div className="flex justify-center items-center bg-blue-900 shadow-md rounded-full w-1/3 py-0  mt-2  h-10 md:w-1/4  lg:w-1/6">
              <PiPlusCircle
                color="white"
                className="w-5 h-5"
                onClick={handleClickOpen}
              />
              <React.Fragment>
                <input
                  type="submit"
                  value="إضافة"
                  onClick={handleClickOpen}
                  style={{ color: "white" }}
                />

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <div className="flex  flex-col">
                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          <IoCloseOutline />
                        </IconButton>
                        <div className="w-full flex justify-center items-center">
                          <img src={SaveImage} alt="" className="w-1/2" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <p className="  font-extrabold text-2xl ">
                            تمت الإضافة بنجاح
                          </p>
                          <p className="  font-extrabold text-2xl ">
                            هل تريد إضافة فرد آخر من العائلة؟
                          </p>
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div className="w-full flex justify-center items-center ">
                      <div className="bg-blue-900 flex justify-center items-center rounded-xl ml-4">
                        <Button
                          onClick={handleClose}
                          autoFocus
                          style={{ color: "white" }}
                        >
                          نعم
                        </Button>
                      </div>
                      <div className="border border-blue-900 rounded-xl">
                        <Button
                          onClick={handleClose}
                          style={{ color: "black" }}
                        >
                          لا
                        </Button>
                      </div>
                    </div>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewPerson;
