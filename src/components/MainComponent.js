import React, { Component } from 'react';
import {Loading} from './LoadingComponent';
import Start from './StartComponent';
import MoreInfo from './MoreInfoComponent';
import Login from './LoginPageComponent';
import Register from './RegisterComponent';
import Profile from './ProfileComponent';
import RegisterCompleted from './RegisterCompletedComponent';
import YourWay from './SelectYourWayComponent';
import YourMode from './SelectYourMode';
import DHCollection from './DesignHeuristicCollectionComponent';
import AddHeuristic from './AddHeuristicComponent';
import HeuristicDetails from './HeuristicDetailsComponent';
import Search from './SearchComponent';
import ForgotPassword from './ForgotPasswordComponent';
import Heuristic from './Heuristic';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStore, StateMachineProvider } from 'little-state-machine';
import { postComment, fetchHeuristics, fetchComments, loginUser, logoutUser, register, fetchUsers, postHeuristic, uploadImage } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './step5';
import YouRock from './YouRock';
import DataBase from './dataBaseUpload';
import LandingPage from './LandingPage';
import Impress from './Impressum';
import Datenschutz from './Datenschutz';
import Tutorial from './TutorialPage';
import LessonDesign from './LessonDesignPage';
import QuicklyExplained from './QuicklyExplainedPage';
import Feedback from './FeedbackComponent';
import Slides from './SlidesComponent';
import Infographic from './InfographicComponent';
import Videos from './VideosComponent';

/** Data will come from the server. Users will be deleted afterwards, when the backend is deployed.*/
const mapStateToProps = state => {
    return {
        heuristics: state.heuristics,
        comments: state.comments,
        users: state.users,
        auth: state.auth
    }
}

/** fetch functions get the downloaded data from server and dispatch it to browser.
 *  postComment and register functions take the input from browser and dispatch it to server.
 */
const mapDispatchToProps = (dispatch) => ({
    postComment: (heuristicId, author, comment) => dispatch(postComment(heuristicId, author, comment)),
    postHeuristic: (title, orderArtefact, embodimentArtefact, embodimentAtrribute, orderAttribute, adressedSystemLevel, artefactCategorization, positiveEffects, negativeEffects, orderCategory, orderCategorySpecification, industry, rating, description, image, sources) => dispatch(postHeuristic(title, orderArtefact, embodimentArtefact, embodimentAtrribute, orderAttribute, adressedSystemLevel, artefactCategorization, positiveEffects, negativeEffects, orderCategory, orderCategorySpecification, industry, rating, description, image, sources)),
    uploadImage: (data) => dispatch(uploadImage(data)),
    register: (email, password, subscription, library, yourHeuristics, projects) => dispatch(register(email, password, subscription, library, yourHeuristics, projects)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchHeuristics: () => {dispatch(fetchHeuristics())},
    fetchComments: () => {dispatch(fetchComments())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))} //
})
var pathDefined= false;

createStore({
    heuristicDetails: {
        artifact: "",
        artifactRestriction: "",
        orderVerb: "",
        orderAdverb: "",
        adressedSystemLevel: [],
        artefactCategorization: []
    },
})
class Main extends Component {
    constructor(props){
        super (props);
        this.heuristics= [];
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
        if (this.props.heuristics.isLoading===false && pathDefined===false ){
            for (let i=0; i <this.props.heuristics.heuristics.length; i++){
                this.heuristics.push(new Heuristic(this.props.heuristics.heuristics[i]))
            }
            pathDefined= true
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
                    <YourWay auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            );
        }
        const SelectYourMode =()=> {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <YourMode auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            );
        }

        const TutorialPage = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <Tutorial auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }
        const QuicklyExplainedPage = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <QuicklyExplained auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const LessonDesignPage = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <LessonDesign auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const FeedbackComponent = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <Feedback auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const SlidesComponent = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <Slides auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const InfographicComponent = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <Infographic auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const VideosComponent = () => {
            return(
                <div className='startpage' style = {{minHeight: "100vh"}}>
                    <Videos auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }

        const LoginPage =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Login users= {this.props.users}
                        auth={this.props.auth} 
                        loginUser={this.props.loginUser} 
                        logoutUser={this.props.logoutUser}/>
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
                    <Profile auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
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
                        postComment={this.props.postComment}
                        auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }
        
        const AddYourOwnHeuristic =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <AddHeuristic auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        uploadImage={this.props.uploadImage}
                        postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }
        const AddYourOwnHeuristicStep2 =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Step2 auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        uploadImage={this.props.uploadImage}
                        postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }

        const AddYourOwnHeuristicStep3 =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Step3 auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        uploadImage={this.props.uploadImage}
                        postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }

        const AddYourOwnHeuristicStep4 =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Step4 auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        uploadImage={this.props.uploadImage}
                        postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }
        const AddYourOwnHeuristicStep5 =()=>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Step5 auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        uploadImage={this.props.uploadImage}
                        postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }

        const YouRockPage = () =>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <YouRock auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>
            )
        }
        const SearchPage = () => {
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <Search heuristics={this.props.heuristics.heuristics}
                        heuristicsLoading= {this.props.heuristics.isLoading}
                        heuristiscErrMess= {this.props.heuristics.errMess}
                        comments={this.props.comments.comments}
                        commentsErrMess= {this.props.comments.errMess}
                        postComment={this.props.postComment}
                        auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
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

        const DataBaseFile = () =>{
            return(
                <div className='startpage' style = {{minHeight:"100vh"}}>
                    <DataBase postHeuristic={this.props.postHeuristic}/>
                </div>
            )
        }

        const Landing = () => {
            return(
                <div className='landingPage' style = {{minHeight:"100vh"}}>
                    <LandingPage />
                </div>
            )
        }

        const Impressum = () => {
            return(
                <div className='landingPage' style = {{minHeight:"100vh"}}>
                    <Impress />
                </div>
            )
        }
        const DatenschutzPage = () => {
            return(
                <div className='landingPage' style = {{minHeight:"100vh"}}>
                    <Datenschutz />
                </div>
            )
        }
                
        const routeComponents = this.heuristics.map((heuristic) => <Route exact path={heuristic.path} component={
            
            () => {
                return(
                    <div className='startpage' style = {{minHeight:"100vh"}}>
                        <HeuristicDetails selectedHeuristic={heuristic.heuristic}
                            heuristics= {this.props.heuristics}
                            heuristicsLoading= {this.props.heuristics.isLoading}
                            heuristiscErrMess= {this.props.heuristics.errMess}
                            postComment={this.props.postComment}
                            auth={this.props.auth}
                            logoutUser={this.props.logoutUser}/>
                    </div>
                )
            }
    
        } />);

        if (this.props.heuristics.isLoading){
            return (
                
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )

        }

        
        else
            return(
                <StateMachineProvider>
                    
                    
                    {/**
                     * Defining the paths of pages and assigning the component to each path
                     * Redirect: If any given path does not exist, then it will redirect to start page.
                     */}
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route path='/start' component={StartPage}/>
                        <Route exact path='/moreinfo' component={MoreInfos}/>
                        <Route path='/selectyourway' component={SelectYourWay}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/register' component={RegisterPage}/>
                        <Route path='/register-completed' component={RegisterCompletedPage}/>
                        <Route path='/your-profile' component={ProfilePage}/>
                        <Route path='/selectyourmode' component={SelectYourMode}/>
                        <Route path='/tutorial' component={TutorialPage}/>
                        <Route path='/quickly-explained' component={QuicklyExplainedPage}/>
                        <Route path='/lesson-design' component={LessonDesignPage}/>
                        <Route path='/feedback' component={FeedbackComponent}/>
                        <Route path='/slides' component={SlidesComponent}/>
                        <Route path='/infographic' component={InfographicComponent}/>
                        <Route path='/videos' component={VideosComponent}/>
                        <Route path='/design-heuristic-collection' component={DesignHeuristicCollection}/>
                        {/* <Route path='/add-your-own-heuristic' component={AddYourOwnHeuristic}/> */}
                        <Route path='/search' component={SearchPage}/>
                        <Route path='/forgot-your-password' component={ForgotYourPassword}/>
                        {routeComponents}
                        <Route path='/file-upload' component={DataBaseFile}/>
                        <Route path="/add-your-own-heuristic" component={AddYourOwnHeuristic} />
                        <Route path="/step2" component={AddYourOwnHeuristicStep2} />
                        <Route path="/step3" component={AddYourOwnHeuristicStep3} />
                        <Route path="/step4" component={AddYourOwnHeuristicStep4} />
                        <Route path="/step5" component={AddYourOwnHeuristicStep5} />
                        <Route path="/you-rock" component={YouRockPage}/>
                        <Route path="/impressum" component={Impressum}/>
                        <Route path="/datenschutz" component={DatenschutzPage}/>
                        <Redirect to="/start" />
                    </Switch>
                </StateMachineProvider>
            )
            
                
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
