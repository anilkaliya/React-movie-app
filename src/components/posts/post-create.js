import React, { Component } from 'react'
import axios from 'axios'
import { Col, Card, Button, FormText, FormGroup, Label, Spinner, Form, Input } from 'reactstrap';
import './post-create.css'
import {withRouter} from 'react-router-dom'



 class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            title: '',
            overview: '',
            isLoading: false,
            type:''
        }
                this.id=null;
    }

    componentDidMount(){
        if(this.props.location.state ){
    const {id}=this.props.location.state;
    this.id=id;
    if(id){
        axios.get('/api/posts/'+id).
        then(res=>{
            console.log(res)
            this.setState({
                file:new Blob([res.data.imagePath]),
                title:res.data.title,
                overview:res.data.content
            })
        })
    }
}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.set('title', this.state.title);
        formData.set('content', this.state.overview);
        formData.append("image", this.state.file, this.state.title)
        this.setState({
            isLoading: true,
  
        })
        if(this.id){

            formData.set('id',this.id)
            axios.put('/api/posts/' + this.id, formData)
            .then(res => {
                this.setState({
                    isLoading: false
                 })
                      }).
            catch(err => {
                console.log(err);
            })
        }
        else{
        axios.post('/api/posts', formData, 
        { headers: { 'Content-Type': this.state.type } })
            .then(res => {
                this.setState({
                    isLoading: false
                 })
                      }).
            catch(err => {
                console.log(err);
            })
        }
   this.props.history.push("/");

    }
    handleInput = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    onFileChange = (event) => {
        const reader = new FileReader();
        let image = event.target.files[0];
        this.setState({
            type: image.type
        })
        console.log(image.type);;
        reader.addEventListener("loadend", function () {
            image = reader.result
        });
        reader.readAsText(image);
       
        this.setState({
            file: image
        })


    }

    render() { 
   

        return (

            <Card  body outline color="secondary">
                <Form onSubmit={this.handleSubmit}>

                    <FormGroup row>
                        <Label for="title" sm={2}>Title</Label>
                        <Col sm={7}>
                            <Input type="textarea" name="title" id="title" value={this.state.title} onChange={this.handleInput} />
                            <FormText></FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="overview" sm={2}>OverView</Label>
                        <Col sm={7}>
                            <Input type="textarea" name="overview" id="title" value={this.state.overview} onChange={this.handleInput} />
                            <FormText></FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        
                        <Col sm={7}>
                            <Input type="file" name="file" id="image"  onChange={this.onFileChange} accept='image/jpeg,image/jpg,image/png' />
                            <FormText color="muted">
                            </FormText>
                        </Col>
                    </FormGroup>
                    {/* <Input type="file" name="file" id="image" ref={this.fileInput}  /> */}

                    <Button  color="secondary" type="submit">Submit Details</Button>
                </Form>
            </Card>
        )
    }
}

export default withRouter(PostCreate);
