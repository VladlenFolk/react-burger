import styleReset from "./ResetPassword.module.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/reduxToolkit/userSlice";
import { useForm } from "../../hooks/useForm";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const prevPath = history.location.state?.prevPathname;
  const { isAuthChecked } = useSelector((state) => state.userSlice);
  const { state } = useLocation();
  const codeRef = useRef(null);
  const passwordRef = useRef(null);
  const { values, handleChange } = useForm({
    password: "",
    code: "",
  });
  const [type, setType] = useState("ShowIcon");

  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (!prevPath) {
    return <Redirect to="/login" />;
  }

  const toggleTypePassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      setType("HideIcon");
    } else {
      passwordRef.current.type = "password";
      setType("ShowIcon");
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(resetPassword(values.password, values.code));
    history.push("/login");
  };

  return (
    <>
      <div className={styleReset.container}>
        <h3 className="text text_type_main-medium mb-5">
          Восстановление пароля
        </h3>
        <form className={styleReset.form} onSubmit={submitLogin}>
          <div className={styleReset.passwordInput}>
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
              size={"default"}
              extraClass="ml-1"
            />
          </div>
          <div className={styleReset.codeInput}>
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
              size={"default"}
              extraClass="ml-1"
            />
          </div>
          <div className={styleReset.button}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="ml-2"
            >
              Сохранить
            </Button>
          </div>
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