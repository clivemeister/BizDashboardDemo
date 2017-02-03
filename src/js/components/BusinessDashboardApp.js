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
import Chart, {Axis,Base, Layers, Bar, Line} from 'grommet/components/chart/Chart';
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
      containers: 288,
      VMs: 72,
      serversUsed: 6,
      serversLive: 12,
      reqsPerSec: 960,
      msecs: 734,
      GHz: 2271,
      date: new Date(),
      perfHistory: [65,67,70,78,75,79,80,82,79,81,84,85,83,80,82,84],
      VMHistory: [50,55,56,73,58,68,90,87,79,86,63,56,67,80,65,66]
    };
    this.updateInfraForUserLoad( 12345 );
    console.log('user load in constructor ',this.state.reqsPerSec);
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(), 5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min+1))+min;
  }

  tick() {
    let newGHz = this.getRandomInt(2250,2299);
    this.setState({
      date: new Date(), GHz: newGHz
    });
    this.updateInfraForUserLoad( Math.max( 411, (this.state.reqsPerSec + this.getRandomInt(-40,+40)) ) );
    this.updatePerfHistory(this.state.msecs,this.state.VMs);
  }

  updateInfraForUserLoad(newReqCount) {
    let reqPerContainerPerSec = newReqCount / this.state.containers;
    let newMsecs = Math.floor( 1000 /(10 - reqPerContainerPerSec));
    console.log('newReqCount=',newReqCount,' reqPerContainerPerSec=',reqPerContainerPerSec,' newMsecs=',newMsecs);
    if (newMsecs <=0) {
      newMsecs = 5000;   //  if we go above 5000 msecs resonse, cap at that - we'll be dropping requests by this point IRL!
    }

    let newContainerCount = this.state.containers;
    if (newMsecs > 500) {  // add more containers if response time >500msecs
      newContainerCount += 10;
    } else if (newMsecs <300) {   // cut back on containers if response time <300msecs
      newContainerCount -= 10;
    }
    let newVMCount = Math.floor(newContainerCount / 4);   // scale the VMs to ensure we can run all the containers
    let newServerCount = Math.max(4,Math.floor(newVMCount / 15));  // scale the number of physical servers to number of VMs, with a minimum of 4
    newServerCount = Math.min(this.state.serversLive,newServerCount);   // no more than max number of servers
    this.setState( {reqsPerSec: newReqCount, containers: newContainerCount, VMs: newVMCount, serversUsed: newServerCount, msecs: newMsecs}
                 );
  }

  updatePerfHistory(currentResponseTime,currentVMcount) {
    let newPerfHistory = this.state.perfHistory;
    newPerfHistory.push(Math.min(Math.floor(currentResponseTime/50),100)); // add new indicator to end of list
    newPerfHistory.shift(); // take away the first element
    let newVMHistory = this.state.VMHistory;
    newVMHistory.push(math.min(currentVMcount,this.state.serversLive*15));
    newVMHistory.shift();
    this.setState( {perfHistory:newPerfHistory, VMHistory: newVMHistory} );
  }

  changeUsers(delta) {
    let newUserCount = this.state.reqsPerSec + delta;
    console.log('changeUsers by ',delta,' to ',newUserCount);
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
            <p>It is {this.state.date.toLocaleTimeString()}</p>
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
              <Value value={this.state.reqsPerSec} label='users' trendIcon={<LinkDown />} />
              online with latency
              <Value value={this.state.msecs} label='msecs' trendIcon={<LinkUp />} />
            </Paragraph>
            <Paragraph size="large">over the last 5 seconds</Paragraph>
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
                <Meter type='circle' size='small' label={<Value value={this.state.GHz} units='GHz'/>} value={this.state.GHz} max={2800} threshold={2600}/> Compute
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
                <Bar values={this.state.perfHistory}/>
                <Line values={this.state.VMHistory} colorIndex='accent-1'/>
              </Layers>
            </Chart>
          </Section>
        </Tiles>
      </Section>
    );
  }
};
