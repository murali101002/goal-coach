import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {connect} from 'react-redux';
import AddGoals from './AddGoals';
import GoalsList from './GoalsList';
import CompletedGoals from './CompletedGoals';

class App extends Component{
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        firebaseApp.auth().signOut();
    }
    render(){
        return(
            <div style={{marginLeft:'5%'}}>
                <h3>Goal Coach</h3>
                <AddGoals />
                <GoalsList />
                <CompletedGoals />
                <button
                    className="btn btn-danger"
                    onClick={this.signOut}
                >
                Sign Out
                </button>
            </div>
        );
    }
}
function mapStateToProps(state){
    // const{goals, completeGoals} = state;
    return {
    }
}
export default connect(mapStateToProps,null)(App);