import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";
import DashboardHeading from "../../drafts/DashboardHeading";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit } from "../../drafts/action";
import { Button } from "../../components/button";

const CategoryManage = () => {
  const [listCategory, setListCategory] = useState([]);
  const navigate = useNavigate();
  const getCategories = async () => {
    try {
      const data = await axiosClient.request({
        method: "get",
        url: "/get_category_all",
      });

      setListCategory(data.data);
    } catch (error) {
      toast.error("Sever error");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Bạn muốn xoá danh mục này?",
      text: "Thao tác này sẽ khiến danh mục bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.request({
            method: "delete",
            url: `/delete_category/${id}`,
          });
          getCategories();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Quản lý danh mục">
        <Button
          height={"50px"}
          onClick={() => navigate("/manage/create_category")}
        >
          <i className="fa-solid fa-plus"></i> Thêm danh mục
        </Button>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCategory.length > 0 &&
            listCategory.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.categoryName}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update_category/${item._id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(item._id)}
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

export default CategoryManage;
