import axios from "axios";
import { useEffect, useState } from "react";
import config from "../Constants/environment";

const useGet = (endPoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${config.baseUrl1}/${endPoint}`
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  }, []);
  return [data, loading];
};

export default useGet;
