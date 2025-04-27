import { Button } from "antd";
import "./ProfilePage.css";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../store/auth-actions";
import { getUserData } from "../../api/auth";
import { Profile } from "../../types/authTypes";
const ProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    phoneNumber?: string;
  }>();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData: Profile = await getUserData();
      setUserData({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    };
    fetchUserData();
  }, []);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
        <div className="profile">
          {userData && (
            <ul className="user-data">
              <li>
                Имя пользователя:{" "}
                <span className="highlighted">{userData.username}</span>
              </li>
              <li>
                Почтовый адрес:{" "}
                <span className="highlighted">{userData.email}</span>
              </li>
              <li>
                Телефон:{" "}
                <span className="highlighted">
                  {userData.phoneNumber ? userData.phoneNumber : "Нет"}
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
