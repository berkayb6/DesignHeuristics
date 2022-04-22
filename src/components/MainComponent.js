import React, { Component } from 'react';
import Start from './StartComponent';
import MoreInfo from './MoreInfoComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import YourWay from './SelectYourWayComponent';

class Main extends Component {
    constructor(props){
        super (props);
    }
    
    render (){

        const StartPage= ()=> {
            return (
                <div className='startpage' style = {{height:"100vh"}}>
                    <Start/>

                </div>
            );
        }
                
        const MoreInfos =() =>{
            return(
                <div className='startpage' style = {{height:"100vh"}}>
                    <MoreInfo/>
                </div>
            );
        }

        const SelectYourWay =()=> {
            return(
                <div className='startpage' style = {{height:"100vh"}}>
                    <YourWay/>
                </div>
            );

        }
        
        return (
            <div>
                {/**
                 * Defining the paths of pages and assigning the component to each path
                 * Redirect: If any given path does not exist, then it will redirect to start page.
                 */}
                <Switch>
                    <Route path='/start' component={StartPage}/>
                    <Route exact path='/moreinfo' component={MoreInfos}/>
                    <Route path='/selectyourway' component={SelectYourWay}/>
                    <Redirect to="/start" />
                </Switch>
            </div>
        )
            
                
    }

}
export default Main;