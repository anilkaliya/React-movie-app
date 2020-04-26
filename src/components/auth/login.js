import React, {  useState } from 'react'
import { Col, Card, Button, FormText, FormGroup, Label, Spinner, Form, Input } from 'reactstrap';
import './signup.css'
import { useHistory } from 'react-router-dom';
// import {withRouter} from 'react-router-dom'


  export default function Login(props) {
   const history=useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate()
        if (!isValid) {
            return
        }
        props.onLogin(email, password);
        setEmail('');
        setPassword('');
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePassswordChange = (event) => {
        setPassword(event.target.value)
    }

    const validate = () => {
        if (!email) {
            setEmailError("Email is Required")

        }
        if (password.length < 6) {
            setPasswordError("Password should be of length six characters atleast")

        }
        if (emailError || passwordError) {

            return false;
        }
        return true;
    }
  const redirect=()=>{
    if(props.userData.isAuthenticated){
        localStorage.setItem('user',email)
        history.push('/');

    }
  }
      
   
   const addSpinner = () => {
        if (props.isLoading) {
            return <Spinner className="loader" style={{ width: '8rem', height: '8rem' }} type="grow" />
        }
    }

    // render() {

    return (


        <Card body outline color="primary" >
            {addSpinner()}
            {redirect()}
            <h5><strong>Login to Blog App</strong></h5>

            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="Email" sm={2}>Email</Label>
                    <Col sm={7}>
                        <Input type="email" name="email"  value={email} id="Email" placeholder="Enter Email" onChange={handleEmailChange} />
                        <FormText>{emailError}</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Password</Label>
                    <Col sm={7}>
                        <Input type="password" name="password" value={password} id="password" placeholder="Enter Password" onChange={handlePassswordChange} />
                        <FormText>{passwordError}</FormText>
                    </Col>
                </FormGroup>

                <Button className="login" color="secondary" type="submit">Login</Button>
            </Form>

        </Card>


    )
}

