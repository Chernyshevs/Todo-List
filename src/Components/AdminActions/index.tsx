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
                      <Button
                        onClick={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: [...record.roles, "ADMIN"],
                          })
                        }
                      >
                        Назначить администратором
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: record.roles.filter(
                              (role) => role != "ADMIN"
                            ),
                          })
                        }
                      >
                        Отобрать администратора
                      </Button>
                    )}
                  </li>
                  <li>
                    {" "}
                    {!record.roles.includes("MODERATOR") ? (
                      <Button
                        onClick={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: [...record.roles, "MODERATOR"],
                          })
                        }
                      >
                        Назначить модератором
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          onUpdateRoles(`${record.id}`, {
                            roles: record.roles.filter(
                              (role) => role != "MODERATOR"
                            ),
                          })
                        }
                      >
                        Отобрать модератора
                      </Button>
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
