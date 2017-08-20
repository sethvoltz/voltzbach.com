import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom';

import { NotFound } from "../NotFound";

import * as front from 'front-matter';
import * as Markdown from 'react-remarkable';

import './index.scss';

export interface IMarkdownPageProps extends RouteComponentProps<any> {
  page?: string
}

export interface IMarkdownPageState {
  page?: string,
  found: boolean,
  body?: string,
  attributes: object,
}

export class MarkdownPage extends React.Component<IMarkdownPageProps, IMarkdownPageState> {
  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {
      found: true,
      attributes: {},
    };
  }

  componentDidMount() {
    this._loadData();
  }

  componentDidUpdate() {
    if (this.state.page !== this.props.page) {
      this._loadData();
    }
  }

  render() {
    const { body, attributes, found } = this.state
    const markdownOptions = {
      html: true
    }

    return <div className="content">
      {found ? (body ? <Markdown source={body} options={markdownOptions} /> : <div>Loading...</div>) : <NotFound />}
    </div>;
  }

  _loadData() {
    fetch(`/content/${this.props.page}.md`)
      .then(res => {
        if (res.status === 404) {
          throw new Error('No Content');
        }

        var contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("text/html") !== -1) {
          throw new Error('Incorrect file format');
        }

        return res.text();
      })
      .then(content => front(content))
      .then(parsed => {
        this.setState({
          ...this.state,
          found: true,
          attributes: parsed.attributes,
          body: parsed.body,
          page: this.props.page
        });
      })
      .catch(error => {
        this.setState({
          found: false,
          page: this.props.page,
        });
      });
  }
}
