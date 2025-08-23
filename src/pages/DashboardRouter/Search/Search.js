import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchComponent = ({ onSearch }) => {
  return (
    <div className="search-container" style={{ display: "flex", gap: "10px" }}>
      <Input
        placeholder="بحث حسب الرقم المركزي"
        allowClear
        style={{ width: 200 }}
        onPressEnter={onSearch}
        prefix={<SearchOutlined />}
      />
      <Input
        placeholder="بحث حسب الرقم الفرعي"
        allowClear
        style={{ width: 200 }}
        onPressEnter={onSearch}
        prefix={<SearchOutlined />}
      />
      <Input
        placeholder="بحث حسب الرقم التأميني"
        allowClear
        style={{ width: 200 }}
        onPressEnter={onSearch}
        prefix={<SearchOutlined />}
      />
      <Input
        placeholder="بحث حسب الاسم"
        allowClear
        style={{ width: 200 }}
        onPressEnter={onSearch}
        prefix={<SearchOutlined />}
      />
      <Button
        type="primary"
        onClick={onSearch}
      >
        بحث
      </Button>
    </div>
  );
};

export default SearchComponent;
