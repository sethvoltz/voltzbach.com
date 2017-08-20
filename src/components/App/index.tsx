import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';

import { ScrollToTop } from "../ScrollToTop";
import { Navigation } from "../Navigation";
import { IndexPage } from "../IndexPage";
import { MarkdownPage } from "../MarkdownPage";
// import { RSVP } from "../RSVP";

export interface AppProps {}

const CONTENT_PAGES = [
  "festivities",
  "inspiration",
  "registry",
  "travel",
  "wedding-party"
];

export class App extends React.Component<AppProps, undefined> {
  componentDidMount() {
    document.title = "Voltzbach Wedding";
  }

  render() {
    const supportsHistory = 'pushState' in window.history;

    return <div className='app'>
      <Router forceRefresh={!supportsHistory}>
        <div className='app-inner'>
          <ScrollToTop />
          <Navigation />
          <Switch>
            <div className="main">
              <Route exact={true} path="/" component={IndexPage} />
              {/* <Route path="/rsvp" component={RSVP} /> */}
              {CONTENT_PAGES.map(page => {
                return <Route path={'/'+page} component={props => <MarkdownPage {...props} page={page} />} />
              })}
            </div>
          </Switch>
        </div>
      </Router>
    </div>;
  }
}

