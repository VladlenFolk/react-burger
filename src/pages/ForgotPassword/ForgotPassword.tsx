import styleForgot from "./ForgotPassword.module.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typesHooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchRequestRestoreCode } from "../../services/reduxToolkit/userSlice";
import { useForm } from "../../hooks/useForm";

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isAuthChecked } = useAppSelector((state) => state.userSlice);
  const { windowSize } = useAppSelector((state) => state.windowSlice);
  const { values, handleChange } = useForm({ email: "" });
  const nameRef = useRef<HTMLInputElement>(null);

  const submitForgotPass = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRequestRestoreCode({ email: values.email }));
    history.push({
      pathname: "/reset-password",
      state: { prevPathname: history.location.pathname },
    });
  };

  if (isAuthChecked) {
    return <Redirect to="/" />;
  }

  //размер инпута
  const inputSize = windowSize > 660 ? "default" : "small";

  return (
    <>
      <div className={styleForgot.container}>
        <h3 className={`text text_type_main-medium mb-5 ${styleForgot.title}`}>
          Восстановление пароля
        </h3>
        <form className={styleForgot.form} onSubmit={submitForgotPass}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={false}
            ref={nameRef}
            errorText={"Ошибка"}
            size={inputSize}
            extraClass="ml-1"
          />
          <Button
            htmlType="submit"
            type="primary"
            size={"medium"}
            extraClass={styleForgot.button}
          >
            Восстановить
          </Button>
        </form>
        <div className={styleForgot.registrationContainer}>
          <p className={styleForgot.text}>Вспомнили пароль?</p>
          <Link className={styleForgot.link} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
