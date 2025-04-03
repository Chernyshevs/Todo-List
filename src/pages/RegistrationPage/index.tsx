import AuthLayout from "../../Components/AuthLayout";
import AuthForm from "../../Components/AuthForm";
import { Link } from "react-router-dom";

import type { UserRegistration } from "../../types/authTypes";

const RegistrationPage: React.FC = () => {
  const onSubmitRegistraion = (values: UserRegistration) => {
    console.log("OK!" + values);
  };

  const titleData = (
    <>
      <h1>Создайте аккаунт</h1>
      <p>Посмотрите, что происходит с вашим бизнесом</p>
    </>
  );

  const footerData = (
    <p>
      Уже есть аккаунт? <Link to="/auth/login">Войти в свой аккаунт</Link>
    </p>
  );
  return (
    <AuthLayout titleData={titleData} footerData={footerData}>
      <AuthForm<UserRegistration>
        type="registration"
        onSubmit={onSubmitRegistraion}
      />
    </AuthLayout>
  );
};
export default RegistrationPage;
