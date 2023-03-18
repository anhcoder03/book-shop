import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../hooks/useClickOutSide";

const DropdownCategory = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel = "Phân loại danh mục",
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "category",
    defaultValue: "",
  });
  console.log("dropdownValue", dropdownValue);
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);
  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="relative w-full" ref={nodeRef}>
      <div
        className="flex items-center justify-between p-5 bg-white border rounded-lg cursor-pointer border-gray100"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full z-10 rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            className="p-5 cursor-pointer hover:bg-gray-100"
            onClick={handleClickDropdownItem}
            data-value={item.slug}
            key={item._id}
          >
            {item.categoryName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownCategory;
