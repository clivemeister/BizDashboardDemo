import React, { Component } from 'react';
//import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
//import List from 'grommet/components/List';
//import ListItem from 'grommet/components/ListItem';
import Meter from 'grommet/components/Meter';
import Menu from 'grommet/components/Menu';
import Value from 'grommet/components/Value';
//import Status from 'grommet/components/icons/Status';
import Section from 'grommet/components/Section';
import Chart, {Axis,Base, Layers, Bar} from 'grommet/components/chart/Chart';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';

import LinkUp from 'grommet/components/icons/base/LinkUp';
import LinkDown from 'grommet/components/icons/base/LinkDown';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Actions from 'grommet/components/icons/base/Actions';

export default class BusinessDashboardApp extends Component {

  constructor () {
    super();
    this.state = {
      containers: 946,
      VMs: 72,
      serversUsed: 16,
      serversLive: 24,
      usersOnline: 12345,
      msecs: 734
    };
    this.updateInfraForUserLoad( 12345 );
    console.log('user load in constructor ',this.state.usersOnline);
  }

  getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min+1))+min;
  }

  updateInfraForUserLoad(newUserCount) {
    let newContainerCount = Math.floor(newUserCount / this.getRandomInt(11,15));
    let newVMCount = Math.floor(newContainerCount / this.getRandomInt(11,15));
    this.setState( {usersOnline: newUserCount, containers: newContainerCount, VMs: newVMCount} );
  }

  changeUsers(delta) {
    console.log('changeUsers ',delta);
    let newUserCount = this.state.usersOnline + delta;
    this.updateInfraForUserLoad( newUserCount );
  }

  render () {
    let moreUsers = this.changeUsers.bind(this, this.getRandomInt(250,500));
    let lessUsers = this.changeUsers.bind(this, this.getRandomInt(-500,-250));
    console.log('rendering');

    return (
      <Section colorIndex='light-2'>
        <Section label="Status">
          <Header>
            <Title>Your overall system is Stable</Title>
            <Box flex={true} justify='end'
            direction='row'
            responsive={false}>
              <Menu icon={<Actions />} dropAlign={{"right": "right"}}>
                <Anchor icon={<LinkUp />} animateIcon={true} onClick={moreUsers} href='#' className='active'>More users</Anchor>
                <Anchor icon={<LinkDown />} animateIcon={true} onClick={lessUsers} href='#'>Less users</Anchor>
                <Anchor href='#'>Reset</Anchor>
              </Menu>
            </Box>
          </Header>
        </Section>
        <Tiles maxCount='3' size='medium' masonry='true'>
          <Section basis='1/3' align="center" pad="small" separator="top">
            <Heading tag="h3">Capacity</Heading>
            <Paragraph>
              <Value value={this.state.containers} label='Containers' trendIcon={<LinkUp />} /> on
              <Value value={this.state.VMs} label='VMs' trendIcon={<Checkmark/>} />
            </Paragraph>
            <Paragraph>
              <Value value={this.state.serversUsed} label='Servers' trendIcon={<LinkUp />} /> of
              <Value value={this.state.serversLive} label='live' trendIcon={<Checkmark/>} />
            </Paragraph>
          </Section>
          <Section basis='1/3' align="center" separator="top">
            <Heading tag="h3">Health</Heading>
            <Paragraph>
              <Value value={this.state.usersOnline} label='users' trendIcon={<LinkDown />} />
              online with latency
              <Value value={this.state.msecs} label='msecs' trendIcon={<LinkUp />} />
            </Paragraph>
            <Paragraph size="large">over the last 5 minutes</Paragraph>
          </Section>
          <Section basis='1/3' align="center" separator="top">
            <Heading tag="h3">Performance</Heading>
            <Meter type='spiral' size='small' activeIndex={2}
              series={[{"label": "24 hours", "value": 87},{"label":"3 hour", "value":78},{"label":"1 hour", "value":83}]}
            />
          </Section>
        </Tiles>
        <Tiles>
          <Section basis='1/2' align="center" separator="top">
            <Heading tag="h3">Resource Capacity</Heading>
            <Tiles>
              <Tile>
                <Meter type='circle' size='small' label={<Value value={2273} units='GHz'/>} value={2278} max={2800} threshold={2600}/> Compute
              </Tile>
              <Tile>
                <Meter type='circle' size='small' label={<Value value={978} units='GB'/>} value={978} max={1200} threshold={1050}/> Memory
              </Tile>
              <Tile>
                <Meter type='circle' size='small' label={<Value value={1168} units='TB'/>} value={1168} max={1600} threshold={1400}/> Disk
              </Tile>
            </Tiles>
          </Section>
          <Section basis='1/2' align="center" separator="top">
            <Heading tag="h3">Performance History</Heading>
            <Chart>
              <Axis vertical={true} count={3} ticks={true} labels={[{label: "0%", index:0},{label:'50%',index:1},{label:"100%",index:2}]}/>
              <Base height='medium' width='medium'/>
              <Layers>
                <Bar values={[70,78,75,79,80,82,79,81,84,85,83,80,82,84]}/>
              </Layers>
            </Chart>
          </Section>
        </Tiles>
      </Section>
    );
  }
};
