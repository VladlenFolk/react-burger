import styleLogin from "./Login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useRef, FC } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchLogin } from "../../services/reduxToolkit/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/typesHooks";
import { TLocationProps } from "../../types/types";

const Login: FC = () => {
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const { windowSize } = useAppSelector((state) => state.windowSlice);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"ShowIcon" | "HideIcon">("ShowIcon");
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
  const { state } = useLocation() as TLocationProps;
  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
  }

  const setParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

  const submitLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchLogin({ email: inputLogin.email, password: inputLogin.password })
    );
  };

  //размер инпута
  const inputSize = windowSize > 660 ? "default" : "small";

  return (
    <div className={styleLogin.container}>
      <h2 className={`text text_type_main-medium mb-5 ${styleLogin.title}`}>
        Вход
      </h2>
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
          size={inputSize}
        />
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
          size={inputSize}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styleLogin.button}
        >
          Войти
        </Button>
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
};

export default Login;
