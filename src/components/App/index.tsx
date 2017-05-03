import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';

import { Navigation } from "../Navigation";
import { IndexPage } from "../IndexPage";
import { MarkdownPage } from "../MarkdownPage";
import { RSVP } from "../RSVP";

export interface AppProps {}

export class App extends React.Component<AppProps, undefined> {
  componentDidMount() {
    document.title = "Voltzbach Wedding";
  }

  render() {
    const supportsHistory = 'pushState' in window.history;

    return <div className='app'>
      <Router forceRefresh={!supportsHistory}>
        <div>
          <Navigation />
          <Switch>
            <div className="content">
              <Route exact={true} path="/" component={IndexPage} />
              {/* <Route path="/rsvp" component={RSVP} /> */}
              <Route path="/:page" component={MarkdownPage} />
            </div>
          </Switch>
        </div>
      </Router>
    </div>;
  }
}

