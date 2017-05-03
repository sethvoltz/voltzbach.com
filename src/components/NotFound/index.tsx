import * as React from "react";
import { Link } from 'react-router-dom';

export interface NotFoundProps {}

export class NotFound extends React.Component<NotFoundProps, undefined> {
  render() {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  }
}
