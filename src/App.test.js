import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { Search, List } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("List", () => {
  const props = {
    list: {
      query: {
        search: [
          {
            ns: 0,
            title: "Deadpool and Korg React",
            pageid: 68266160,
            size: 18176,
            wordcount: 1370,
            snippet:
              'Deadpool and Korg <span class="searchmatch">React</span> is a 2021 American superhero promotional short film featuring the Marvel Comics characters Deadpool and Korg. The film was directed',
            timestamp: "2021-10-09T03:52:37Z",
          },
          {
            ns: 0,
            title: "React Quotes",
            pageid: 14985089,
            size: 8993,
            wordcount: 861,
            snippet:
              '&quot;<span class="searchmatch">React</span> Quotes&quot; is the fifth episode of the fifth season of the HBO original series, The Wire. The episode was written by David Mills from a story by David',
            timestamp: "2021-05-30T04:35:31Z",
          },
          {
            ns: 0,
            title: "React to That",
            pageid: 43361791,
            size: 9355,
            wordcount: 323,
            snippet:
              '<span class="searchmatch">React</span> to That (stylized as <span class="searchmatch">React</span>ToThat) is an American television series developed by Nick Cannon and Benny and Rafi Fine. It aired on Nickelodeon for',
            timestamp: "2021-07-03T21:26:24Z",
          },
        ],
      },
    },
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<List {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<List {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows two items in list", () => {
    const element = shallow(<List {...props} />);

    expect(element.find(".cards").length).toBe(3);
  });
});
