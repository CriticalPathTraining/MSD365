import * as React from 'react';

import './BeanCounter.scss';

export interface IBeanCounterProps {
  startingCount: number;
}
export interface IBeanCounterState {
  count: number;
}

export default class BeanCounter extends React.Component<IBeanCounterProps, IBeanCounterState> {

  public state = {
    count: this.props.startingCount
  }

  private addNewBean() {
    let newCount = (this.state.count + 1);
    this.setState({ count: newCount })
  }

  public render(): JSX.Element {
    return (
      <div id="bean-counter" >
        <div className="title">
          Ye Olde Bean Counter
      </div>
        <div className="toolbar">
          <button onClick={() => { this.addNewBean(); }} >Add Another Bean</button>
        </div>
        <div className="display">
          Current count of beans: {this.state.count}
        </div>
      </div>
    );
  }

}