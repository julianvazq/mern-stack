import React, { useContext } from 'react';
import { ActiveTabContext } from '../contexts/ActiveTabContext';
import GroceryList from './lists/GroceryList';
import AppointmentList from './lists/AppointmentList';
import MoodList from './lists/MoodList';

import {
  TabContent,
  TabPane,
  Container,
  Nav,
  NavItem,
  NavLink,
  Button,
  Fade,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';

const Tabs = () => {
  const { activeTab, toggleTab } = useContext(ActiveTabContext);

  return (
    <Container
      style={{
        padding: '1.5em',
        backgroundColor: '#fdfdfd',
        borderRadius: '0.25rem',
        marginBottom: '3em'
      }}
    >
      <Nav tabs style={{ marginBottom: '1.5rem' }}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggleTab('1');
            }}
          >
            Groceries
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggleTab('2');
            }}
          >
            Appointments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggleTab('3');
            }}
          >
            Moods
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <Row>
            <Col sm='12'>
              <GroceryList />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId='2'>
          <Row>
            <Col sm='12'>
              <AppointmentList />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId='3'>
          <Row>
            <Col sm='12'>
              <MoodList />{' '}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Tabs;
