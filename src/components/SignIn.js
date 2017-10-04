import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.signIn = this.signIn.bind(this);
        this.state={
            email:'',
            password:'',
            error:{
                message:''
            }
        }
    }
    signIn(){
        const{email,password} = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error=>{
                this.setState({error})
            })
    }
    render(){
        return(
            <div className="form-inline" style={{margin:'5%'}}>
                <h2>Sign In</h2>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="email"
                        type="text"
                        style={{marginRight:'5px'}}
                        onChange={event=>this.setState({email:event.target.value})}
                    />
                    <input
                        className="form-control"
                        placeholder="password"
                        type="password"
                        style={{marginRight:'5px'}}
                        onChange={event=>this.setState({password:event.target.value})}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={this.signIn}
                    >
                    Sign In
                    </button>
                    <div>{this.state.error.message}</div><br/>
                    <div><Link to={'/signup'}>Sign Up instead</Link></div>
                    <div><Link to={'/forgotPassword'}>Forgot Password?</Link></div>
                </div>
            </div>
        );
    }
}
export default SignIn;