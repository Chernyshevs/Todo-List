import "./AuthLayout.css";

import authDesignElement from "../../assets/auth-element.png";

const AuthLayout: React.FC<{
  children: React.ReactNode;
  titleData: React.ReactNode;
  footerData: React.ReactNode;
}> = ({ children, titleData, footerData }) => {
  return (
    <div className="auth-all-content">
      <main className="auth-main-content">
        <div className="auth-container">
          <img
            src={authDesignElement}
            alt="Дизайн элемент авторизации"
            className="auth-design-img"
          />
          <div className="auth-title">{titleData}</div>
          {children}
        </div>
      </main>
      <footer className="auth-footer">{footerData}</footer>
    </div>
  );
};

export default AuthLayout;
