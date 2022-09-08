import React, { Component } from 'react';
import HeuristicDetails from './HeuristicDetailsComponent';
import {Link} from 'react-router-dom';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';

class DHCollection extends Component{
    constructor(props) {
        super(props);

        this.state = {
            designfor: 'sustainability',
            industry: 'automotive',
            lifeCyclePhase: 'design',
            isSearchClicked: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
    }

    

    


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    /** a temporary button "search" is added to obtain the selection for:
     * -designfor
     * -industry
     * -level
     * If the button is clicked, this changes the status of the state "isSearchClicked" to true
     * After that, the Collection which is defined below of this page will be rendered
     */

    searchClicked(){
        if (this.state.isSearchClicked===false){
            this.setState({
                isSearchClicked:!this.state.isSearchClicked
            })
        }
    }
    

    render(){
       
        return(
            <>
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}/>
                <div className='container' >
                
                    <div className='row row-content align-items-start'>
                        
                        <div className='col-12 col-md-6 offset-md-1' >
                            <h2><strong>Collection</strong></h2>
                            with all design heuristics available
                            <div className='row col-12 col-md-8' style={{marginTop:"100px"}}>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/add-your-own-heuristic">
                                    <Card className='align-items-center'>
                                        <CardTitle ><h4 className='m-1' > <span className='fa fa-plus-circle'></span><strong> Add your own heuristic</strong></h4> </CardTitle>
                                    </Card>
                                </Link>
                            </div>
                        </div>

                        <div className='col-12 col-md-5  '>
                            <div className='col-12'>
                                <h3><strong>What heuristic are you looking for?</strong></h3>
                            </div>
                            <div className="col-12 col-md-9">
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="designfor" md={5}><h4>Design for</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="designfor"
                                                    value={this.state.designfor}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>sustainability</option>
                                                <option>ergonomics</option>
                                                <option>manufacturability</option>
                                                <option>cost efficiency</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="industry" md={5}><h4>Industry</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="industry"
                                                    value={this.state.industry}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>automotive</option>
                                                <option>aircraft</option>
                                                <option>furniture</option>
                                                <option>household</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="lifeCyclePhase" md={5}><h4>Life Cycle Phase</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="lifeCyclePhase"
                                                    value={this.state.lifeCyclePhase}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>design</option>
                                                <option>production</option>
                                                <option>use</option>
                                                <option>end of life</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button onClick={this.searchClicked} type="submit" color="primary">
                                            Search
                                        </Button>
                                    </Col>
                                </FormGroup>
                                </Form>
                            </div>
                               
                        </div>
                    </div>

                </div>
                {/** The Collection component needs the information which options the user selected.
                 * According to the selections, corresponding heuristics will be shown to the user
                 */}
                <Collection heuristics={this.props.heuristics}
                    isSearchClicked={this.state.isSearchClicked}
                    isLoading= {this.props.heuristicsLoading}
                    errMess= {this.props.heuristiscErrMess}
                    item= {this.props.heuristics.filter(item => {
                            return item.designFor[0]=== this.state.designfor && item.industry[0]=== this.state.industry && item.lifeCyclePhase[0]=== this.state.lifeCyclePhase
                        })
                    }
                    comments= {this.props.heuristics}
                    postComment= {this.props.postComment}
                    style = {{minHeight: "100vh"}}/>
            </>
        )
    }
}
export default DHCollection;


class Collection extends Component{

    /** Collection Component has also an property which is showing the details of a specific heuristic
     * that the user clicked on. To show that as a pop-up (modal), it contains the HeuristicDetailsComponent inside of it.
     */
    constructor(props) {
        super(props);
        
        this.toggleModal=this.toggleModal.bind(this);
        this.closeModal=this.closeModal.bind(this);

        /**To define the selected heuristic and pass it into the HeuristicDetailsComponent the state
         * contains selectedHeuristic as an empty string.
         */
        this.state = {
          isModalOpen: false,
          selectedHeuristic: ''
        };
        
    }

    toggleModal(selectedOne){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            selectedHeuristic: selectedOne
        });
    }

    closeModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        
        /** The heuristic defined just below contains all the informations of heuristics that the user wants to see: designfor, level etc.
         * A short explanation about the heuristic stands as the last column. If the user wants to have more information
         * about this specific heuristic, s/he should click on the explanation to toggle the pop-up.
         */

        const heuristic= this.props.item.map((heuristic)=>{
            return(
                <div className='row align-items-center'>
                    <div className='col-12 col-md-2' >
                        
                        {heuristic.designFor}
                    </div>
                    {/* <div className='col-12 col-md-2' >
                        {heuristic.industry.map((industry)=>{
                            return(
                                <div>
                                    {industry}
                                </div>
                            )
                        })}
                        
                    </div> */}
                    <div className='col-12 col-md-2' >
                        
                        {heuristic.industry}
                    </div>
                    <div className='col-12 col-md-1' >
                        {heuristic.level}
                    </div>
                    <div className='col-12 col-md-1' >
                        {heuristic.rating}
                    </div>
                    <div className='col-12 col-md-6' >
                        <Card key={heuristic.id}>
                            <CardBody >
                                <CardText onClick={()=>this.toggleModal(heuristic)}> {heuristic.title}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
        )
        })

        if (this.props.isSearchClicked){

            if (this.props.isLoading) {
                return(
                    <div className='container'>
                        <div className='row'>
                            <Loading/>
                        </div>
                    </div>
                )
            }
            else if (this.props.errMess){
                return(
                    <div className='container'>
                        <div className='row'>
                            <h4>{this.props.errMess}</h4>
                        </div>
                    </div>
                )
            }
            else
                return(
                    <>

                        <div style={{backgroundColor:"#C9E2FF"}}>
                            <div className='container'>
                                <div className='row row-header'>
                                    <div className='col-12 col-md-2' >
                                        <h3>Design for</h3>
                                    </div>
                                    <div className='col-12 col-md-2' >
                                        <h3>Industry</h3>
                                    </div>
                                    <div className='col-12 col-md-1' >
                                        <h3>Level</h3>
                                    </div>
                                    <div className='col-12 col-md-1' >
                                        <h3>Rating</h3>
                                    </div>
                                    <div className='col-12 col-md-6' >

                                        <h3>Applicable heuristic</h3>
                                    </div>
                                </div>
                                <div className='row row-content'>

                                    {heuristic}
                                

                                </div>

                            </div>
                            
                        </div>

                        {/**If the user has clicked on the explanation, then the modal will be shown. 
                         * For this to be rendered properly, the information which heuristic has been clicked,
                         * will be sent to the component HeuristicDetails along with all data of that heuristic.
                         */}

                        <Modal className='modal-lg'  isOpen={this.state.isModalOpen} toggle={this.closeModal} >
                            <ModalHeader className='startpage' toggle={this.closeModal}></ModalHeader>
                            <ModalBody className='startpage'>
                                <HeuristicDetails selectedOne= {this.state.selectedHeuristic} 
                                    postComment= {this.props.postComment} />
                            </ModalBody>
                        </Modal>
                        
                    </>
                )

            }
        else
            return(
                <div>

                </div>
            )
    }
}