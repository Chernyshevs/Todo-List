import AuthLayout from "../../Components/AuthLayout";
import AuthForm from "../../Components/AuthForm";
import { Link } from "react-router-dom";

import type { AuthData } from "../../types/authTypes";

const LoginPage: React.FC = () => {
  const onSubmitLogin = (values: AuthData) => {
    console.log("OK!" + values);
  };

  const titleData = (
    <>
      <h1>Войдите в аккаунт</h1>
      <p>Посмотрите, что происходит с вашим бизнесом</p>
    </>
  );

  const footerData = (
    <p>
      Не зарегистрированы? <Link to="/auth/registration">Создать аккаунт</Link>
    </p>
  );
  return (
    <AuthLayout titleData={titleData} footerData={footerData}>
      <AuthForm<AuthData> type="login" onSubmit={onSubmitLogin} />
    </AuthLayout>
  );
};

export default LoginPage;
