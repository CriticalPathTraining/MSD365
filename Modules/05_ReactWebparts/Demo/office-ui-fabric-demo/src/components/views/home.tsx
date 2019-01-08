import * as React from 'react';
import './home.scss';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <div id="home">
        <div className="ms-Grid" dir="ltr">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
              <h2>Heading 1</h2>
              <div className="heading-body">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
              <h2>Heading 2</h2>
              <div className="heading-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</div>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
              <h4>Column1</h4>
              <div className="heading-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
              <h4>Column2</h4>
              <div className="heading-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
              <h4>Column3</h4>
              <div className="heading-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
