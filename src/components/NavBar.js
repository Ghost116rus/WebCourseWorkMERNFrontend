import React, { useContext } from 'react';
import { Context } from '..';
import {NavLink, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import eye from '../assets/eye.png'

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);

        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Container>
                    <Navbar.Brand href={SHOP_ROUTE}>
                        <img
                        alt=""
                        src={eye}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Просвещеникус
                    </Navbar.Brand>
                    <NavLink style={{color:'white',textDecoration: 'none'}} to={SHOP_ROUTE}>Книги</NavLink>
                </Container>
                <Container className="d-flex justify-content-between">
                    <Form className="d-flex w-50">
                        <Form.Control
                            type="search"
                            placeholder="Поиск книги"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">Поиск</Button>
                    </Form>
                    {user.isAuth ?
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant= {"outline-light"} >Админ панель</Button>
                            <Button variant= {"outline-light"} className="mr-10" onClick={() => logOut()}>Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                        </Nav>
                    }
                </Container>
            </Container>
      </Navbar>

    );
});

export default NavBar