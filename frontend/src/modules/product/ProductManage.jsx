import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";
import DashboardHeading from "../../drafts/DashboardHeading";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit } from "../../drafts/action";
import { Button } from "../../components/button";
import GetData from "../../components/common/GetData";

const ProductManage = ({ data }) => {
  const [listProduct, setListProduct] = useState(data.products); // Define state variable
  const navigate = useNavigate();

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Bạn muốn sản phẩm này?",
      text: "Thao tác này sẽ khiến sản phẩm bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosClient.request({
            method: "delete",
            url: `/delete_product/${id}`,
          });
          const updatedList = listProduct.filter((item) => item._id !== id); // Filter out deleted product from list
          setListProduct(updatedList); // Update state
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          toast.error("Đã xẩy ra lỗi");
        }
      }
    });
  };

  return (
    <div>
      <DashboardHeading title="Quản lý sản phẩm">
        <Button
          height={"50px"}
          onClick={() => navigate("/manage/create_product")}
        >
          <i className="fa-solid fa-plus"></i> Thêm sản phẩm
        </Button>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.length > 0 &&
            listProduct.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image || item.tile} alt="" />
                </td>
                <td className="truncate max-w-[200px]">{item.title}</td>
                <td className="max-w-[200px]">
                  <span className="text-gray-500 truncate">{item.author}</span>
                </td>
                <td className="max-w-[250px]">
                  <div className="flex items-center gap-x-3">
                    <p className="text-gray-500 truncate">{item.desc}</p>
                  </div>
                </td>
                <td>{item.year}</td>
                <td>{item.price}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update_product/${item._id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteProduct(item._id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetData(ProductManage, "/getProductAll");
