{/* <div className="auth-form">
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
    <Form.Item<AuthType>
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

    <Form.Item<AuthType>
      label="Пароль"
      name="password"
      rules={[
        {
          required: true,
          message: "Пожалуйста введите ваш пароль!",
        },
      ]}
    >
      <Input.Password
        size="large"
        className="auth-input"
        placeholder="*****************"
      />
    </Form.Item>

    <Form.Item<AuthType>
      name="remember"
      valuePropName="checked"
      className="auth-form-remember"
    >
      <Checkbox>Запомнить</Checkbox>
    </Form.Item>

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="auth-form-btn"
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
</ConfigProvider>
</div> */}

// ({ getFieldValue }) => ({
//   validator(_, value) {
//     return value && value === getFieldValue("password")
//       ? Promise.resolve()
//       : Promise.reject(new Error("Пароли не совпадают!"));
//   },
// }),