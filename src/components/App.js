import React from 'react';
import { Route, Link } from 'react-router-dom';
import loadable from "@loadable/component";

const About = loadable(() => import("./About"));

const Index = () => <h2>Home</h2>;
const Users = () => <h2>Users</h2>;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Home',
    };
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">{ title }</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    );
  }
}
