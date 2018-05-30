import React from 'react';
import MainPage from './MainPage'
import NotesController from './Notes/NotesController'
import BooksController from './Books/BooksController'
import DocumentsController from './Documents/DocumentsController'
import UserProfile from './UserProfile'
import {Route, Redirect} from 'react-router'

export const RouteWithSubRoutes = props => {
    return <Route
        path={props.route.path}
        render={() => (
            props.isAuthenticated ?
                <props.route.component routes={props.route.routes}/>
                : <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />

        )}
    />
}

export const routes = [
    {
        path: '/',
        component: MainPage,
        exact: true,
        routes: [
            {
                path: '/profile',
                component: UserProfile
            },
            {
                path: "/notes",
                component: NotesController
            },
            {
                path: "/books",
                component: BooksController
            },
            {
                path: '/documents',
                component: DocumentsController
            },
            {
                path: '/images',
                component: () => <DocumentsController imagesMode={true}/>
            }
        ]
    },
]