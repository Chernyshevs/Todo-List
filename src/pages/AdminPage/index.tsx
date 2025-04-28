import "./AdminPage.css";

import { useState, useEffect } from "react";
import AdminTable from "../../Components/AdminTable";
import { Input } from "antd";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  unBlockUser,
  updateRolesUser,
} from "../../api/admin";

import { PAGINATION_USER_LIMIT } from "../../constants/admin";

import type {
  User,
  UserFilters,
  UserRolesRequest,
} from "../../types/adminTypes";
import type { GetProp, TableProps, GetProps } from "antd";
import AdminFilters from "../../Components/AdminFilters";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

type SearchProps = GetProps<typeof Input.Search>;

const AdminPage: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorterParams, setSorterParams] = useState<UserFilters>({
    search: "",
    sortBy: "id",
    sortOrder: "asc",
    limit: 20,
    offset: 0,
  });
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationConfig>({
      current: 1,
      pageSize: 20,
      showSizeChanger: false,
    });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setIsLoading(true);

        const users = await getAllUsers(sorterParams);
        setUsersData(users.data);

        const totalAmount = users.meta.totalAmount;
        setPaginationParams((prevPagination) => {
          return {
            ...prevPagination,
            total: totalAmount,
          };
        });

        if (totalAmount < PAGINATION_USER_LIMIT) {
          setPaginationParams((prevPagination) => {
            return {
              ...prevPagination,
              position: ["none", "none"],
            };
          });
        } else if (paginationParams) {
          setPaginationParams((prevPagination) => {
            return {
              ...prevPagination,
              position: undefined,
            };
          });
        }
      } catch (error) {
        alert("Ошибка при получении пользователей");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, [paginationParams?.current, paginationParams?.pageSize, sorterParams]);

  const onFinishFilter = (values: any) => {
    setSorterParams((prevSorterParams) => ({
      ...prevSorterParams,
      offset: 0,
      isBlocked: values.filter === "all" ? undefined : values.filter,
    }));
    setPaginationParams((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
  };

  const onSearch: SearchProps["onSearch"] = (value) =>
    setSorterParams((prevSorterParams) => ({
      ...prevSorterParams,
      search: value,
    }));

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsersData((prevData) => prevData.filter((item) => item.id !== +id));
    } catch {
      alert("Не удалось удалить пользователя.");
    }
  };

  const handleBlockUser = async (id: string) => {
    try {
      await blockUser(id);
      setUsersData((prevData) =>
        prevData.map((user) => {
          if (user.id === +id) {
            user.isBlocked = true;
          }
          return user;
        })
      );
    } catch (error) {
      alert("Не удалось заблокировать пользователя");
    }
  };

  const handleUnBlockUser = async (id: string) => {
    try {
      await unBlockUser(id);
      setUsersData((prevData) =>
        prevData.map((user) => {
          if (user.id === +id) {
            user.isBlocked = false;
          }
          return user;
        })
      );
    } catch (error) {
      alert("Не удалось разблокировать пользователя");
    }
  };

  const handleUpdateRole = async (id: string, newRoles: UserRolesRequest) => {
    try {
      await updateRolesUser(id, newRoles);
      setUsersData((prevData) =>
        prevData.map((user) => {
          if (user.id === +id) {
            user.roles = newRoles.roles;
          }
          return user;
        })
      );
    } catch (error) {
      alert("Не удалось обновить роли пользователя");
    }
  };

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    setPaginationParams(pagination);

    setSorterParams((prevSorterParams) => {
      const newOffset =
        typeof pagination.current === "number"
          ? pagination.current - 1
          : undefined;
      const newSortBy = Array.isArray(sorter)
        ? undefined
        : typeof sorter.field === "string"
        ? sorter.field
        : undefined;

      const newSortOrder = Array.isArray(sorter)
        ? undefined
        : sorter.order === "ascend"
        ? "asc"
        : sorter.order === "descend"
        ? "desc"
        : undefined;

      return {
        ...prevSorterParams,
        sortBy: newSortBy,
        sortOrder: newSortOrder,
        offset: newOffset,
      };
    });

    if (pagination.pageSize !== paginationParams?.pageSize) {
      setUsersData([]);
    }
  };

  return (
    <>
      <div className="admin-panel">
        <>
          <AdminFilters onSearch={onSearch} onFinishFilter={onFinishFilter} />
          <AdminTable
            sorterParams={sorterParams}
            usersData={usersData}
            paginationParams={paginationParams}
            isLoading={isLoading}
            onChange={handleTableChange}
            onDelete={handleDeleteUser}
            onBlockUser={handleBlockUser}
            onUnBlockUser={handleUnBlockUser}
            onUpdateRoles={handleUpdateRole}
          />
        </>
      </div>
    </>
  );
};

export default AdminPage;
