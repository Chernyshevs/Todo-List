import "./AdminActions.css";

import { Space, Popconfirm, Button, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { User, UserRolesRequest } from "../../types/adminTypes";

const AdminActions: React.FC<{
  record: User;
  onDelete: (id: string) => Promise<void>;
  onBlockUser: (id: string) => Promise<void>;
  onUnBlockUser: (id: string) => Promise<void>;
  onUpdateRoles: (id: string, newRoles: UserRolesRequest) => Promise<void>;
}> = ({ record, onDelete, onBlockUser, onUnBlockUser, onUpdateRoles }) => {
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
                <ul>
                  <li>
                    {!record.roles.includes("ADMIN") ? (
                      <Popconfirm
                        title="Назначить администратором"
                        description={`Вы уверены что хотите назначить администратором пользователя ${record.username}?`}
                        icon={<QuestionCircleOutlined />}
                        cancelText="Нет"
                        okText="Да"
                        onConfirm={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: [...record.roles, "ADMIN"],
                          })
                        }
                      >
                        <Button>Назначить администратором</Button>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="Отобрать администратора"
                        description={`Вы уверены что хотите отобрать администратора у пользователя ${record.username}?`}
                        icon={<QuestionCircleOutlined />}
                        cancelText="Нет"
                        okText="Да"
                        onConfirm={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: record.roles.filter(
                              (role) => role != "ADMIN"
                            ),
                          })
                        }
                      >
                        <Button>Отобрать администратора</Button>
                      </Popconfirm>
                    )}
                  </li>
                  <li>
                    {" "}
                    {!record.roles.includes("MODERATOR") ? (
                      <Popconfirm
                        title="Назначить модератором"
                        description={`Вы уверены что хотите назначить модератором пользователя ${record.username}?`}
                        icon={<QuestionCircleOutlined />}
                        cancelText="Нет"
                        okText="Да"
                        onConfirm={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: [...record.roles, "MODERATOR"],
                          })
                        }
                      >
                        <Button>Назначить модератором</Button>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="Отобрать модератора"
                        description={`Вы уверены что хотите отобрать модератора у пользователя ${record.username}?`}
                        icon={<QuestionCircleOutlined />}
                        cancelText="Нет"
                        okText="Да"
                        onConfirm={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: record.roles.filter(
                              (role) => role != "MODERATOR"
                            ),
                          })
                        }
                      >
                        <Button>Отобрать модератора</Button>
                      </Popconfirm>
                    )}
                  </li>
                </ul>
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
