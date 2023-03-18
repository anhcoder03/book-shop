import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";
import DashboardHeading from "../../drafts/DashboardHeading";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit } from "../../drafts/action";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserAll } from "../../redux/apiRequest";

const UserManage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.users.users?.allUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      getUserAll(user?.accessToken, dispatch);
    }
  }, []);
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Bạn muốn xoá người dùng này?",
      text: "Thao tác này sẽ khiến người dùng bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user?.accessToken, dispatch, id);
        getUserAll(user?.accessToken, dispatch);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Quản lý người dùng">
        <div className="mb-10 flex justify-end">
          <div className="w-full max-w-[300px]">
            <input
              type="text"
              className="w-full p-4 rounded-lg border border-solid border-gray-300"
              placeholder="Search user..."
            />
          </div>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Fullname</th>
            <th>Username</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.length > 0 &&
            listUser?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.fullname}</td>
                <td>
                  <span className="text-gray-500">{item.username}</span>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.avatar}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                  </div>
                </td>
                <td>{item.admin ? "Admin" : "User"}</td>
                <td>{item.status}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update_user/${item._id}`)
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

export default UserManage;
