import "./LoginPage.css";

import authDesignElement from "../../assets/auth-element.png";
import { Button, Form, Input } from "antd";
import { ConfigProvider } from "antd";
import { authValidation } from "../../constants/auth";

import type { AuthData } from "../../types/authTypes";
import type { FormProps } from "antd";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const onSubmitLogin: FormProps<AuthData>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed: FormProps<AuthData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-all-content">
      <main className="login-main-content">
        <div className="login-container">
          <img
            src={authDesignElement}
            alt="Дизайн элемент авторизации"
            className="login-design-img"
          />
          <div className="login-title">
            <h1>Войдите в аккаунт</h1>
            <p>Посмотрите, что происходит с вашим бизнесом</p>
          </div>
          <div className="login-form">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#7F265B",
                },
              }}
            >
              <Form
                name="basic"
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onSubmitLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="login-form"
              >
                <Form.Item<AuthData>
                  label="Логин"
                  name="login"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста введите ваш логин",
                    },
                    {
                      min: authValidation.MIN_LOGIN_LENGHT,
                      message: `Минимум ${authValidation.MIN_LOGIN_LENGHT} символов`,
                    },
                    {
                      max: authValidation.MAX_LOGIN_LENGHT,
                      message: `Максимум ${authValidation.MAX_LOGIN_LENGHT} символов`,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className="login-input"
                    placeholder="Логин"
                  />
                </Form.Item>
                <Form.Item<AuthData>
                  label="Пароль"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста введите ваш пароль!",
                    },
                    {
                      min: authValidation.MIN_PASSWORD_LENGHT,
                      message: `Пароль минимум ${authValidation.MIN_PASSWORD_LENGHT} символов`,
                    },
                    {
                      max: authValidation.MAX_PASSWORD_LENGHT,
                      message: `Пароль максимум ${authValidation.MAX_PASSWORD_LENGHT} символов`,
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    className="login-input"
                    placeholder="*****************"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-btn"
                  >
                    Войти
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </main>
      <footer className="login-footer">
        {" "}
        <p>
          Не зарегистрированы?{" "}
          <Link to="/auth/registration">Создать аккаунт</Link>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
