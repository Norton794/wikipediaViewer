import PropTypes from "prop-types";
import './index.css';
export const List = ({ list }) => {
    return (
      <div className="container">
        {list &&
          list.query.search.map((item) => (
            <div className="cards" key={item.pageid}>
              <a href={`https://en.wikipedia.org/?curid=${item.pageid}`}>
                <h3 className="pgTitle">{item.title}</h3>
                <div
                  className="snippet"
                  dangerouslySetInnerHTML={{ __html: `<p>${item.snippet}</p>` }}
                />
              </a>
            </div>
          ))}
      </div>
    );
  };
  
  List.propTypes = {
    list: PropTypes.object,
  };