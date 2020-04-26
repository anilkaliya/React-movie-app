import React, { useState } from 'react'
import { Col, Card, Button, FormText, FormGroup, Label, Spinner, Form, Input } from 'reactstrap';
import './signup.css'
import {useHistory} from 'react-router-dom'

export default function Signup(props) {
    const history=useHistory()
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirm_password_Error, setConfirmPasswordError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate()
        if (!isValid) {
            return
        }
      props.onSignup(email, password);
      setEmail('');
        setPasword('');
      console.log(props.registered)
     
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasword(event.target.value)
    }
    const handleConfirmPasswordChange = event => {
        setConfirm_password(event.target.value)
    }

    const validate = () => {
        let emailError = '';
        let passwordError = '';
        let confirm_password_Error = '';
        if (!email) {
            setEmailError("Email is Required")

        }

        if (password.length < 6) {
            setPasswordError("Password should be of length six characters atleast")

        }
        if (password !== confirm_password) {
            setConfirmPasswordError('Password do not match please enter correct password!!')
        }

        if (emailError || passwordError || confirm_password_Error) {
            return false;
        }
        return true;
    }
    const redirect=()=>{
        if(props.registered){
            history.push("/login");
        }
    }
    const addSpinner = () => {
        if (props.isLoading) {
            return <Spinner className="loader" style={{ width: '8rem', height: '8rem' }} type="grow" />
        }
    }
    return (

        <Card body outline color="danger">
            {addSpinner()}
            {redirect()}
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="Email" sm={2}>Email</Label>
                    <Col sm={7}>
                        <Input type="email" name="email" id="Email" placeholder="Enter Email" onChange={handleEmailChange} />
                        <FormText>{emailError}</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Password</Label>
                    <Col sm={7}>
                        <Input type="password" name="password" id="password" placeholder="Enter Password" onChange={handlePasswordChange} />
                        <FormText>{passwordError}</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="confirm_password" sm={2}>Confirm Password</Label>
                    <Col sm={7}>
                        <Input type="password" name="confirm_password" id="confirm_password" placeholder="Enter same Password again" onChange={handleConfirmPasswordChange} />
                        <FormText>{confirm_password_Error}</FormText>
                    </Col>
                </FormGroup>
                <Button className="signup" color="secondary" type="submit">Signup</Button>
            </Form>
           
        </Card>


    )
}

