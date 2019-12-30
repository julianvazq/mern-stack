import React, { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const AppNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toogle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand tag={RRNavLink} to='/'>
            LifeTracker
          </NavbarBrand>
          <NavbarToggler onClick={toogle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to='/' exact activeClassName='active'>
                  Dashboard
                </NavLink>
              </NavItem>{' '}
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to='/tracker'
                  exact
                  activeClassName='active'
                >
                  Tracker
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/julianvazq/mern-stack'>
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
