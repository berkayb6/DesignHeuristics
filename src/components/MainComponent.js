import React, { Component } from 'react';
import Start from './StartComponent';
import MoreInfo from './MoreInfoComponent';
import Login from './LoginPageComponent';
import YourWay from './SelectYourWayComponent';
import YourMode from './SelectYourMode';
import DHCollection from './DesignHeuristicCollectionComponent';
import AddHeuristic from './AddHeuristicComponent';
import { HEURISTICS } from '../shared/heuristics';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super (props);
        this.state={
            heuristics: HEURISTICS
        };
    }
    
    render (){

        const StartPage= ()=> {
            return (
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Start/>

                </div>
            );
        }
                
        const MoreInfos =() =>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <MoreInfo/>
                </div>
            );
        }

        const SelectYourWay =()=> {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <YourWay/>
                </div>
            );
        }
        const SelectYourMode =()=> {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <YourMode/>
                </div>
            );
        }

        const LoginPage =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Login/>
                </div>
            )
        }

        const DesignHeuristicCollection =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <DHCollection heuristics={this.state.heuristics}/>
                </div>
            )
        }

        const AddYourOwnHeuristic =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <AddHeuristic/>
                </div>
            )
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
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/selectyourmode' component={SelectYourMode}/>
                    <Route path='/design-heuristic-collection' component={DesignHeuristicCollection}/>
                    <Route path='/add-your-own-heuristic' component={AddYourOwnHeuristic}/>
                    <Redirect to="/start" />
                </Switch>
            </div>
        )
            
                
    }

}
export default Main;