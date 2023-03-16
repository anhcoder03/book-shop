import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";

const HeaderUserManageStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .dashboard-heading {
    font-weight: 600;
    font-size: 28px;
  }
`;

const UserManage = () => {
  const [listUser, setListUser] = useState([]);
  const handleGetUsers = async () => {
    try {
      const data = await axiosClient.request({
        method: "get",
        url: "/getUsers",
      });

      setListUser(data);
    } catch (error) {
      toast.error("Sever error");
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  const handleDeleteUser = (id) => {
    try {
      axiosClient.request({
        method: "delete",
        url: `/deleteUser/${id}`,
      });
      handleGetUsers();
      toast.success("Xoá thành công!");
    } catch (err) {
      toast.error("Đã xẩy ra lỗi");
    }
  };
  return (
    <div>
      <HeaderUserManageStyles>
        <h1 className="dashboard-heading">Manage User</h1>
        <div className="mb-10 flex justify-end">
          <div className="w-full max-w-[300px]">
            <input
              type="text"
              className="w-full p-4 rounded-lg border border-solid border-gray-300"
              placeholder="Search user..."
            />
          </div>
        </div>
      </HeaderUserManageStyles>
      <Table>
        <thead>
          <tr>
            <th></th>
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
          {listUser.length > 0 &&
            listUser.map((item) => (
              <tr key={item._id}>
                <td></td>
                <td>01</td>
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
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <NavLink
                      to={`/manage/update_user/${item._id}`}
                      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </NavLink>
                    <span
                      onClick={() => handleDeleteUser(item._id)}
                      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </span>
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
