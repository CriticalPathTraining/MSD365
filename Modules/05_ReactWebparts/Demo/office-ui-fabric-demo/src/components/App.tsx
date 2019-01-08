import * as React from 'react';
import * as AppImages from './../images/AppImages';

import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons(/* optional base url */);

import './App.scss';

import { Link, Route, Switch, withRouter } from 'react-router-dom';

import { Nav } from 'office-ui-fabric-react/lib/Nav';

import TopNav from './TopNav'

import Home from './views/home';
import View1 from './views/view1';
import View2 from './views/view2';
import View3 from './views/view3';
import View4 from './views/view4';

const navLinkGroups = [
  {
    name: 'Fabric Core',
    links: [
      {
        key: 'home',
        name: 'Home',
        url: 'javascript:void(0)',
        icon: 'Lightbulb'
      }
    ]
  },
  {
    name: 'Fabric React',

    links: [
      {
        key: 'View1',
        name: 'View 1',
        url: 'javascript:void(0)',
        icon: 'Wines'
      },
      {
        key: 'View2',
        name: 'View 2',
        url: 'javascript:void(0)',
        icon: 'Vacation'
      },
      {
        key: 'View3',
        name: 'View 3',
        url: 'javascript:void(0)',
        icon: 'Running'
      }
    ]
  }
];


class App extends React.Component<any, any> {

  render(): JSX.Element {
    return (
      <div id="app-container" >
        <div id="banner-row" >
          <div id="banner" >
            <div>Office UI Fabric React Demo</div>
          </div>
        </div>
        <div id="content-body-row" >
          <div id="leftnav" >
            <Nav groups={navLinkGroups}
              onLinkClick={(event: any, link: any) => {
                let path: string = "./" + link.key
                this.props.history.push(path);
              }}
            />
          </div>
          <div id="content-body">
            <Switch>
              <Route path="/view1" component={View1} />
              <Route path="/view2" component={View2} />
              <Route path="/view3" component={View3} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(App);