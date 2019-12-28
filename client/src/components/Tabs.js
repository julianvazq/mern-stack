import React, { useState } from 'react';
import ShoppingList from './lists/ShoppingList';
import ItemModal from './modals/ItemModal';
import AppointmentList from './lists/AppointmentList';
import AppointmentModal from './modals/AppointmentModal';
import MoodList from './lists/MoodList';
import MoodModal from './modals/MoodModal';

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
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [isMoodsOpen, setIsMoodsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
            Shopping
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
              <ItemModal />
              <ShoppingList />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId='2'>
          <Row>
            <Col sm='12'>
              <AppointmentModal />
              <AppointmentList />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId='3'>
          <Row>
            <Col sm='12'>
              <MoodModal />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
