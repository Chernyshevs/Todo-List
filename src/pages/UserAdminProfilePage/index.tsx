import "./UserAdminProfilePage.css"

import { getUser, updateUserData } from "../../api/admin";
import { User, UserRequest } from "../../types/adminTypes";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Input, Form, FormProps } from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const UserAdminProfilePage: React.FC = () => {
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

  const handleSubmit: FormProps["onFinish"] = async (values: UserRequest) => {
    if (params.userId && userData) {
      try {
        const changedData: UserRequest = {
          ...(values.username !== userData?.username
            ? { username: values.username }
            : {}),
          ...(values.email !== userData?.email ? { email: values.email } : {}),
          ...(values.phoneNumber !== userData?.phoneNumber
            ? { phoneNumber: values.phoneNumber }
            : {}),
        };
        await updateUserData(params.userId, changedData);
        form.setFieldsValue({ ...userData, ...changedData });
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
            layout="inline"
            onFinish={handleSubmit}
            autoComplete="off"
            id={`user-data-form`}
            className="admin-user-data-form"
          >
            <Form.Item
              style={{ width: "14rem" }}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Имя пользователя обязательно для заполнения",
                },
              ]}
            >
              <Input placeholder="Имя пользовтеля" size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "14rem" }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Эл. Почта обязательна для заполнения",
                },
              ]}
            >
              <Input placeholder="Эл. Почта" size="large" />
            </Form.Item>
            <Form.Item style={{ width: "14rem" }} name="phoneNumber">
              <Input placeholder="Номер телефона" size="large" />
            </Form.Item>
          </Form>
          <div className="admin-user-actions">
            <ul>
              {!isDisabledForm ? (
                <>
                  {" "}
                  <li>
                    <Button
                      icon={<SaveOutlined />}
                      size="large"
                      form="user-data-form"
                      htmlType="submit"
                    />
                  </li>
                  <li>
                    <Button
                      icon={<CloseOutlined />}
                      size="large"
                      onClick={handleEndEdit}
                    />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      icon={<EditOutlined />}
                      size="large"
                      onClick={handleStartEdit}
                      htmlType="button"
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
      <Button>
        <Link to=".." relative="path">Вернуться</Link>
      </Button>
    </div>
  );
};

export default UserAdminProfilePage;
