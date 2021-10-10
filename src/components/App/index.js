import React, { Component } from "react";
import axios from "axios";
import './index.css';
import {
  BASE,
  ACTION,
  LIST,
  SEARCH,
  DEFAULT_SEARCH,
  FORMAT,
  ORIGIN,
  RANDOM,
} from "../../constants/index";

import {Search} from '../../components/Search/index';

import {ListWithLoading, Loading} from '../../components/Loading/index';

class App extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      result: null,
      searchTerm: DEFAULT_SEARCH,
      error: null,
      isLoading: false,
    };
    this.setSearchWiki = this.setSearchWiki.bind(this);
    this.fetchSearchWiki = this.fetchSearchWiki.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchWiki(result) {
    this.setState({ result, isLoading: false });
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  fetchSearchWiki(searchTerm) {
    this.setState({ isLoading: true });

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
    const { result, searchTerm, error, isLoading } = this.state;

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
        ></Search>
        {error ? 
          <p className="error">Something went wrong :(</p>
         : <ListWithLoading list={result} isLoading={isLoading}/>
        }
      </div>
    );
  }
}





export default App;

