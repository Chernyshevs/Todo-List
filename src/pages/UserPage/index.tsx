import "./UserAdminProfilePage.css";

import { getUser, updateUserData } from "../../api/admin";
import { User, UserRequest } from "../../types/adminTypes";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Input, Form, FormProps } from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { authValidation } from "../../constants/auth";

const UserPage: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  const [isDisabledForm, setIsDisabledForm] = useState<boolean>(true);

  const params = useParams();

  useEffect(() => {
    const fetchDataUser = async () => {
      if (params.userId) {
        const userProfileData = await getUser(params.userId);
        setUserData(userProfileData);
      }
    };
    fetchDataUser();
  }, []);
  const [form] = Form.useForm();
  const handleStartEdit = () => {
    setIsDisabledForm(false);
  };

  const handleEndEdit = () => {
    form.resetFields();
    setIsDisabledForm(true);
  };

  const getChangedFields = (original: UserRequest, updated: UserRequest) => {
    const result: UserRequest = {};

    for (const key in updated) {
      const typedKey = key as keyof UserRequest;
      if (updated[typedKey] !== original[typedKey]) {
        result[typedKey] = updated[typedKey];
      }
    }

    return result;
  };

  const handleSubmit: FormProps["onFinish"] = async (values: UserRequest) => {
    if (params.userId && userData) {
      try {
        const changedData: UserRequest = getChangedFields(userData, values);
        await updateUserData(params.userId, changedData);
        setUserData({ ...userData, ...changedData });
      } catch {
        alert("Не удалось обновить данные пользователя");
      } finally {
        setIsDisabledForm(true);
      }
    }
  };
  return (
    <div className="admin-user-profile">
      <h1>Управление профилем пользователя</h1>
      {userData && (
        <div className="admin-user-data">
          <Form
            form={form}
            name={`user-data-form`}
            initialValues={{
              username: userData.username,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
            }}
            disabled={isDisabledForm}
            layout="horizontal"
            onFinish={handleSubmit}
            autoComplete="off"
            id={`user-data-form`}
            className="admin-user-data-form"
          >
            <Form.Item
              style={{ width: "14rem" }}
              label="Имя пользователя"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите имя пользователя",
                },
                {
                  min: authValidation.MIN_USERNAME_LENGTH,
                  message: `Минимум ${authValidation.MIN_USERNAME_LENGTH} символов`,
                },
                {
                  max: authValidation.MAX_USERNAME_LENGTH,
                  message: `Максимум ${authValidation.MAX_USERNAME_LENGTH} символов`,
                },
                {
                  validator(_, value) {
                    return /^[a-zа-я\s]+$/i.test(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Используйте латиницу или кириллицу!")
                        );
                  },
                },
              ]}
            >
              <Input placeholder="Имя пользовтеля" size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "14rem" }}
              label="Эл. Почта"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите Email!",
                },
                {
                  type: "email",
                  message: "Email введён неверно!",
                },
              ]}
            >
              <Input placeholder="Эл. Почта" size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "14rem" }}
              name="phoneNumber"
              label="Номер телефона"
              rules={[
                {
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                      value
                    )
                      ? Promise.resolve()
                      : Promise.reject(new Error("Неверный формат телефона!"));
                  },
                },
              ]}
            >
              <Input placeholder="Номер телефона" size="large" />
            </Form.Item>
          </Form>
          <div className="admin-user-actions">
            <div>
              {!isDisabledForm ? (
                <>
                  {" "}
                  <Button
                    icon={<SaveOutlined />}
                    size="large"
                    form="user-data-form"
                    htmlType="submit"
                  />
                  <Button
                    icon={<CloseOutlined />}
                    size="large"
                    onClick={handleEndEdit}
                  />
                </>
              ) : (
                <>
                  <Button
                    icon={<EditOutlined />}
                    size="large"
                    onClick={handleStartEdit}
                    htmlType="button"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Button>
        <Link to="/admin" relative="path">
          Вернуться
        </Link>
      </Button>
    </div>
  );
};

export default UserPage;
