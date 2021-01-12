# xia-react-router
use react-router like vue-router


# use in routes.js
### import Router from 'xia-react-router';
### 
### const routes = [
###     {
###         path: '/',
###         redirect: '/home'
###     },
###     {
###         path: '/home',
###         exact: true,                // default false
###         strict: true,               // default false
###         component: Home
###     },
###     {
###         path: '/welcome',
###         component: require('...'),  // load by need
###         children: [                 //  nested router
###             { ... }
###         ]
###     },
###     ...
###     {
###         path: '/*',                 // can not find any pages, path must be '/*'
###         redirect: '/home'
###     }
### ]
### 
### const router = new Router({
###     mode: 'hash',                   // hash or history, hash is default
###     routes,                         // routes must be Array
### })

### export default router;


# use in app.js
### import React from 'react';
### import Router from '...';
### 
### class App extends React.Component {
###     render () {
###         return <Router />
###     }
### }