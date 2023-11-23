import containerConstructorStyle from "./ConstructorContainer.module.css";
import {FC} from 'react';

const ConstructorContainer: FC = () => {
    return (
        <div className={containerConstructorStyle.container}>
        <h2 className={`title_text text text_type_main-large ${containerConstructorStyle.header}`}>Выберите ингредиенты</h2>
        </div>
    )
}
export default ConstructorContainer;