import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/configAxios";

const GetData = (Component, url) => {
  return (props) => {
    const [listData, setListData] = useState([]);
    useEffect(() => {
      try {
        async function fetchingData() {
          const data = await axiosClient.request({
            method: "get",
            url: url,
          });
          setListData(data);
        }
        fetchingData();
      } catch (err) {
        console.log(err);
      }
    }, []);
    if (!listData || listData.length === 0) return <div>Loading...</div>;
    return <Component data={listData} {...props}></Component>;
  };
};

export default GetData;
