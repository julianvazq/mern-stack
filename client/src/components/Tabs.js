import React, { useContext } from 'react';
import { ActiveTabContext } from '../contexts/ActiveTabContext';
import GroceryList from './grocery/GroceryList';
import AppointmentList from './appointments/AppointmentList';
import MoodList from './moods/MoodList';
import GoalList from './goals/GoalList';
import BookList from './books/BookList';
import MovieList from './movies/MovieList';

import {
  TabContent,
  TabPane,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';

const Tabs = () => {
  const { activeTab, toggleTab } = useContext(ActiveTabContext);

  return (
    <Container>
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
              className={classnames({
                active: activeTab === '1'
              })}
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
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                toggleTab('4');
              }}
            >
              Goals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => {
                toggleTab('5');
              }}
            >
              Books
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => {
                toggleTab('6');
              }}
            >
              Movies
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
                <MoodList />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='4'>
            <Row>
              <Col sm='12'>
                <GoalList />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='5'>
            <Row>
              <Col sm='12'>
                <BookList />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='6'>
            <Row>
              <Col sm='12'>
                <MovieList />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </Container>
  );
};

export default Tabs;
