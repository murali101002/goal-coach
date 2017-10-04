import React, {Component} from 'react';
import '../App.css';
import {completeGoalRef, goalRef} from '../firebase';
import {connect} from 'react-redux';

class GoalItem extends Component{
    constructor(props){
        super(props);
        this.completeGoal = this.completeGoal.bind(this);
    }
    completeGoal(){
        const{email} = this.props.user;
        const{title, serverKey} = this.props.goal;
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email,title});
    }
    render(){
        const goal = this.props.goal;
        return(
            <div className='goal'>
                <strong>{goal.title.charAt(0).toUpperCase()+goal.title.slice(1)}:</strong>
                <span style={{marginRight:'5px'}}> submitted by <em>{goal.email}</em></span>
                <button
                    className='btn btn-sm btn-primary'
                    onClick={this.completeGoal}
                >
                Complete
                </button>
            </div>
        )
    }
}
function mapStateToProps(state){
    const{user} = state;
    return{
        user
    };
}

export default connect(mapStateToProps, null)(GoalItem);