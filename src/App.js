import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import {
  BASE,
  ACTION,
  LIST,
  SEARCH,
  DEFAULT_SEARCH,
  FORMAT,
  ORIGIN,
  RANDOM,
} from "./constants/index.js";

class App extends Component {
  _isMounted = false;
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
    axios(
      `${BASE}?${ACTION}&${LIST}&${SEARCH}${searchTerm}&${FORMAT}&${ORIGIN}`
    )
      .then((result) => this._isMounted && this.setSearchWiki(result.data))
      .catch((error) => this._isMounted && this.setState({ error }));
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    searchTerm && this.fetchSearchWiki(searchTerm);
  }

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;

    this.fetchSearchWiki(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { result, searchTerm, error } = this.state;

    return (
      <div className="page">
        <h1>WikiViewer</h1>

        <a className="random" href={RANDOM}>
          Go to a random article
        </a>

        <Search
          onChange={this.onSearchChange}
          value={searchTerm}
          onSubmit={this.onSearchSubmit}
        >
          Search with the Wikipedia API
        </Search>
        {error ? (
          <p className="error">Something went wrong :(</p>
        ) : (
          <List list={result} />
        )}
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

export default App;

export { Search, List };
