import React, { useContext } from 'react';
import { ActiveTabContext } from '../contexts/ActiveTabContext';
import ShoppingList from './lists/ShoppingList';
import AppointmentList from './lists/AppointmentList';
import MoodList from './lists/MoodList';

import {
  TabContent,
  TabPane,
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

  const style = { marginBottom: '2rem' };

  return (
    <div>
      <Nav tabs style={style}>
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
              <ShoppingList />
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
            <Col sm='12'></Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
