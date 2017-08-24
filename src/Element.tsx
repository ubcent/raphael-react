import * as React from 'react';

export interface Props extends React.HTMLProps<RaphaelElement> {
  paper: RaphaelPaper
}

export class Element extends React.Component<Props> {
  componentWillMount(): void {
    console.log("parent:", this.props.paper);
  }

  render() {
    return null;
  }
}
