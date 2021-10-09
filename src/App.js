import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      searchTerm: "React",
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div>
        <h1>WikiViewer</h1>

        <a
          className="random"
          href="https://en.wikipedia.org/wiki/Special:Random"
        >
          Go to a random article
        </a>

        <Search onChange={this.onSearchChange} value={searchTerm}> Search with the Wikipedia API</Search>
        <List list={list}/>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={children}
  />
);

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
};

export default App;
