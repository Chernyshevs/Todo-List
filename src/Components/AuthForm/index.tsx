import "./AuthForm.css";

import { Button, Form, Input } from "antd";
import { ConfigProvider } from "antd";
import PhoneInput from "antd-phone-input";
import { authValidation } from "../../constants/auth";

import type { AuthData } from "../../types/authTypes";
import type { UserRegistration } from "../../types/authTypes";
import type { FormProps } from "antd";
import type { AuthFormProps } from "../../types/authTypes";

const AuthForm = <T extends UserRegistration | AuthData>({
  type,
  onSubmit,
}: AuthFormProps<T>) => {
  const onFinish: FormProps<T>["onFinish"] = (values) => {
    onSubmit(values);
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<AuthData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="auth-form">
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="auth-form"
        >
          <Form.Item<UserRegistration>
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
            <Input size="large" className="auth-input" placeholder="Логин" />
          </Form.Item>

          {type === "registration" && (
            <Form.Item<UserRegistration>
              label="Имя пользователя"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите ваше имя пользователя",
                },
                {
                  min: authValidation.MIN_USERNAME_LENGTH,
                  message: `Минимум ${authValidation.MIN_USERNAME_LENGTH} символов`,
                },
                {
                  max: authValidation.MAX_USERNAME_LENGTH,
                  message: `Максимум ${authValidation.MAX_USERNAME_LENGTH} символов`,
                },
              ]}
            >
              <Input
                size="large"
                className="auth-input"
                placeholder="Имя пользователя"
              />
            </Form.Item>
          )}
          <Form.Item<AuthData | UserRegistration>
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
              className="auth-input"
              placeholder="*****************"
            />
          </Form.Item>

          {type === "registration" && (
            <>
              <Form.Item<UserRegistration>
                label="Повторите пароль"
                name="passwordTwo"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста повторите ваш пароль!",
                  },
                  {
                    min: authValidation.MIN_PASSWORD_LENGHT,
                    message: `Пароль минимум ${authValidation.MIN_PASSWORD_LENGHT} символов`,
                  },
                  {
                    max: authValidation.MAX_PASSWORD_LENGHT,
                    message: `Пароль максимум ${authValidation.MAX_PASSWORD_LENGHT} символов`,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return value && value === getFieldValue("password")
                        ? Promise.resolve()
                        : Promise.reject(new Error("Пароли не совпадают!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  className="auth-input"
                  placeholder="*****************"
                />
              </Form.Item>

              <Form.Item<UserRegistration>
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите ваш Email!",
                  },
                  {
                    type: "email",
                    message: "Email введён неверно!",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="auth-input"
                  placeholder="mail@abc.com"
                />
              </Form.Item>

              <Form.Item<UserRegistration>
                label="Мобильный телефон"
                name="phoneNumber"
                rules={[
                  {
                    validator(_, { valid }) {
                      if (valid()) return Promise.resolve();
                      return Promise.reject("Неверный формат телефона!");
                    },
                  },
                ]}
              >
                <PhoneInput
                  size="large"
                  placeholder="+7 (800) 555 3535"
                  enableSearch
                />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="auth-form-btn"
            >
              {type === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default AuthForm;
