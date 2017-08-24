import * as React from 'react';
import * as Raphael from 'raphael';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  size: number
}

export class Paper extends React.Component<Props> {
  private raphaelPaper: RaphaelPaper;
  private wrapper: HTMLElement;

  componentDidMount() {
    const { size } = this.props;
    this.raphaelPaper = Raphael(this.wrapper, size, size);
  }

  componentDidUpdate() {
    const { size } = this.props;
    this.raphaelPaper.setSize(size, size);
  }

  componentWillUnmount() {
    this.raphaelPaper.remove();
  }

  get paper() : RaphaelPaper | null {
    return this.raphaelPaper || null;
  }

  render() {
    return (
      <div ref={div => { if(div) this.wrapper = div; }}>
        {this.paper && React.Children.map(this.props.children,
          (child: React.ReactElement<React.ReactChild>) => React.cloneElement(child, {
            paper: this.paper
          })
        )}
      </div>
    );
  }
}