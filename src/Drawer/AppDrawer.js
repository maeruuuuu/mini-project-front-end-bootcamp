import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Home from '../Component/Home'
import List from '../Component/List'


export default function AppDrawer() {
    return (
        <div>
            <Router>
            <Navbar collapseOnSelect expandable variant="dark">
            <Container>
            <Navbar.Brand>MovieNal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/list">
                    <Nav.Link>Watchlist</Nav.Link>
                </LinkContainer>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/list">
                    <List />
                </Route>
            </Switch>
            </Router>
            <div className='footer'>Copyright 2021</div>
        </div>

    )
}
