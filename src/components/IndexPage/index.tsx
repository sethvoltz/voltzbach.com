import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom';

// State is never set so we use the 'undefined' type.
export class IndexPage extends React.Component<RouteComponentProps<any>, undefined> {
  render() {
    return (
      <div>
        <h1>Welcome Home!</h1>
      </div>
    );
  }
}
