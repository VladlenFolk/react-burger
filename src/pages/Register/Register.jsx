import styleRegister from "./register.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { regUser } from "../../services/actions/user";

function Register() {
  const { isAuthChecked } = useSelector((state) => state.user);
  const { state } = useLocation();
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passwordRef = useRef(null);
  const [inputRegister, setInputRegister] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [type, setType] = useState("ShowIcon");
  const dispatch = useDispatch();

  if (isAuthChecked) {
    return <Redirect to={state?.from || "/"} />;
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

  const setParams = (e) => {
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    dispatch(
      regUser(inputRegister.email, inputRegister.password, inputRegister.name)
    );
  };

  return (
    <>
      <div className={styleRegister.container}>
        <h3 className="text text_type_main-medium mb-5">Регистрация</h3>
        <form className={styleRegister.form} onSubmit={submitRegister}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={setParams}
            value={inputRegister.name}
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
              onChange={setParams}
              value={inputRegister.email}
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
              onChange={setParams}
              icon={type}
              value={inputRegister.password}
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