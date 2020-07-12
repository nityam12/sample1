import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import "./App.css";

import list from "./data";
import Register from "./components/register/register.component";
import { CardList } from "./components/card-list/card-list.component.jsx";
import { SearchBox } from "./components/search-box/search-box.component.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      searchField: "",
      title: "",
    };

    // this.handleChange = this.handleChange.bind(this); //impt to work for this
  }

  //life-cycle mtd
  componentDidMount() {
    //it return promise
    // fetch(
    //   "https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll"
    // )
    //   .then((response) => response.json())
    //   .then((listAll) => this.setState({ list: listAll }))
    //   .catch((err) => console.log(err));

    this.setState({ list: list });
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value, title: e.target.value });
  };

  render() {
    const { list, searchField, title } = this.state;

    list.sort((a, b) => {
      if (a.status === "active" && b.status === "active") {
        return 0;
      }

      if (a.status === "active" && b.status === "active") {
        return -1;
      }

      if (a.status === "active" && b.status !== "active") {
        return -1;
      }
      return 1;
    });

    list.sort((a, b) => {
      if (a.status === "active" || b.status === "active") {
        return 0;
      }
      if (a.status === "left" && b.status === "onboarded") {
        return -1;
      }
      return 1;
    });

    for (let i = 0; i <= 2; i++) {
      list.sort(function (a, b) {
        if (a.status === b.status) {
          a = a.date.split("/");
          b = b.date.split("/");
          return a[i] < b[i] ? -1 : a[i] > b[i] ? 1 : 0;
        } else return 0;
      });
    }

    const filteredusers = list.filter((user) =>
      user.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <Link to="/register">Click here to Register</Link>

        <h1>{title}</h1>
        <SearchBox
          placeholder="search users"
          handleChange={this.handleChange}
        />

        <CardList users={filteredusers}></CardList>
        
        <Switch>
          <Route path="/register/" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
