import * as React from 'react';
import * as AppImages from './../images/AppImages';
import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './App.scss';


import BeanCount from './BeanCounter'
import BeanCounter from './BeanCounter';

export default class App extends React.Component<any, any> {

  render(): JSX.Element {
    return (
      <div id="app-container" >
        <div id="banner-row" >
          <div id="banner" >
            <div>Demo 1 - My React App</div>
          </div>
        </div>
        <div id="content-body-row" >
          <div id="content-body">

            <BeanCounter startingCount={1} />

          </div>
        </div>
      </div>
    );
  }
}