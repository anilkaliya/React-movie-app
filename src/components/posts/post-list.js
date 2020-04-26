import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './post-list.css'
import { Card, CardLink, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';

const initial=[];

 function PostList(props) {
    const history=useHistory()
   
    const [movieArray, setMovieArray]=useState(initial)
    useEffect(()=>{
        console.log("updated");
        axios.get(`http://localhost:3001/api/posts`).
                then(res => {
                    if (res.data.posts) {
                        setMovieArray(res.data.posts)
                        
                    }
                  
                })
    },[])

    const Delete = (id) => {
        this.onDelete(id)
    }
    const onDelete = (id) => {
        axios.delete('http://localhost:3001/api/posts/' + id).
            then(res => {
                   history.push('/')
            }).
            catch(err =>
                console.log(err)
            )

            }
        return (
            movieArray.map(movie => {
                return <Card >
                    <CardBody>
                        <div className="one-movie">
                            <div className="title">
                                <strong>{movie.title}</strong>
                            </div>
                            <div className="post-image">
                                <img src={'data:image/png;base64,' + movie.imagePath} alt="movie.original_title" />
                            </div>
                            <div className="overview">
                                {movie.content}
                            </div>
                            <CardLink >{(props.isAuthenticated && movie.creator===localStorage.getItem('user_id') )&& <Link to={{
                                pathname: '/edit',
                                state: {
                                    id: movie._id
                                }
                            }}> Edit</Link>
                             } </CardLink>
                        <CardLink>{ (props.isAuthenticated && movie.creator===localStorage.getItem('user_id') )&&
                        <button style={{ backgroundColor: "red" }} 
                        onClick={() => Delete(movie._id)}>Delete</button>}</CardLink>
                        </div >
                    </CardBody>
                </Card >
            })
        )
    }

const mapStateToPorps=state=>{
    return{
    isAuthenticated:state.userData.isAuthenticated
    }
}

export default connect(mapStateToPorps)(PostList);