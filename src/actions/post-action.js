import axios from 'axios';
function beforeMovieRequest(){
    return {
        type:'BEFORE_MOVIE_REQUEST',
        payload:{
            isLoading:true,
            onError:''
        }
    }

}
function afterMovieRequest(){
    return{
        type: 'AFTER_MOVIE_REQUEST',
        payload:{
            isLoading:false,
            onError:''
        }
    }

}
function onError(err){
    return{
        type:'MOVIE_ERROR',
        payload:{
            isLoading:false,
            onError:err
        }
    }

}
export function getMovies(){
    return dispatch => {
        dispatch(beforeMovieRequest());

        axios.post(`http://localhost:3001/api/movies`).
            then(res => {
                console.log(res);
                dispatch(afterMovieRequest())
            }).
            catch(err => {
                console.log(err);
                dispatch(onError(err))
            })
           
    }
}