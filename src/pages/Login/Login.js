import React, { useEffect, useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { GoKey } from "react-icons/go";
import LoginImage from "../../Assets/Images/rafiki.png";
import config from "../../Constants/environment";
import usePost from "../../Custom Hooks/usePost";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [userName, setUserName] = useState();
  const [password1, setPassword1] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  // const [loading, postFunc] = usePost(
  //   config.login,
  //   {
  //     password: password1,
  //     username: userName,
  //   },
  //   {
  //     isSignIn: true,
  //   }
  // );
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPassword1(value);
    const passwordPattern =
      /^(?=.*[A-Za-z\u0600-\u06FF])(?=.*\d)[A-Za-z\u0600-\u06FF\d]{8,}$/;

    if (!passwordPattern.test(value)) {
      setPasswordError(
        "يجب أن تحتوي كلمة المرور على محارف وأرقام وألا تقل عن ثمانية أحرف"
      );
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      // postFunc();
      axios.post("https://wc-echo.wiremockapi.cloud/webhook/echo", {
     username: userName,
  password: password1
      },
       )
      .then((res) => {
        console.log(res);

        setLoading(true);
       
      })
      .catch((err) => {
        console.log(err);
         setLoading(false);
     
      });
      setUserName("");
      setPassword1("");
      navigate("/dashboard");
    }
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className=" h-screen bg-zinc-50 flex  items-center md:bg-white  ">
      <div className=" w-20 h-screen bg-blue-900 md:w-64 lg:w-72"></div>

      <div className="shadow-xl w-11/12 flex  flex-col-reverse bg-zinc-50 h-screen absolute left-5 md:left-20  md:w-10/12 md:h-96 md:flex md:flex-row lg:w-9/12  lg:left-44 ">
        <div className=" h-30  w-full flex justify-center  items-center bg-zinc-50 flex-col md:p-3">
          <p className=" text-sm  bg-gray-200 py-3 px-6 w-30 h-10 rounded-2xl flex justify-center items-center md:px-11 md:text-2xl md:py-4 lg:py-6">
            تسجيل الدخول
          </p>
          <div className="flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit}>
              <div className="relative flex justify-center items-center w-60 md:w-80 lg:w-96">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="my-9 pr-10  rounded-2xl p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-500 placeholder:text-sm placeholder:text-black placeholder:text-right placeholder:mr-2  md:placeholder:text-xl md:py-3"
                  style={{ direction: "rtl" }}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  ref={inputRef}
                />

                <LuUser2 className="absolute right-2   h-5 w-5" />
              </div>
              <div className="relative flex justify-center items-center w-60 md:w-80 lg:w-96">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={handlePasswordChange}
                  className="rounded-2xl pr-10  p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  border-gray-500 placeholder:text-black placeholder:text-sm placeholder:text-right placeholder:ml-7 md:placeholder:text-xl md:py-3"
                  style={{ direction: "rtl" }}
                  required
                />
                <GoKey
                  style={{ transform: "scaleX(-1)" }}
                  className="absolute right-3 h-5 w-5"
                />
              </div>
              {passwordError && (
                <div className="text-red-500 text-xs md:text-sm mt-2">
                  {passwordError}
                </div>
              )}
              <div className="w-60 md:w-80 lg:w-96">
                <input
                  type="submit"
                  value="التالي"
                  className="bg-blue-700  my-10 p-2 rounded-2xl text-white w-full md:text-xl"
                  to="/dashboard/selfinfo"
                />
              </div>
            </form>
          </div>
        </div>
        <div className=" h-40 w-full flex justify-center items-center md:h-full">
          <img
            src={LoginImage}
            alt=""
            className=" w-full  h-40  p-3 md:h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
