import React ,{Suspense,lazy} from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import PostList from '../posts/post-list';
import PostCreate from '../posts/post-create';
import {Spinner} from 'reactstrap'
import Navigate from '../auth/nav.js'
import './Routes.css'
const Login = lazy(() => import('../../containers/login-container'));
const  Signup=lazy(()=>import('../../containers/signup-container')) 




export default function Routes() {
    return (
        
            <Router>
             
              <Navigate></Navigate>
           
            <Switch >
            <Route  exact path="/" component={PostList}/> 
            <Route path="/create" component={PostCreate} />
            <Route path="/edit" component={PostCreate} />
             <Suspense  className="container" fallback=
            {<Spinner className="loader" style={{ width: '8rem', height: '8rem' }} type="grow" />}>
            <Route path='/login' component={Login}/> 
          <Route path='/signup' component={Signup}/> 
         </Suspense> 
         </Switch>
           </Router>
      
           
       
    )
}
