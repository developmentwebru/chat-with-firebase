import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react'
import { Context } from '../index'

const AppRouter = () => {
    //роутинг страницы чата или логина пользуемся созданием переменных, чтобы избежать ошибок, которые здесь импортируем.
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth) //хук из модуля react-firebase-hooks

    return user ?
        (
            <Switch>
                {privateRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact={true} />
                )}
                <Redirect to={CHAT_ROUTE} />
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact={true} />
                )}
                <Redirect to={LOGIN_ROUTE} />
            </Switch>
        )
}

export default AppRouter
