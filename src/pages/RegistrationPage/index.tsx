import "./RegistrationPage.css";
import authDesignElement from "../../assets/auth-element.png";
import {
  Button,
  Form,
  Input,
  notification,
  ConfigProvider,
  FormProps,
} from "antd";
import { Link } from "react-router-dom";
import { register } from "../../api/auth";
import { authValidation } from "../../constants/auth";

import type { UserRegistration } from "../../types/authTypes";

const RegistrationPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: "success" | "error") => {
    if (type === "success") {
      const actions = <Link to="/auth/login">Войти в свой аккаунт</Link>;
      api[type]({
        message: "Вы были успешно зарегистрированы!",
        actions,
      });
    } else {
      api[type]({
        message: "Ошибка регистрации",
        description: "Введите данные в соответствии с требованиями валидации.",
      });
    }
  };

  const onSubmitRegistration: FormProps<UserRegistration>["onFinish"] = async (
    values
  ) => {
    delete values["passwordTwo"];
    try {
      await register(values);
      openNotification("success");
    } catch {
      openNotification("error");
    }
  };
  const onFinishFailed: FormProps<UserRegistration>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    openNotification("error");
  };

  return (
    <>
      {contextHolder}
      <div className="reg-all-content">
        <main className="reg-main-content">
          <div className="reg-container">
            <img
              src={authDesignElement}
              alt="Дизайн элемент авторизации"
              className="reg-design-img"
            />
            <div className="reg-title">
              <h1>Войдите в аккаунт</h1>
              <p>Посмотрите, что происходит с вашим бизнесом</p>
            </div>
            <div className="reg-form">
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
                  onFinish={onSubmitRegistration}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                  className="reg-form"
                >
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
                    <Input
                      size="large"
                      className="reg-input"
                      placeholder="Имя пользователя"
                    />
                  </Form.Item>
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
                      {
                        validator(_, value) {
                          return /^[a-z\s]+$/i.test(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Используйте латиницу!")
                              );
                        },
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="reg-input"
                      placeholder="Логин"
                    />
                  </Form.Item>
                  <Form.Item<UserRegistration>
                    label="Пароль"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста введите ваш пароль!",
                      },
                      {
                        min: authValidation.MIN_PASSWORD_LENGHT,
                        message: `Пароль может быть минимум ${authValidation.MIN_PASSWORD_LENGHT} символов`,
                      },
                      {
                        max: authValidation.MAX_PASSWORD_LENGHT,
                        message: `Пароль может быть максимум ${authValidation.MAX_PASSWORD_LENGHT} символов`,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      size="large"
                      className="reg-input"
                      placeholder="*****************"
                    />
                  </Form.Item>
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
                        message: `Пароль может быть минимум ${authValidation.MIN_PASSWORD_LENGHT} символов`,
                      },
                      {
                        max: authValidation.MAX_PASSWORD_LENGHT,
                        message: `Пароль может быть максимум ${authValidation.MAX_PASSWORD_LENGHT} символов`,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return value && value === getFieldValue("password")
                            ? Promise.resolve()
                            : Promise.reject(new Error("Пароли не совпадают!"));
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      size="large"
                      className="reg-input"
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
                      className="reg-input"
                      placeholder="mail@abc.com"
                    />
                  </Form.Item>

                  <Form.Item<UserRegistration>
                    label="Мобильный телефон (необязательно)"
                    name="phoneNumber"
                    rules={[
                      {
                        validator(_, value) {
                          if (!value) {
                            return Promise.resolve(); // поле не обязательно
                          }
                          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                            value
                          )
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Неверный формат телефона!")
                              );
                        },
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="reg-input"
                      placeholder="+7 (800) 555 3535"
                      // enableSearch
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="reg-form-btn"
                    >
                      Зарегистрироваться
                    </Button>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </main>
        <footer className="reg-footer">
          {" "}
          <p>
            Уже есть аккаунт?{" "}
            <Link to="/auth/login" replace>
              Войти
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
};

export default RegistrationPage;
