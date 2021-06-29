import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react'
import { Context } from '../index'

function Navbar() {
    //здесь данные нужны для отображения кнопки Логин или Выйти, поэтому таже их получаем через useContext 
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth) //хук из модуля react-firebase-hooks

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container justify={'flex-end'}>
                    {user ?
                        <Button
                            variant={'outlined'}
                            onClick={() => auth.signOut()}
                        >
                            Выйти
                        </Button>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={'outlined'}>
                                Логин
                            </Button>
                        </NavLink>

                    }


                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
