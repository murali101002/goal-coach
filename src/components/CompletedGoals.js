import React, {Component} from 'react';
import {completeGoalRef} from '../firebase';
import {connect} from 'react-redux';
import {setCompletedGoals} from '../actions';
import './App';

class CompletedGoals extends Component{
    componentDidMount(){
        completeGoalRef.on('value',snap=>{
            let completedGoals = [];
            snap.forEach(goal=>{
                const{email, title} = goal.val();
                const serverKey = goal.key;
                completedGoals.push({email, title, serverKey});
            });
            this.props.setCompletedGoals(completedGoals);
        })
    }
    clearCompleted(){
        completeGoalRef.set([]);
    }
    clearThisCompletedGoal(goal){
        completeGoalRef.child(goal.serverKey).remove();
    }
    render(){
        return(
            <div>
                <hr/>
                <h4>Completed Goals</h4>
                 {
                     this.props.completeGoals.map((goal,index)=>
                        <div className='goal' key={index}>
                            <strong>{goal.title.charAt(0).toUpperCase()+goal.title.slice(1)}:</strong>
                            <span style={{marginRight:'5px'}}> completed by <em>{goal.email}</em></span>
                            <div 
                                onClick={()=>this.clearThisCompletedGoal(goal)}
                                className='cancelBtn'
                            >
                            X
                            </div>
                        </div>
                     )
                 }
                 <button
                    className='btn btn-warning'
                    onClick={()=>this.clearCompleted()}
                >
                Clear All
                </button>
                <hr/>
             </div>
        );
    }
}

function mapStateToProps(state){
    const{completeGoals} = state;
    return{
        completeGoals
    }
}

export default connect(mapStateToProps,{setCompletedGoals})(CompletedGoals);