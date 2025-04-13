import "./LoginPage.css";

import authDesignElement from "../../assets/auth-element.png";
import {
  Button,
  Form,
  Input,
  FormProps,
  ConfigProvider,
  notification,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { authValidation } from "../../constants/auth";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth-actions";

import type { AuthData } from "../../types/authTypes";
import type { AppDispatch, RootState } from "../../store";
import { authActions } from "../../store/auth-slice";

const LoginPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.auth.isAuthInProgress
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotificationError = () => {
    api["error"]({
      message: "Ошибка авторизации",
      description: "Проверьте, правильно ли введены логин/пароль.",
    });
  };
  const onSubmitLogin: FormProps<AuthData>["onFinish"] = async (values) => {
    try {
      dispatch(authActions.authStart());
      await dispatch(loginUser(values)).unwrap();
      dispatch(authActions.login());
    } catch {
      openNotificationError();
    } finally {
      dispatch(authActions.authEnd());
    }
  };
  const onFinishFailed: FormProps<AuthData>["onFinishFailed"] = () => {
    openNotificationError();
  };

  return (
    <>
      {contextHolder}
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
                        message: `Пароль может быть минимум ${authValidation.MIN_PASSWORD_LENGHT} символов`,
                      },
                      {
                        max: authValidation.MAX_PASSWORD_LENGHT,
                        message: `Пароль может быть максимум ${authValidation.MAX_PASSWORD_LENGHT} символов`,
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
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            style={!isLoading ? { opacity: `0` } : {}}
          />
          </div>
        </main>
        <footer className="login-footer">
          {" "}
          <p>
            Не зарегистрированы?{" "}
            <Link to="/auth/registration" replace>
              Создать аккаунт
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
