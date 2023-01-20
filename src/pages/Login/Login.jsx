import styleLogin from "./Login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useRef, FC} from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/reduxToolkit/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/typesHooks";

  const  Login = () => {
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const PasswordRef = useRef(null);
  const [type, setType] = useState("ShowIcon");
  const [inputLogin, setInputLogin] = useState({ email: "", password: "" });


  const toggleTypePassword = () => {
    if (PasswordRef.current?.type === "password") {
      PasswordRef.current.type = "text";
      setType("HideIcon");
    } else if (PasswordRef.current) {
      PasswordRef.current.type = "password";
      setType("ShowIcon");
    }
  };
  const { state } = useLocation();
  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
  }

  const setParams = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

   const submitLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputLogin.email, inputLogin.password));
  };

  return (
    <div className={styleLogin.container}>
      <h3 className="text text_type_main-medium mb-5">Вход</h3>
      <form className={styleLogin.form} onSubmit={submitLogin}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={setParams}
          value={inputLogin.email}
          name={"email"}
          error={false}
          ref={nameRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <div className={styleLogin.passwordInput}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={setParams}
            icon={type}
            value={inputLogin.password}
            name={"password"}
            error={false}
            ref={PasswordRef}
            onIconClick={toggleTypePassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div className={styleLogin.button}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Войти
          </Button>
        </div>
      </form>
      <div className={styleLogin.registrationContainer}>
        <p className={styleLogin.text}>Вы - новый пользователь?</p>
        <Link className={styleLogin.link} to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div className={styleLogin.restoreContainer}>
        <p className={styleLogin.text}>Забыли пароль?</p>
        <Link className={styleLogin.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}

export default Login;