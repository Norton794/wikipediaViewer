import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>WikiViewer</h1>

        <a
          className="random"
          href="https://en.wikipedia.org/wiki/Special:Random"
        >
          Go to a random article
        </a>

        <input
          type="text"
          placeholder="Search with the Wikipedia API"
          onChange={this.onSearchChange}
        />

        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default App;
