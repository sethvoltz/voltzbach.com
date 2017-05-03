import * as React from "react";
import { ActiveLink } from "../ActiveLink";

import './index.scss';

export interface NavigationProps { }

// State is never set so we use the 'undefined' type.
export class Navigation extends React.Component<NavigationProps, undefined> {
  render() {
    return (
      <ul className="navigation">
        <li><ActiveLink exact to="/">Home</ActiveLink></li>
        <li><ActiveLink exact to="/festivities">Festivities</ActiveLink></li>
        <li><ActiveLink exact to="/travel">Travel</ActiveLink></li>
        <li><ActiveLink exact to="/wedding-party">Wedding Party</ActiveLink></li>
        <li><ActiveLink exact to="/photos">Photos</ActiveLink></li>
        <li><ActiveLink exact to="/registry">Registry</ActiveLink></li>
        {/* <li><ActiveLink exact to="/rsvp">RSVP</ActiveLink></li> */}
      </ul>
    );
  }
}
