import React, { Component } from 'react';
//import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
//import List from 'grommet/components/List';
//import ListItem from 'grommet/components/ListItem';
import Meter from 'grommet/components/Meter';
//import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Value from 'grommet/components/Value';
//import Status from 'grommet/components/icons/Status';
import Section from 'grommet/components/Section';
import Chart, {Axis,Base, Layers, Bar} from 'grommet/components/chart/Chart';
//import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import LinkUp from 'grommet/components/icons/base/LinkUp';
import LinkDown from 'grommet/components/icons/base/LinkDown';
import Checkmark from 'grommet/components/icons/base/Checkmark';

export default class BusinessDashboardApp extends Component {

  constructor () {
    super();
    this.state = {
      tasks: [
        {
          status: 'critical',
          item: 'Pay my rent.'
        },
        {
          status: 'ok',
          item: 'Walk with my dog this morning.'
        },
        {
          status: 'warning',
          item: 'San Jose Earthquakes game is tomorrow.'
        },
        {
          status: 'ok',
          item: 'Review Pull Request #45.'
        }
      ]
    };
  }

  render () {

    return (
      <Section colorIndex='light-2'>
        <Section label="Status" textSize="large" pad="small">
          <Paragraph size="xlarge">Your overall system is Stable</Paragraph>
        </Section>
        <Tiles maxCount='3' size='medium' masonry='true'>
          <Section basis='1/3' align="center" pad="small" separator="top">
            <Heading tag="h3">Capacity</Heading>
            <Paragraph>
              <Value value='894' label='Hosts' trendIcon={<LinkUp />} /> of
              <Value value='1000' label='possible' trendIcon={<Checkmark/>} />
            </Paragraph>
            <Paragraph>
              <Value value='10423' label='VMs' trendIcon={<LinkUp />} /> of
              <Value value='13000' label='potential' trendIcon={<Checkmark/>} />
            </Paragraph>
          </Section>
          <Section basis='1/3' align="center" separator="top">
            <Heading tag="h3">Health</Heading>
            <Paragraph>
              <Value value='12' label='open alerts' trendIcon={<LinkDown />} />
              . . .
              <Value value='45' label='resolved' trendIcon={<LinkUp />} />
            </Paragraph>
            <Paragraph size="large">over the last 24 hours</Paragraph>
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
