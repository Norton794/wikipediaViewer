import React, { Component } from "react";
import "./App.css";

const BASE = "https://en.wikipedia.org/w/api.php";
const ACTION = "action=query";
const LIST = "list=search";
const SEARCH = "srsearch=";
const DEFAULT_SEARCH = "React";
const FORMAT = "format=json";
const ORIGIN = "origin=*";

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: null,
      searchTerm: DEFAULT_SEARCH,
    };
    this.setSearchWiki = this.setSearchWiki.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchWiki(result) {
    this.setState({ result });
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(
      `${BASE}?${ACTION}&${LIST}&${SEARCH}${searchTerm}&${FORMAT}&${ORIGIN}`
    )
      .then((response) => response.json())
      .then((result) => this.setSearchWiki(result))
      .catch((error) => error);
  }

  render() {
    const { result, searchTerm } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <h1>WikiViewer</h1>

        <a
          className="random"
          href="https://en.wikipedia.org/wiki/Special:Random"
        >
          Go to a random article
        </a>

        <Search onChange={this.onSearchChange} value={searchTerm}>
          Search with the Wikipedia API
        </Search>
        <List list={result.query.search} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <input type="text" value={value} onChange={onChange} placeholder={children} />
);

const List = ({ list }) => {
  return (
    <div className="container">
      {list.map((item) => (
        <div className="cards" key={item.pageid}>
          <h3 className="pgTitle">{item.title}</h3>
          <div
            className="snippet"
            dangerouslySetInnerHTML={{ __html: `<p>${item.snippet}</p>` }}
          />
        </div>
      ))}
    </div>
  );
};

export default App;
