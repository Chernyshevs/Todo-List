import "./AdminPage.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  Tag,
  Input,
  Form,
  Select,
  Button,
  Space,
  Popconfirm,
} from "antd";
import { getAllUsers } from "../../api/admin";

import { PAGINATION_USER_LIMIT } from "../../constants/admin";
import { QuestionCircleOutlined } from "@ant-design/icons";

import type { User, Roles, UserFilters } from "../../types/adminTypes";
import type { TableColumnsType, GetProp, TableProps, GetProps } from "antd";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const { Option } = Select;

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

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
  const [form] = Form.useForm();

  const columns: TableColumnsType<User> = [
    {
      title: "Имя пользователя",
      sorter: true,
      sortOrder:
        sorterParams.sortBy === "username"
          ? sorterParams.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
      dataIndex: "username",
    },
    {
      title: "Эл. Почта",
      sorter: true,
      sortOrder:
        sorterParams.sortBy === "email"
          ? sorterParams.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
      dataIndex: "email",
      render: (emailText) => <a href={`mailto:${emailText}`}>{emailText}</a>,
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      render: (date) => <>{date.substring(0, 10)}</>,
    },
    {
      title: "Статус блокировки (Да/Нет)",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (status) => <>{status ? "Да" : "Нет"}</>,
    },
    {
      title: "Роли",
      dataIndex: "roles",
      render: (_, { roles }) => (
        <>
          {roles &&
            roles.map((role: Roles) => {
              let color = role.length > 5 ? "geekblue" : "green";
              if (role === "ADMIN") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={role}>
                  {role.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    { title: "Номер телефона", dataIndex: "phoneNumber" },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Link to={`${record.id}`}>Перейти к профилю</Link>
          </Space>
        </>
      ),
    },
  ];

  const onFinishFilter = (values: any) => {
    setSorterParams((prevSorterParams) => ({
      ...prevSorterParams,
      isBlocked: values.filter,
    }));
  };

  const onSearch: SearchProps["onSearch"] = (value) =>
    setSorterParams((prevSorterParams) => ({
      ...prevSorterParams,
      search: value,
    }));

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
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
        {!isLoading && (
          <>
            <div className="admin-filters">
              <div className="search-users">
                <Search placeholder="Поиск" onSearch={onSearch} enterButton />
              </div>

              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinishFilter}
                className="filter-form-admin"
              >
                <Form.Item name="filter">
                  <Select placeholder="Выберите статус блокировки" allowClear>
                    <Option value={true}>Заблокированные</Option>
                    <Option value={false}>Не заблокированные</Option>
                    <Option value={undefined}>Все пользователи</Option>
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Применить
                </Button>
              </Form>
            </div>

            <div className="admin-table">
              <Table<User>
                columns={columns}
                dataSource={usersData}
                rowKey="id"
                pagination={paginationParams}
                size="large"
                loading={isLoading}
                onChange={handleTableChange}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminPage;
