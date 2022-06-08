import React, { Component } from 'react';
import Start from './StartComponent';
import MoreInfo from './MoreInfoComponent';
import Login from './LoginPageComponent';
import Register from './RegisterComponent';
import Profile from './ProfileComponent';
import RegisterCompleted from './RegisterCompletedComponent';
import YourWay from './SelectYourWayComponent';
import YourMode from './SelectYourMode';
import DHCollection from './DesignHeuristicCollectionComponent';
import AddHeuristic from './AddHeuristicComponent'
import Search from './SearchComponent';
import ForgotPassword from './ForgotPasswordComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchHeuristics, fetchComments, register, fetchUsers } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

/** Data will come from the server. Users will be deleted afterwards, when the backend is deployed.*/
const mapStateToProps = state => {
    return {
        heuristics: state.heuristics,
        comments: state.comments,
        users: state.users
    }
}

/** fetch functions get the downloaded data from server and dispatch it to browser.
 *  postComment and register functions take the input from browser and dispatch it to server.
 */
const mapDispatchToProps = (dispatch) => ({
    postComment: (heuristicId, author, comment) => dispatch(postComment(heuristicId, author, comment)),
    register: (email, password, subscription, library, yourHeuristics, projects) => dispatch(register(email, password, subscription, library, yourHeuristics, projects)),
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchHeuristics: () => {dispatch(fetchHeuristics())},
    fetchComments: () => {dispatch(fetchComments())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))} //
})

class Main extends Component {
    constructor(props){
        super (props);
        
    }
    /** After the work has been loaded to browser, the corresponding data will be fetched. */
    componentDidMount(){
        this.props.fetchHeuristics();
        this.props.fetchComments();
        this.props.fetchUsers();
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
                    <Login users= {this.props.users}/>
                </div>
            )
        }

        const RegisterPage =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Register users= {this.props.users.users}
                        register= {this.props.register}/>
                </div>
            )
        }
        const RegisterCompletedPage =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <RegisterCompleted/>
                </div>
            )
        }

        const ProfilePage = () => {
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                <Profile />
                </div>
            )
        }
        const DesignHeuristicCollection =()=>{
            /**Heuristics data come from server and need to pass into the DH Collection component to be presented
             * on the browser. Also the messages for an "error" and "loading" will be pass into the same component.
             * On the other hand, in case that the user wants to see the comment of a specific heuristic or moreover, if s/he 
             * would like to post comment, comments from server and postComment function should be also dispatched to
             * same component.
             */
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <DHCollection heuristics={this.props.heuristics.heuristics}
                        heuristicsLoading= {this.props.heuristics.isLoading}
                        heuristiscErrMess= {this.props.heuristics.errMess}
                        comments={this.props.comments.comments}
                        commentsErrMess= {this.props.comments.errMess}
                        postComment={this.props.postComment}/>
                    
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

        const SearchPage = () => {
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Search/>
                </div>
            )
        }

        const ForgotYourPassword = ()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <ForgotPassword/>
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
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/register-completed' component={RegisterCompletedPage}/>
                    <Route path='/your-profile' component={ProfilePage}/>
                    <Route path='/selectyourmode' component={SelectYourMode}/>
                    <Route path='/design-heuristic-collection' component={DesignHeuristicCollection}/>
                    <Route path='/add-your-own-heuristic' component={AddYourOwnHeuristic}/>
                    <Route path='/search' component={SearchPage}/>
                    <Route path='/forgot-your-password' component={ForgotYourPassword}/>
                    <Redirect to="/start" />
                </Switch>
            </div>
        )
            
                
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
