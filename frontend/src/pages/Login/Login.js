import './Login.css';
import React, { Component,Fragment } from 'react';
import axios from 'axios';

// redux
// import {connect} from 'react-redux';
// import * as registerAction from '../../store/action/register';

// UI
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loginForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        placeholder:'Username',
                        type:'text'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                    },
                    valid: false,
                    touched: false
                },
                password:{
                    elementType:'password',
                    elementConfig:{
                        placeholder:'Password',
                        type:'password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                    },
                    valid: false,
                    touched: false
                },
            },
            formIsValid: false,
        }
    }

    // componentDidMount () {

    // }

    loginFormHandler=(event)=>{
        event.preventDefault()
        // const details={
        //     username:'anand',
        //     password:'anand'
        // };

        const data={
            username:this.state.loginForm.name.value,
            password:this.state.loginForm.password.value
        };

        console.log(data,'This is form value');
        console.log(this.state.loginForm)
        axios.post('http://127.0.0.1:8000/api/account/login/',data)
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            console.log('>>>>>>>>>>>>>>>> Form Value')
            console.log(response.data);
        })
        .catch(error =>{
            console.log('>>>>>>>>>>>>> Form Error ')
            console.log(error)
        })

        axios.post('http://127.0.0.1:8000/api/token/',data)
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            console.log('>>>>>>>>>>>>>>>> Form Token')
            console.log(response.data);
            sessionStorage.setItem('data',JSON.stringify(response.data));
        })
        .catch(error =>{
            console.log('>>>>>>>>>>>>> Form Error ')
            console.log(error)
        })
    }

    checkValidity=(value, rules)=> {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }
    
    inputChangeHandler=(event,Identifier)=>{

        const updatedLoginForm={...this.state.loginForm};
        const updatedFormElement={...this.state.loginForm[Identifier]};
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedLoginForm[Identifier]=updatedFormElement;

        let formIsValid=true;
        for(let Identifier in updatedLoginForm){
            formIsValid=updatedLoginForm[Identifier].valid && formIsValid;
        }

        this.setState({
            loginForm:updatedLoginForm,
            formIsValid:formIsValid
        });
    }

    render(){

        const FormElemntArray=[];
        for(let key in this.state.loginForm){
            FormElemntArray.push({
                id:key,
                config:this.state.loginForm[key]
            });
        }
   
       const form=(
           <form onSubmit={this.loginFormHandler} className="login_form">
               <h1>Login</h1>
               {
                   FormElemntArray.map(FormElement => (
                       <Input
                           key={FormElement.id}
                           elementType={FormElement.config.elementType}
                           elementConfig={FormElement.config.elementConfig}
                           value={FormElement.config.value}
                           touched={FormElement.config.touched}
                           shouldValidate={FormElement.config.validation}
                           change={(event)=>this.inputChangeHandler(event,FormElement.id)}
                           invalid={!FormElement.config.valid}
                       />))
               }
               <Button class="btn" btnType="submit" name='Login'/>
           </form>
           );

        return(
            <div className="login">
                {form}
            </div>
        );
    }
}

// here state given by redux which provided in reducer
// we use this.props.[state value] eg. this.props.loginDetails instead of this.state.[value] eg. this.state.loginDetails
// const mapStateToProps = state =>{
//     return{
//         loginForm: state.loginForm,
//         errorloginError: state.loginError,
//         formIsValid:state.formIsValid
//     }
// }

// here dispatch action by importing file of action
// use dispatch function eg. Login in above class as this.props.Login() from where we want to dispatch action 
// const mapDispatchToProps = dispatch=>{
// return{
//     login:()=>{ dispatch(registerAction.initLogin())}
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Login);
export default Login;