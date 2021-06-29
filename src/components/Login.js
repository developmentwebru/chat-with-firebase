import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Context } from '../index'
import { useContext } from 'react';
import firebase from 'firebase/app';

const Login = () => {
    const { auth } = useContext(Context)          //получим объект для авторизации через хук useContext, через деструктуризацию потомучто остальное нам здесь на понадобится

    //создадим функцию которая будет вызываться при нажатии на кнопку
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider() //это у нас конструктор мы тут должны создать новый объект
        const { user } = await auth.signInWithPopup(provider)
                                                         //получим пользователя после того как мы авторизовались
    }


    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 50 }}
                alignItems={'center'}
                justify={'center'}
            >
                <Grid
                    style={{ width: 400, background: 'lightgray' }}
                    container
                    alignItems={'center'}
                    direction={'column'}
                >
                    <Box p={5}>
                        <Button onClick={login} variant={'outlined'} >Войти с помощью Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Login;
