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
      error: null,
    };
    this.setSearchWiki = this.setSearchWiki.bind(this);
    this.fetchSearchWiki = this.fetchSearchWiki.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchWiki(result) {
    this.setState({ result });
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  fetchSearchWiki(searchTerm) {
    fetch(
      `${BASE}?${ACTION}&${LIST}&${SEARCH}${searchTerm}&${FORMAT}&${ORIGIN}`
    )
      .then((response) => response.json())
      .then((result) => this.setSearchWiki(result))
      .catch((error) => this.setState({ error }));
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    searchTerm && this.fetchSearchWiki(searchTerm);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchWiki(searchTerm);
  }

  render() {
    const { result, searchTerm, error } = this.state;

    

    return (
      <div className="page">
        <h1>WikiViewer</h1>

        <a
          className="random"
          href="https://en.wikipedia.org/wiki/Special:Random"
        >
          Go to a random article
        </a>

        <Search
          onChange={this.onSearchChange}
          value={searchTerm}
          onSubmit={this.onSearchSubmit}
        >
          Search with the Wikipedia API
        </Search>
        {error ? <p>Something went wrong.</p> : <List list={result} />}
      </div>
    );
  }
}

const Search = ({ value, onChange, children, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={children}
    />
  </form>
);

const List = ({ list }) => {
  return (
    <div className="container">
      {list && list.query.search.map((item) => (
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

export default App;
