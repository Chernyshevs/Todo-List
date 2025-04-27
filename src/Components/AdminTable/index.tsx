import "./AdminTable.css";

import { Table, Tag, GetProp, TableProps } from "antd";

import type {
  User,
  UserFilters,
  Roles,
  UserRolesRequest,
} from "../../types/adminTypes";
import type { TableColumnsType } from "antd";
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import AdminActions from "../AdminActions";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;
type TableChangeHandler = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<User> | SorterResult<User>[],
  extra: TableCurrentDataSource<User>
) => void;

const AdminTable: React.FC<{
  sorterParams: UserFilters;
  usersData: User[];
  paginationParams: TablePaginationConfig;
  isLoading: boolean;
  onChange: TableChangeHandler;
  onDelete: (id: string) => Promise<void>;
  onBlockUser: (id: string) => Promise<void>;
  onUnBlockUser: (id: string) => Promise<void>;
  onUpdateRoles: (id: string, newRoles: UserRolesRequest) => Promise<void>;
}> = ({
  sorterParams,
  usersData,
  paginationParams,
  isLoading,
  onChange,
  onDelete,
  onBlockUser,
  onUnBlockUser,
  onUpdateRoles,
}) => {
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
      title: "Действия",
      key: "action",
      render: (_, record) => (
        <AdminActions
          record={record}
          onDelete={onDelete}
          onBlockUser={onBlockUser}
          onUnBlockUser={onUnBlockUser}
          onUpdateRoles={onUpdateRoles}
        />
      ),
    },
  ];

  return (
    <div className="admin-table">
      <Table<User>
        columns={columns}
        dataSource={usersData}
        rowKey="id"
        pagination={paginationParams}
        size="large"
        loading={isLoading}
        onChange={onChange}
      />
    </div>
  );
};

export default AdminTable;
