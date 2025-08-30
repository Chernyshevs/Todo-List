import "./AdminActions.css";

import { useState } from "react";

import { Space, Popconfirm, Button, Select, Modal } from "antd";
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
  const [roles, setRoles] = useState<UserRolesRequest>({
    roles: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeRole = (newRoles: UserRolesRequest) => {
    setRoles(newRoles);
  };
  const showModal = (roles: UserRolesRequest) => {
    setRoles(roles);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateRoles = (id: string, newRoles: UserRolesRequest) => {
    onUpdateRoles(id, newRoles);
    setIsModalOpen(false);
  };

  const rolesOptions: SelectProps["options"] = [
    { label: "Пользователь", value: "USER" },
    { label: "Модератор", value: "MODERATOR" },
    { label: "Администратор", value: "ADMIN" },
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
          <Button onClick={() => showModal({ roles: record.roles })}>
            Управление ролями
          </Button>
          <Modal
            title="Обновить роли"
            open={isModalOpen}
            onOk={() => handleUpdateRoles(`${record.id}`, roles)}
            onCancel={handleCancelModal}
            okText="Подтвердить"
            cancelText="Отменить"
          >
            <div className="admin-control-roles">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Выберите роль"
                value={roles.roles}
                onChange={(value) =>
                  handleChangeRole({
                    roles: value,
                  })
                }
                options={rolesOptions}
              />
            </div>
          </Modal>
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
