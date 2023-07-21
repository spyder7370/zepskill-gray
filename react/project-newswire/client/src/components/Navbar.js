import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const NavbarComponent = () => {
	return (
		<React.Fragment>
			<Navbar className="yellotail">
				<LinkContainer to={'/'}>
					<Navbar.Brand>NewsWire</Navbar.Brand>
				</LinkContainer>
			</Navbar>
			<Nav className="mb-4">
				<Nav.Item>
					<LinkContainer to={'/'}>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
				</Nav.Item>
				<Nav.Item>
					<LinkContainer to={'/news/new'}>
						<Nav.Link>New News</Nav.Link>
					</LinkContainer>
				</Nav.Item>
				<Nav.Item>
					<LinkContainer to={'/contact'}>
						<Nav.Link>Contact</Nav.Link>
					</LinkContainer>
				</Nav.Item>
			</Nav>
		</React.Fragment>
	);
};

export default NavbarComponent;
