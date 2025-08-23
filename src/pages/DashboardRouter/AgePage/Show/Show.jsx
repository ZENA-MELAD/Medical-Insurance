import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Back from "components/Back/Back";
import config from "Constants/environment";
import { useEffect, useState } from "react";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import { create } from "@mui/material/styles/createTransitions";
import { createAlert } from "components/Alert/Alert";

const AgePage = () => {
  const [reloadPage, setReloadPage] = useState(0);

  const [year, setYear] = useState("");
  const [GetAllConfigData, setGetAllConfigData] = useState({});
  const [loadingGetAllConfigData, setLoadingGetAllConfigData] = useState(false);
  const [successGetAllConfigData, setSuccessGetAllConfigData] = useState(false);

  const [GetAllHospitals, setGetAllHospitals] = useState([]);
  const [loadingGetAllHospitals, setLoadingGetAllHospitals] = useState(false);
  const [successGetAllHospitals, setSuccessGetAllHospitals] = useState(false);

  const [GetSurgicals, setGetSurgicals] = useState([]);
  const [loadingGetSurgicals, setLoadingGetSurgicals] = useState(false);
  const [successGetSurgicals, setSuccessGetSurgicals] = useState(false);

  /** modal */
  const [mdAgeSegments, setMdAgeSegments] = useState({
    id: 0,
    year: 0,
    fromYear: 0,
    toYear: 0,
    theAmount: 0,
    enduranceRatio: 0,
  });
  const [idAgeSegment, setIdAgeSegment] = useState(0);

  const [mdRelationType, setMdRelationType] = useState({
    id: 0,
    name: "",
    year: 0,
    noteContent: "++",
  });
  const [idRelationType, setIdRelationType] = useState(0);

  const [mdHospital, setMdHospital] = useState({
    id: 0,
    name: "",
    enabled: true,
    inside: true,
    cityId: 0,
    address: "",
    email: "",
    phone: "",
    longitude: 0,
    latitude: 0,
    year: 0,
    noteContent: "",
  });
  const [idHospital, setIdHospital] = useState(0);

  const [idSurgical, setIdSurgical] = useState(0);

  useEffect(() => {
    const getAllDataForYear = async () => {
      setSuccessGetAllConfigData(false);
      setSuccessGetAllHospitals(false);
      setSuccessGetSurgicals(false);
      try {
        setLoadingGetAllConfigData(true);
        const response = await axios.get(
          `${config.baseUrl1}/AnnualData/GetAllConfigData/${year}`
        );
        console.log(response.data);

        setGetAllConfigData(response.data);
        setSuccessGetAllConfigData(true);
        setLoadingGetAllConfigData(false);
      } catch (error) {
        setLoadingGetAllConfigData(false);
        setSuccessGetAllConfigData(false);
        console.error("Error fetching data", "error");
      }

      try {
        setLoadingGetAllHospitals(true);
        const response = await axios.get(
          `${config.baseUrl1}/Hospitals/GetHospitals-With-Year/${year}`
        );
        console.log(response.data);

        setGetAllHospitals(response.data);
        setSuccessGetAllHospitals(true);
        setLoadingGetAllHospitals(false);
      } catch (error) {
        setLoadingGetAllHospitals(false);
        setSuccessGetAllHospitals(false);
        console.error("Error fetching data", "error");
      }

      try {
        setLoadingGetAllHospitals(true);
        const response = await axios.get(
          `${config.baseUrl1}/SurgicalProcedures/GetSurgicals-With-Year/${year}`
        );
        console.log(response.data);

        setGetSurgicals(response.data);
        setSuccessGetSurgicals(true);
        setLoadingGetSurgicals(false);
      } catch (error) {
        setLoadingGetSurgicals(false);
        setSuccessGetSurgicals(false);
        console.error("Error fetching data", "error");
      }
    };

    if (year.length == 4) {
      getAllDataForYear();
    }
  }, [year, reloadPage]);

  return (
    <div className="bg-gray-100 w-full p-3 rounded-md h-full">
      {/* <div className="flex justify-end mb-4">
        <Back />
      </div> */}
      <div className="px-2">
        <div className=" flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <div className="flex flex-col pt-3 mr-2 md:w-1/2 md:ml-2 lg:mb-3">
              <label
                className=" text-sm my-1 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg_"
                style={{ cursor: "pointer" }}
              >
                  العام
              </label>
              <input
                className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2"
                type="text"
                maxLength="4"
                pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
                onChange={(e) => setYear(e.target.value)}
                placeholder="أدخل العام"
                style={{ direction: "ltr" }}
              />
            </div>

            {successGetAllConfigData && (
              <div className="flex flex-col pt-3 mr-2 md:w-1/2 md:ml-2 lg:mb-3">
                <label
                  className=" text-sm my-1 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg_"
                  style={{ cursor: "pointer" }}
                >
                  سعر البطاقة
                </label>
                <input
                  className="shadow appearance-none border text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline w-2/3 rounded-2xl p-2 md:w-11/12 md:ml-1  lg:w-11/12 lg:mt-2"
                  type="text"
                  value={GetAllConfigData?.yearConfigurations[0]?.cardPrice}
                  style={{ direction: "ltr" }}
                />
              </div>
            )}
          </div>

          {successGetAllConfigData && (
            <>
              <div>
                <h5 className="font-medium mb-2">الشرائح العمرية</h5>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        من عام
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        إلى عام
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        رسم التسجيل
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        الادوات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GetAllConfigData.ageSegments.length > 0 &&
                      GetAllConfigData.ageSegments.map((item, index) => (
                        <tr
                          className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 ${
                            item.isCancel && "!text-red-500"
                          }`}
                          key={index}
                        >
                          <th
                            scope=""
                            className="px-4 py-2 font-medium whitespace-nowrap "
                          >
                            {index + 1}
                          </th>
                          <td className="px-4 py-2">{item.fromYear}</td>
                          <td className="px-4 py-2">{item.toYear}</td>
                          <td className="px-4 py-2">{item.theAmount}</td>
                          <td className="px-4 py-2 flex justify-center gap-4">
                            <button
                              className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                              onClick={() => setIdAgeSegment(item.id)}
                            >
                              حذف
                            </button>
                            <button
                              className="btn btn-info !py-1"
                              onClick={() => {
                                setMdAgeSegments(item);
                              }}
                            >
                              تعديل
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {GetAllConfigData.ageSegments.length == 0 && (
                  <h5 className="w-full text-center bg-gray-200 p-2">
                    لا يوجد بيانات
                  </h5>
                )}
              </div>

              <div>
                <h5 className="font-medium mb-2">افراد العائلة</h5>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        الصفة{" "}
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        السنة{" "}
                      </th>
                      <th scope="col" className="px-6 py-3 text-nowrap">
                        الادوات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GetAllConfigData.relationTypes.length > 0 &&
                      GetAllConfigData.relationTypes.map((item, index) => (
                        <tr
                          className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 ${
                            item.isCancel && "!text-red-500"
                          }`}
                          key={index}
                        >
                          <th
                            scope=""
                            className="px-4 py-2 font-medium whitespace-nowrap "
                          >
                            {index + 1}
                          </th>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.year}</td>
                          <td className="px-4 py-2 flex justify-center gap-4">
                            <button
                              className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                              onClick={() => setIdRelationType(item.id)}
                            >
                              حذف
                            </button>
                            <button
                              className="btn btn-info !py-1"
                              onClick={() => setMdRelationType(item)}
                            >
                              تعديل
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {GetAllConfigData.relationTypes.length == 0 && (
                  <h5 className="w-full text-center bg-gray-200 p-2">
                    لا يوجد بيانات
                  </h5>
                )}
              </div>
            </>
          )}

          {successGetAllHospitals && (
            <div>
              <h5 className="font-medium mb-2">المشافي</h5>
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      اسم المشفى
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الموقع
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الهاتف
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الادوات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GetAllHospitals.length > 0 &&
                    GetAllHospitals.map((item, index) => (
                      <tr
                        className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 ${
                          item.isCancel && "!text-red-500"
                        }`}
                        key={index}
                      >
                        <th
                          scope=""
                          className="px-4 py-2 font-medium whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <td className="px-4 py-2">{item.hospitalName}</td>
                        <td className="px-4 py-2">{item.adress}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2 flex justify-center gap-4">
                          <button
                            className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                            onClick={() => setIdHospital(item.hospitalId)}
                          >
                            حذف
                          </button>
                          <button
                            className="btn btn-info !py-1"
                            onClick={() => setMdHospital(item)}
                          >
                            تعديل
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {GetAllHospitals.length == 0 && (
                <h5 className="w-full text-center bg-gray-200 p-2">
                  لا يوجد بيانات
                </h5>
              )}
            </div>
          )}

          {successGetSurgicals && (
            <div>
              <h5 className="font-medium mb-2">نسب التحمل</h5>
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الإجراء الطبي
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      القيمة
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      داخل الشبكة
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      خارج الشبكة
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      السقف العام
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الملاحظات
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الادوات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GetSurgicals.length > 0 &&
                    GetSurgicals.map((item, index) => (
                      <tr
                        className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 ${
                          item.isCancel && "!text-red-500"
                        }`}
                        key={index}
                      >
                        <th
                          scope=""
                          className="px-4 py-2 font-medium whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <td className="px-4 py-2">{item.surgicalName}</td>
                        <td className="px-4 py-2">{item.price}</td>
                        <td className="px-4 py-2">{item.in}</td>
                        <td className="px-4 py-2">{item.out}</td>
                        <td className="px-4 py-2">{item.ceiling}</td>
                        <td className="px-4 py-2">
                          {item?.notes[0]?.content || "----"}
                        </td>

                        <td className="px-4 py-2 flex justify-center gap-4">
                          <button
                            className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                            onClick={() => {
                              setIdSurgical(item.surgicalId);
                            }}
                          >
                            حذف
                          </button>
                          <button className="btn btn-info !py-1">تعديل</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {loadingGetAllConfigData && <Spinner page />}
        </div>
      </div>
      <EditAgeSegment dataGeter={mdAgeSegments} reloadPage={setReloadPage} />
      <DeleteAgeSegment id={idAgeSegment} reloadPage={setReloadPage} />

      <EditRelationTypes
        dataGeter={mdRelationType}
        reloadPage={setReloadPage}
      />
      <DeleteRelationTypes id={idRelationType} reloadPage={setReloadPage} />

      <EditHospitals dataGeter={mdHospital} reloadPage={setReloadPage} />
      <DeleteHospitals id={idHospital} reloadPage={setReloadPage} />

      <DeleteSurgical id={idSurgical} reloadPage={setReloadPage} />
    </div>
  );
};

export function EditAgeSegment({ dataGeter, reloadPage }) {
  const [isOpen, setIsOpen] = useState(dataGeter.id != 0 ? true : false);
  const [mdAgeSegments, setMdAgeSegments] = useState(dataGeter);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (dataGeter?.id != 0) {
      setIsOpen(true);
      setMdAgeSegments(dataGeter);
    }
  }, [dataGeter]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.put(
        `${config.baseUrl1}/AnnualData/UpdateAgeSegments`,
        mdAgeSegments
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم التحديث بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء التحديث:", error);
    }
  };

  return (
    <ActionModal title={"تعديل شريحة عمرية"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            من عام
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            maxLength="4"
            value={mdAgeSegments.fromYear}
            pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
            onChange={(e) =>
              setMdAgeSegments({ ...mdAgeSegments, fromYear: e.target.value })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            الى عام
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            maxLength="4"
            value={mdAgeSegments.toYear}
            pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
            onChange={(e) =>
              setMdAgeSegments({ ...mdAgeSegments, toYear: e.target.value })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            المبلغ
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdAgeSegments.theAmount}
            onChange={(e) =>
              setMdAgeSegments({
                ...mdAgeSegments,
                theAmount: e.target.value,
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            تعديل
          </button>
        )}
      </div>
    </ActionModal>
  );
}
export function DeleteAgeSegment({ id, reloadPage }) {
  const [isOpen, setIsOpen] = useState(id != 0 ? true : false);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (id != 0) {
      setIsOpen(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.delete(
        `${config.baseUrl1}/AnnualData/DeleteAgeSegment/${id}`
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف شريحة عمرية بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف شريحة عمرية"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف شريحة عمرية ؟
        </h1>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            حذف
          </button>
        )}
      </div>
    </ActionModal>
  );
}

export function EditRelationTypes({ dataGeter, reloadPage }) {
  const [isOpen, setIsOpen] = useState(dataGeter.id != 0 ? true : false);
  const [mdRelationTypes, setRelationTypes] = useState(dataGeter);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (dataGeter?.id != 0) {
      setIsOpen(true);
      setRelationTypes(dataGeter);
    }
  }, [dataGeter]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.put(
        `${config.baseUrl1}/AnnualData/update-relation-type`,
        mdRelationTypes
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم تعديل صلة قرابة بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء التحديث:", error);
    }
  };

  return (
    <ActionModal title={"تعديل صلة قرابة"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            الصفة
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdRelationTypes.name}
            onChange={(e) =>
              setRelationTypes({
                ...mdRelationTypes,
                name: e.target.value,
                noteContent: "",
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            تعديل
          </button>
        )}
      </div>
    </ActionModal>
  );
}
export function DeleteRelationTypes({ id, reloadPage }) {
  const [isOpen, setIsOpen] = useState(id != 0 ? true : false);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (id != 0) {
      setIsOpen(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.delete(
        `${config.baseUrl1}/AnnualData/DeleteRelationType/${id}`
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف صلة قرابة بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف صلة قرابة"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف صلة قرابة ؟
        </h1>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            حذف
          </button>
        )}
      </div>
    </ActionModal>
  );
}

export function EditHospitals({ dataGeter, reloadPage }) {
  const [isOpen, setIsOpen] = useState(dataGeter.id != 0 ? true : false);
  const [mdHospitals, setHospitals] = useState(dataGeter);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    console.log(dataGeter);

    if (dataGeter.hospitalId && dataGeter?.hospitalId != 0) {
      setIsOpen(true);
      setHospitals({ ...dataGeter, id: dataGeter.hospitalId });
    }
  }, [dataGeter]);

  const handleSubmit = async () => {
    const temp = {
      address: mdHospitals.adress,
      cityId: 1,
      email: "",
      enabled: false,
      inside: true,
      name: mdHospitals.hospitalName,
      phone: mdHospitals.phone,
    };
    try {
      setOnSend(true);
      const response = await axios.put(
        `${config.baseUrl1}/Hospitals/${mdHospitals.hospitalId}`,
        temp
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم التحديث بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء التحديث:", error);
    }
  };

  return (
    <ActionModal title={"تعديل شريحة عمرية"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            اسم المشفى
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdHospitals.hospitalName}
            onChange={(e) =>
              setHospitals({
                ...mdHospitals,
                hospitalName: e.target.value,
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            الموقع
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdHospitals.adress}
            onChange={(e) =>
              setHospitals({
                ...mdHospitals,
                adress: e.target.value,
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>
        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            الهاتف
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdHospitals.phone}
            onChange={(e) =>
              setHospitals({
                ...mdHospitals,
                phone: e.target.value,
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            تعديل
          </button>
        )}
      </div>
    </ActionModal>
  );
}
export function DeleteHospitals({ id, reloadPage }) {
  const [isOpen, setIsOpen] = useState(id != 0 ? true : false);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (id != 0) {
      setIsOpen(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.delete(`${config.baseUrl1}/Hospitals/${id}`);
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف مشفى بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف مشفى"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف مشفى ؟
        </h1>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            حذف
          </button>
        )}
      </div>
    </ActionModal>
  );
}

export function DeleteSurgical({ id, reloadPage }) {
  const [isOpen, setIsOpen] = useState(id != 0 ? true : false);
  const [onSend, setOnSend] = useState(false);

  useEffect(() => {
    if (id != 0) {
      setIsOpen(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.delete(
        `${config.baseUrl1}/SurgicalProcedures/${id}`
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف نسبة تحمل بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف نسبة تحمل"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف نسبة تحمل ؟
        </h1>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            حذف
          </button>
        )}
      </div>
    </ActionModal>
  );
}

export default AgePage;
