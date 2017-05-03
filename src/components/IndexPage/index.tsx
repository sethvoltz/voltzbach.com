import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom';

import './index.scss';

// State is never set so we use the 'undefined' type.
export class IndexPage extends React.Component<RouteComponentProps<any>, undefined> {
  render() {
    return (
      <div className="page-home">
        <div className="hero">
          <div className="fancy-box">
            <h1 className="top-line">Seth &amp; Jamie</h1>
            <h2 className="second-line">get married</h2>
          </div>
        </div>
      </div>
    );
  }
}
