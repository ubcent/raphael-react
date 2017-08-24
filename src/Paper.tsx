import * as React from 'react';
import * as Raphael from 'raphael';

import { Props as Element } from './Element';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  size: number
}

export class Paper extends React.Component<Props> {
  private raphaelPaper: RaphaelPaper;
  private wrapper: HTMLElement;

  componentDidMount(): void {
    const { size } = this.props;
    this.raphaelPaper = Raphael(this.wrapper, size, size);
  }

  componentDidUpdate(): void {
    const { size } = this.props;
    this.raphaelPaper.setSize(size, size);
  }

  componentWillUnmount(): void {
    this.raphaelPaper.remove();
  }

  get paper() : RaphaelPaper | null {
    return this.raphaelPaper || null;
  }

  render() {
    return (
      <div ref={div => { if(div) this.wrapper = div; }}>
        {this.paper && React.Children.map(this.props.children,
          (child: React.ReactElement<Element>) => React.cloneElement(child, {
            paper: this.paper
          })
        )}
      </div>
    );
  }
}