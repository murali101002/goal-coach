import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.state={
            email:'',
            errorMsg:'',
            divClass:''
        }
    }
    forgotPassword(){
        var context = this;
        firebaseApp.auth().sendPasswordResetEmail(context.state.email)
            .then(function() {
            context.setState({errorMsg:`An email has been sent to reset your password.`, divClass:'alert alert-success'})
          })
          .catch(function(err) {
            context.setState({errorMsg:err.message, divClass:'alert alert-danger'});
          });
          
    }
    render(){
        return(
            <div>
                <div className="form-group" style={{margin:'5%'}}>
                    <input
                        className="form-control"
                        placeholder="email"
                        type="text"
                        style={{marginRight:'5px'}}
                        onChange={event=>this.setState({email:event.target.value})}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={this.forgotPassword}
                    >
                    Submit
                    </button>
                    <div className={this.state.divClass}>{this.state.errorMsg}</div>
                    <div><Link to={'/signin'}>Sign In</Link></div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;