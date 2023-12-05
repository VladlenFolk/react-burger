import styleReset from "./ResetPassword.module.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/typesHooks";
import { useState, useRef } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {  fetchResetPassword } from "../../services/reduxToolkit/userSlice";
import { useForm } from "../../hooks/useForm";
import { TLocationState } from "../../types/types";

type THistory = {
  location: {state: {prevPathname: string}};
  push: (name: string)=> void
}

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const history: THistory = useHistory();
  
  const prevPath = history.location.state?.prevPathname;
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const { windowSize } = useAppSelector((state) => state.utils);
  const { state } = useLocation<TLocationState>();
  const codeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { values, handleChange } = useForm({
    password: "",
    code: "",
  });
  const [type, setType] = useState<"ShowIcon"| "HideIcon">("ShowIcon");

  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (!prevPath) {
    return <Redirect to="/login" />;
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

  const submitLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchResetPassword({password: values.password, token: values.code}));
    history.push("/login");
  };

    //размер инпута
    const inputSize = windowSize > 660 ? 'default' : 'small';

  return (
    <>
      <div className={styleReset.container}>
        <h3 className={`text text_type_main-medium mb-5 ${styleReset.title}`}>
          Восстановление пароля
        </h3>
        <form className={styleReset.form} onSubmit={submitLogin}>
            <Input
              type={"password"}
              placeholder={"Введите новый пароль"}
              onChange={handleChange}
              icon={type}
              value={values.password}
              name={"password"}
              error={false}
              ref={passwordRef}
              onIconClick={toggleTypePassword}
              errorText={"Ошибка"}
              size={inputSize}
            />
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              value={values.code}
              name={"code"}
              error={false}
              ref={codeRef}
              onIconClick={toggleTypePassword}
              errorText={"Ошибка"}
              size={inputSize}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styleReset.button}
            >
              Сохранить
            </Button>
        </form>
        <div className={styleReset.registrationContainer}>
          <p className={styleReset.text}>Вспомнили пароль?</p>
          <Link className={styleReset.link} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;