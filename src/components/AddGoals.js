import React, {Component} from 'react';
import {goalRef} from '../firebase';
import {connect} from 'react-redux';

class AddGoals extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            errorMsg:''
        }
        this.addGoal = this.addGoal.bind(this);
    }
    addGoal = ()=>{
        if(this._text.value.trim()!==''){
            const {email} = this.props.user;
            const {title} = this.state;
            goalRef.push({email,title});
            this._text.value="";
        }else{
            this.setState({
                errorMsg:'Goal shouldn\'t be empty'
            })
        }
        
    }
    componentDidMount(){
        this._text.focus();
    }
    render(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <input  
                        type="text"
                        placeholder="Add a goal"
                        className="form-control"
                        style={{marginRight:'5px'}}
                        ref={input=>this._text=input}
                        onChange={event=>{
                                this.setState({title:event.target.value});
                                this.setState({errorMsg:''})
                            }
                        }
                    />
                    <button className="btn btn-success" onClick={this.addGoal}>
                        Add Goals
                    </button>
                    <div style={{color:'red',margin:'2px'}}>{this.state.errorMsg}</div>
                </div>
            </div>
        );
    }
}
function mapStoreToProps(state){
    const{user} = state;
    return {
        user
    };
}
export default connect(mapStoreToProps,null)(AddGoals);