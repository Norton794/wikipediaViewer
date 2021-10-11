import PropTypes from "prop-types";
import './index.css';
export const Search = ({ value, onChange, children, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={children}
      />
    </form>
  );
  
  Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.string,
    onSubmit: PropTypes.func,
  };
  
  Search.defaultProps = {
    children: "Search with the Wikipedia API",
  };
  