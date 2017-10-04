import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Router, Route, browserHistory} from 'react-router';
import {firebaseApp} from './firebase';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {logUser} from './actions';
import reducer from './reducers/index';
import ForgotPassword from './components/ForgotPassword';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user=>{
    if(user) {
        const{email} = user;
        // console.log('user is logged in', user);
        store.dispatch(logUser(email));
        browserHistory.push('/app');
    }
    else {
        // console.log('user doesn\'t exist',user);
        browserHistory.push('/signin');
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path='/forgotPassword' component={ForgotPassword}/>
        </Router>
    </Provider>
    ,document.getElementById('root')
)