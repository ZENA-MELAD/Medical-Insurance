
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sitemap from "./../../config/siteMap.json";
import { Button, Input, Form } from "antd";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";

export default function BreadcrumbContext() {
  const { t } = useTranslation();
  const location = useLocation();
  const [locationLine, setLocationLine] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLocationLine(findMatchingObjects(location.pathname));
  }, [location]);

  const handleSearch = async () => {
    if (!search) {
      createAlert("Error", "الرجاء إدخال قيمة للبحث");
      return;
    }

    try {
      let res;
      if (/^\d+$/.test(search)) {
        if (search.length === 11) {
          res = await axios.get(
            `${config.baseUrl1}/${config.searchByNational}`,
            {
              params: {
                nationalId: search,
              },
            }
          );
        } else {
          res = await axios.get(
            `${config.baseUrl1}/${config.searchByEng}/${search}`
          );
        }
      } else if (/^[0-9-]+$/.test(search)) {
        res = await axios.get(
          `${config.baseUrl1}/${config.searchByEncur}/${search}`
        );
      } else {
        res = await axios.get(
          `${config.baseUrl1}/${config.searchByName}/${search}`
        );
      }

      if (res.status === 200) {
        setData(res.data);
        sessionStorage.setItem("engId", JSON.stringify(res.data));
        navigate("/dashboard/renewal");
        createAlert("Success", "تم العثور على المشترك");
      }
      console.log(res.data);
    } catch (error) {
      navigate("/dashboard/adduser");
      createAlert("Error", "المشترك غير موجود");
      console.error("Error occurred during search:", error);
    }

    setSearch("");
  };

  return (
    <div className="md:mb-2 flex justify-between items-center gap-2">
      <div className="flex gap-2">
        {locationLine.length > 0
          ? locationLine.map((item, index) => (
              <div className="flex items-center" key={index}>
                <div>
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                    {document.documentElement.lang === "ar" ? (
                      <RiArrowDropLeftFill />
                    ) : (
                      <RiArrowDropRightFill />
                    )}
                  </span>
                </div>
                <div>
                  <Link
                    to={item.url}
                    className="text-md font-bold text-gray-500 hover:text-slate-600 dark:text-gray-400 hover:dark:text-blue-600 duration-700"
                  >
                    {t(item.title)}
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item>
          <Input
            placeholder="بحث حسب الرقم الهندسي/التأميني/الوطني/الاسم"
            allowClear
            style={{
              width: 300,
              boxShadow: "initial",
              borderColor: "gray",
              fontSize: "12px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button className="bg-slate-600 text-white" htmlType="submit">
            بحث
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


function removeParts(textUrl) {
  const resultArray = [];
  resultArray.push(textUrl);
  let remainingText = textUrl;
  while (remainingText.includes("/")) {
    const index = remainingText.lastIndexOf("/");
    remainingText = remainingText.substring(0, index);
    resultArray.push(remainingText);
  }
  return resultArray.reverse();
}

function findMatchingObjects(mainLocation) {
  let afterRemoveParts = removeParts(mainLocation);
  const resultArray = [];
  for (let part of afterRemoveParts) {
    sitemap.forEach((obj) => {
      if (obj.url === part) {
        resultArray.push(obj);
      }
    });
  }
  return resultArray;
}