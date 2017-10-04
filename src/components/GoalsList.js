import React, {Component} from 'react';
import {goalRef} from '../firebase'; 
import {setGoals} from '../actions';
import {connect} from 'react-redux';
import GoalItem from './GoalItem'
class GoalsList extends Component{
    componentDidMount(){
        goalRef.on('value', snap=>{
            let goals = [];
            snap.forEach(goal=>{
                let {email, title} = goal.val();
                let serverKey = goal.key;
                goals.push({email, title, serverKey});
            });
            this.props.setGoals(goals);
        })
    }
    render(){
        return(
            <div>
                <hr/>
                <h4>Goals</h4>
                {
                    this.props.goals.map((goal,index)=>
                        <GoalItem key={index} goal={goal} />
                    )
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    const{goals} = state;
    return {
        goals
    }
}
export default connect(mapStateToProps, {setGoals})(GoalsList);