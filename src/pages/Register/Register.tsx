import styleRegister from "./register.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typesHooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { fetchRegUser } from "../../services/reduxToolkit/userSlice";
import { TLocationProps } from "../../types/types";

function Register() {
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const { state } = useLocation() as TLocationProps;
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const [type, setType] = useState<"ShowIcon"| "HideIcon">("ShowIcon");
  const dispatch = useAppDispatch();

  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
  }

  const toggleTypePassword = () => {
    if (passwordRef.current!.type === "password") {
      passwordRef.current!.type = "text";
      setType("HideIcon");
    } else {
      passwordRef.current!.type = "password";
      setType("ShowIcon");
    }
  };

  const submitRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRegUser({email: values.email, password: values.password,name: values.name}));
  };

  return (
    <>
      <div className={styleRegister.container}>
        <h3 className="text text_type_main-medium mb-5">Регистрация</h3>
        <form className={styleRegister.form} onSubmit={submitRegister}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            ref={nameRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <div className={styleRegister.emailInput}>
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={handleChange}
              value={values.email}
              name={"email"}
              error={false}
              ref={mailRef}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          </div>
          <div className={styleRegister.passwordInput}>
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={handleChange}
              icon={type}
              value={values.password}
              name={"password"}
              error={false}
              ref={passwordRef}
              onIconClick={toggleTypePassword}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          </div>
          <div className={styleRegister.button}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="ml-2"
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <div className={styleRegister.registrationContainer}>
          <p className={styleRegister.text}>Уже зарегестрированы?</p>

          <Link className={styleRegister.link} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;