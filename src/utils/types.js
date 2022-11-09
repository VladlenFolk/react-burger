import PropTypes from "prop-types";

export const ingredientType = {
    count: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredient: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };