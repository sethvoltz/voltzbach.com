import * as React from "react";
import { Route, Link } from 'react-router-dom';

export interface ActiveLinkProps {
  to: string,
  exact?: boolean
}

// State is never set so we use the 'undefined' type.
export class ActiveLink extends React.Component<ActiveLinkProps, undefined> {
  render() {
    return (
      <Route path={this.props.to} exact={this.props.exact} children={({ match }) => (
        <Link className={match ? 'active item' : 'item'} to={this.props.to}>
          {this.props.children}
        </Link>
      )} />
    );
  }
}
