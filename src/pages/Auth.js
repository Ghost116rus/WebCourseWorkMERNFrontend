
import { Container, Card, Form, Button} from 'react-bootstrap';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SEARCHOME_ROUTE, SHOP_ROUTE} from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {login, registration} from "../http/userAPI";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            if (isLogin)
            {
                data = await login(email, password);
            } else {
                data = await registration(email, password, name, phone, 1);
            }

            console.log(data.userRole);

            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.userRole);

            console.log(data)
            user.setIsAuth(true);

            navigate(SEARCHOME_ROUTE);
            window.location.reload();

        } catch (e) {
            alert(e.response.data.msg)
        }

    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    {isLogin ?
                        <Container>
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваш email...'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваш пароль...'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Container>
                        :
                        <Container>
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваше имя...'
                                onChange={e => setName(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваш номер телефона...'
                                onChange={e => setPhone(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваш email...'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите ваш пароль...'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Container>
                    }

                    <Container className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизуйся!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            { isLogin ? 'Войти' : 'Регистрация' }
                        </Button>
                    </Container>

                </Form>

            </Card>
        </Container>
    );
});

export default Auth;