import "./AdminActions.css";

import { useState } from "react";

import { Space, Popconfirm, Button, Popover, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { User, UserRolesRequest } from "../../types/adminTypes";

import type { SelectProps } from "antd";

const AdminActions: React.FC<{
  record: User;
  onDelete: (id: string) => Promise<void>;
  onBlockUser: (id: string) => Promise<void>;
  onUnBlockUser: (id: string) => Promise<void>;
  onUpdateRoles: (id: string, newRoles: UserRolesRequest) => Promise<void>;
}> = ({ record, onDelete, onBlockUser, onUnBlockUser, onUpdateRoles }) => {
  const [newRolesRequest, setNewRolesRequest] = useState<UserRolesRequest>({
    roles: ["USER"],
  });

  const handleChangeRole = (newRoles: UserRolesRequest) => {
    setNewRolesRequest(newRoles);
  };

  const rolesOptions: SelectProps["options"] = [
    { label: "Администратор", value: "ADMIN" },
    { label: "Модератор", value: "MODERATOR" },
  ];

  return (
    <div className="admin-actions">
      <ul>
        <li>
          <Space size="middle">
            <Link to={`${record.id}`}>Перейти к профилю</Link>
          </Space>
        </li>

        <li>
          {" "}
          <Popconfirm
            title="Удалить пользователя"
            description={`Вы уверены что хотите удалить пользователя ${record.username}?`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            cancelText="Нет"
            okText="Да"
            onConfirm={() => onDelete(`${record.id}`)}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </li>
        <li>
          <Popover
            placement="left"
            title="Управление ролями"
            content={
              <div className="admin-control-roles">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Выберите роль"
                  defaultValue={record.roles.filter((role) => role != "USER")}
                  onChange={(value) =>
                    handleChangeRole({
                      roles: ["USER", ...value],
                    })
                  }
                  options={rolesOptions}
                />
                <Popconfirm
                  title="Обновить роль"
                  description={`Вы уверены что хотите обновить роли у ${record.username}?`}
                  icon={<QuestionCircleOutlined />}
                  cancelText="Нет"
                  okText="Да"
                  onConfirm={() =>
                    onUpdateRoles(`${record.id}`, newRolesRequest)
                  }
                >
                  <Button>Подтвердить</Button>
                </Popconfirm>
              </div>
            }
            trigger="click"
          >
            <Button>Управление ролями</Button>
          </Popover>
        </li>
        <li>
          {!record.isBlocked ? (
            <Popconfirm
              title="Заблокировать пользователя"
              description={`Вы уверены что хотите заблокировать пользователя ${record.username}?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              cancelText="Нет"
              okText="Да"
              onConfirm={() => onBlockUser(`${record.id}`)}
            >
              <Button danger>Заблокировать</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Разблокировать пользователя"
              description={`Вы уверены что хотите разблокировать пользователя ${record.username}?`}
              icon={<QuestionCircleOutlined />}
              cancelText="Нет"
              okText="Да"
              onConfirm={() => onUnBlockUser(`${record.id}`)}
            >
              <Button>Разблокировать</Button>
            </Popconfirm>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminActions;
