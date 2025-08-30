import "./AdminPage.css";

import { useState, useEffect } from "react";
import AdminTable from "../../Components/AdminTable";
import { notification } from "antd";
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
import type { GetProp, TableProps } from "antd";
import AdminFilters from "../../Components/AdminFilters";
import useDebounce from "../../hooks/useDebounce";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

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
  const [api, contextHolder] = notification.useNotification();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

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

  useEffect(() => {
    fetchUsersData();
  }, [paginationParams?.current, paginationParams?.pageSize, sorterParams]);

  useEffect(() => {
    if (debouncedSearch) {
      setSorterParams((prevSorterParams) => ({
        ...prevSorterParams,
        search: searchValue,
      }));
    }
  }, [debouncedSearch]);

  const openErrorNotification = (message: string) => {
    api["error"]({
      message: message,
    });
  };

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

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchValue(event.target.value);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsersData();
    } catch {
      openErrorNotification("Не удалось удалить пользователя.");
    }
  };

  const handleBlockUser = async (id: string) => {
    try {
      await blockUser(id);
      fetchUsersData();
    } catch (error) {
      openErrorNotification("Не удалось заблокировать пользователя");
    }
  };

  const handleUnBlockUser = async (id: string) => {
    try {
      await unBlockUser(id);
      fetchUsersData();
    } catch (error) {
      openErrorNotification("Не удалось разблокировать пользователя");
    }
  };

  const handleUpdateRole = async (id: string, newRoles: UserRolesRequest) => {
    try {
      await updateRolesUser(id, newRoles);
      fetchUsersData();
    } catch (error) {
      openErrorNotification("Не удалось обновить роли пользователя");
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
      {contextHolder}
      <div className="admin-panel">
        <>
          <AdminFilters onChange={onSearch} onFinishFilter={onFinishFilter} />
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
