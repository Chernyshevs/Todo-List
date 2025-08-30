import { Button } from "antd";
import "./ProfilePage.css";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/auth-actions";
import { useSelector } from "react-redux";
const ProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userProfileStore = useSelector((state: RootState) => state.userProfile);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="profile">
        {userProfileStore.userData && (
          <ul className="user-data">
            <li>
              Имя пользователя:{" "}
              <span className="highlighted">
                {userProfileStore.userData.username}
              </span>
            </li>
            <li>
              Почтовый адрес:{" "}
              <span className="highlighted">
                {userProfileStore.userData.email}
              </span>
            </li>
            <li>
              Телефон:{" "}
              <span className="highlighted">
                {userProfileStore.userData.phoneNumber
                  ? userProfileStore.userData.phoneNumber
                  : "Нет"}
              </span>
            </li>
          </ul>
        )}
      </div>
      <Button size="large" onClick={handleLogout}>
        Выйти
      </Button>
    </>
  );
};

export default ProfilePage;
