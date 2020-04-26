import React from 'react';
import Routes  from './components/Routes/Routes.js';
import {Provider} from 'react-redux';
import './App.css'
function App(props) {
  return (

    <Provider store={props.store}>
    
     <Routes/>
   

     </Provider>  
     
   
      
  )

}

export default App;
