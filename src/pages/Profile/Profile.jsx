import styleProfile from "./Profile.module.css";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import {  updateUser } from "../../services/actions/user";
import { updateUser } from "../../services/reduxToolkit/userSlice";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/reduxToolkit/userSlice";


function Profile() {
  //Логика формы
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginRef = useRef(null);

  const [inputProfile, setInputProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [icon, setIcon] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [showButton, setShowButton] = useState(false);

  const [colorText, setColorText] = useState({
    name: "text_color_active",
    story: "text_color_inactive",
    logout: "text_color_inactive",
  });
  const colorName = () => {
    setColorText({
      name: "text_color_active",
      story: "text_color_inactive",
      logout: "text_color_inactive",
    });
  };
  const colorStory = () => {
    setColorText({
      name: "text_color_inactive",
      story: "text_color_active",
      logout: "text_color_inactive",
    });
  };

  const nameIcon = icon.name ? "CloseIcon" : "EditIcon";
  const nameLogin = icon.email ? "CloseIcon" : "EditIcon";
  const namePassword = icon.password ? "CloseIcon" : "EditIcon";

  const setParams = (e) => {
    setInputProfile({ ...inputProfile, [e.target.name]: e.target.value });
    setIcon({ ...icon, [e.target.name]: true });
    setShowButton(true);
  };

  const setClearName = () => {
    setInputProfile({ ...inputProfile, name: "" });
    setIcon({ ...icon, name: false });
  };
  const setClearLogin = () => {
    setInputProfile({ ...inputProfile, email: "" });
    setIcon({ ...icon, email: false });
  };
  const setClearPassword = () => {
    setInputProfile({ ...inputProfile, password: "" });
    setIcon({ ...icon, password: false });
  };

  const resetInputs = () => {
    setInputProfile({ name: user.name, email: user.email, password: "" });
    setIcon({ name: false, email: false, password: false });
    setShowButton(false);
  };

  //Логика работы с redux и api
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userSlice);
 
  useEffect(() => {
    setInputProfile({ name: user.name, email: user.email, password: "" });
  }, []);

  const logoutProfile = () => {
    dispatch(logout());
    setColorText({
      name: "text_color_inactive",
      story: "text_color_inactive",
      logout: "text_color_active",
    });
  };

  const updateUserInfo = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(inputProfile.name, inputProfile.email, inputProfile.password)
    );
    setIcon({ name: false, email: false, password: false });
    setShowButton(false);
  };

  return (
    <>
      <div className={styleProfile.container}>
        <div className={styleProfile.links}>
          <p
            className={`text text_type_main-medium mt-5 ${colorText.name}`}
            onClick={colorName}
          >
            Профиль
          </p>
          <NavLink to="/profile/orders" className={styleProfile.list}>
            <p
              className={`text text_type_main-medium ${colorText.story} mt-8`}
              onClick={colorStory}
            >
              История заказов
            </p>
          </NavLink>
          <p
            className={`text text_type_main-medium ${colorText.logout} mt-9`}
            onClick={logoutProfile}
          >
            Выход
          </p>
          <div className={styleProfile.text}>
            <p className={styleProfile.string}>
              В этом разделе вы можете изменить&nbsp;свои персональные данные
            </p>
          </div>
        </div>
        <div>
          <form className={styleProfile.form} onSubmit={updateUserInfo}>
            <div className={styleProfile.nameInput}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={setParams}
                icon={nameIcon}
                value={inputProfile.name}
                name={"name"}
                error={false}
                ref={nameRef}
                onIconClick={setClearName}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
              />
            </div>
            <div className={styleProfile.loginInput}>
              <Input
                type={"text"}
                placeholder={"Логин"}
                onChange={setParams}
                icon={nameLogin}
                value={inputProfile.email}
                name={"email"}
                error={false}
                ref={loginRef}
                onIconClick={setClearLogin}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
              />
            </div>
            <div className={styleProfile.passwordInput}>
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={setParams}
                icon={namePassword}
                value={inputProfile.password}
                name={"password"}
                error={false}
                ref={passwordRef}
                onIconClick={setClearPassword}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
              />
            </div>
            {showButton && (
              <div className={styleProfile.buttonContainer}>
                <p onClick={resetInputs}>Отмена</p>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="medium"
                  extraClass="ml-2"
                >
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;