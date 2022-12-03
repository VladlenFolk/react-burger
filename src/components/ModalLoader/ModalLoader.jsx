import style from "./ModalLoader.module.css";

const ModalLoader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default ModalLoader;