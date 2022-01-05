import './Signup.css';
import React, { Component,Fragment } from 'react';
import axios from 'axios';

// redux
// import {connect} from 'react-redux';
// import * as registerAction from '../../store/action/register';

// UI
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Signup extends Component {
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
                email:{
                    elementType:'input',
                    elementConfig:{
                        placeholder:'Email',
                        type:'email'
                    },
                    value: '',
                    validation: {
                        required: true,
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
                password2:{
                    elementType:'password',
                    elementConfig:{
                        placeholder:'Confirm  Password',
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
        // console.log(this.state.loginForm,'Signup Login Form');
        // const data={
        //     username:'Anand7',
        //     password:'Anand@000',
        //     password2:'Anand@0002',
        //     email:'anandsingh@gmail.com'
        // };
        
        const data={
            username:this.state.loginForm.name.value,
            password:this.state.loginForm.password.value,
            password2:this.state.loginForm.password2.value,
            email:this.state.loginForm.email.value
        };

        console.log(data,'This is form value');
        // console.log(this.state.loginForm)
        axios.post('http://127.0.0.1:8000/api/account/register/',data)
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            console.log('>>>>>>>>>>>>>>>> Form Value')
            console.log(response.data);
        })
        .catch(error =>{
            console.log('>>>>>>>>>>>>> Form Error ')
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error)
        })
    }

    checkValidity(value, rules) {
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
               <h1>Signup</h1>
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
               <Button class="btn" btnType="submit">Signup</Button>
           </form>
           );

        return(
            <div className="login">
                {form}
            </div>
        );
    }
}

export default Signup;