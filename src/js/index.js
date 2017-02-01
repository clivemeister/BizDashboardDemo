import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import BusinessDashboardApp from './components/BusinessDashboardApp';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Box full={true}>
          <BusinessDashboardApp />
          <Footer primary={true} appCentered={true} direction="column"
            align="center" pad="small" colorIndex="blue">
            <p>
              Built using the HPE toolkit
              <Anchor href="http://grommet.io" target="_blank">Grommet</Anchor>!
            </p>
          </Footer>
        </Box>
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
