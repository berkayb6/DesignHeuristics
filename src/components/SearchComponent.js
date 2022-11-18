import React, { Component, useEffect, useState } from 'react';
import Header from './HeaderComponent';
import HeuristicDetails from './HeuristicDetailsComponent';
import {Link} from 'react-router-dom';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBSwitch } from 'mdb-react-ui-kit';
import { Loading } from './LoadingComponent';

class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            designfor: 'sustainability',
            industry: 'all',
            phase: 'all',
            productDimension: 'all',
            isSearchClicked: false,
            isSearchEnabled: false,
            search: []
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
        console.log("value: ", event.target.value)
        this.setState(
            {
                search: event.target.value.split(' ')
            }
        )
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
        let searchResults;
        if (this.state.search.length) {
            const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
          
            searchResults= this.props.heuristics.filter(heuristic => {

                return heuristic.title.toLowerCase().match(searchPattern)
            })
        } else {
            searchResults= this.props.heuristics
        }

        let designForArray = [];       
        this.props.heuristics.map((heuristic)=>{
            heuristic.designFor.map((item)=>{
                let splitted= item.split(/[ ,]+/)
                splitted.map((arrayItem)=>{
                    designForArray.push(arrayItem)
                })
            });
        })
        let uniqueDesignFor= [... new Set(designForArray)]
        const designForOptions= uniqueDesignFor.map((item)=>{
            return(
                <option>
                    {item}
                </option>
            )
        })

        return(
            <>
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}/>
                <div className='container' >
                
                    <div className='row row-content align-items-start'>
                        
                        <div className='col-12 col-md-6 offset-md-1' >
                            <h2><strong>Search</strong></h2>
                            for the design heuristics you really need
                            <MDBInputGroup>
                                <MDBInput onChange={(e) => this.setState({search: e.target.value.split(' ')})}/>
                                <MDBBtn onClick={this.searchClicked} rippleColor='dark'>
                                    <MDBIcon icon='search' />
                                </MDBBtn>
                            </MDBInputGroup>
                        </div>

                        <div className='col-12 col-md-5  '>
                            <div className='col-12'>
                                <h4><strong><MDBSwitch id='flexSwitchCheckDefault' label='Do you want to filter beforehand?' onChange={() => 
                                    this.setState({ isSearchEnabled: !this.state.isSearchEnabled })} /></strong></h4>
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
                                                {designForOptions}
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
                                                <option>all</option>
                                                <option>automotive</option>
                                                <option>aircraft</option>
                                                <option>furniture</option>
                                                <option>household</option>
                                                <option>metal production and processing</option>
                                                <option>manufacture of metal products</option>
                                                <option>production of data processing equipment</option>
                                                <option>production of electrical equipment</option>
                                                <option>electric motors</option>
                                                <option>mechnanical engineering</option>
                                                <option>vehicle construction</option>
                                                <option>ship and boat building</option>
                                                <option>rail vehicles</option>
                                                <option>clothing</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="phase" md={5}><h4>Phase</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="phase"
                                                    value={this.state.phase}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>all</option>
                                                <option>design</option>
                                                <option>production</option>
                                                <option>use</option>
                                                <option>end</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="productDimension" md={5}><h4>Product Dimension</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="productDimension"
                                                    value={this.state.productDimension}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>all</option>
                                                <option>material selection</option>
                                                <option>construction</option>
                                                <option>process selection</option>
                                                <option>software-system</option>
                                                <option>others</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                               
                        </div>
                    </div>

                </div>

                <Collection isSearchClicked={this.state.isSearchClicked}
                    isLoading= {this.props.heuristicsLoading}
                    errMess= {this.props.heuristiscErrMess}
                    
                    item= {this.state.isSearchEnabled ? searchResults.filter(item => {
                        if(this.state.industry=== "all"){
                            if(this.state.phase==="all"){
                                if(this.state.productDimension==="all"){
                                    return String(item.designFor[0]).includes(this.state.designfor)
                                }
                                else{
                                    return String(item.productDimension[0]).includes(this.state.productDimension) && String(item.designFor[0]).includes(this.state.designfor)
                                }
                            }
                            else{
                                if(this.state.productDimension==="all"){
                                    return (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor)

                                }
                                else{
                                    return String(item.productDimension[0]).includes(this.state.productDimension) && (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor)
                                }
                            }
                        }
                        else{
                            if(this.state.phase==="all"){
                                if(this.state.productDimension==="all"){
                                    return (String(item.industry[0]).includes(this.state.industry) || String(item.industry[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor)
                                }
                                else{
                                    return (String(item.industry[0]).includes(this.state.industry) || String(item.industry[0]).includes("all")) && String(item.productDimension[0]).includes(this.state.productDimension) && String(item.designFor[0]).includes(this.state.designfor)
                                }
                            }
                            else{
                                if(this.state.productDimension==="all"){
                                    return (String(item.industry[0]).includes(this.state.industry) || String(item.industry[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor) && (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all"))

                                }
                                else{
                                    return String(item.productDimension[0]).includes(this.state.productDimension) && (String(item.industry[0]).includes(this.state.industry) || String(item.industry[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor) && (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all"))
                                }
                            }
                        }
                    }) :
                    searchResults}
                    comments= {this.props.heuristics}
                    postComment= {this.props.postComment}
                    style = {{minHeight: "100vh"}}/>
            </>
        )
    }
}
export default Search;

function Collection (props){

    /** Collection Component has also an property which is showing the details of a specific heuristic
     * that the user clicked on. To show that as a pop-up (modal), it contains the HeuristicDetailsComponent inside of it.
     */

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedHeuristic, setSelectedHeuristic] = useState('')
    const [sampleData, setSampleData] = useState(props.item)

    useEffect(()=>{
        setSampleData(props.item)
    }, [props.item])

    function handleSort(){
        const sortedData = [...sampleData].sort((a,b) =>{
            return a.title > b.title ? 1: -1
        })
        setSampleData(sortedData)
    
    }

    function toggleModal(selectedOne){
        setIsModalOpen(!isModalOpen)
        setSelectedHeuristic(selectedOne)
    }

    function closeModal(){
        setIsModalOpen(!isModalOpen)

    }

    const heuristic= sampleData.map((heuristic)=>{
        return(
            <Row className='d-flex align-items-center'>
                <Col md={2} >
                    {heuristic.designFor.join(", ")}
                </Col>
                <Col md={1} >
                    {heuristic.industry.join(", ")}
                </Col>
                <Col md={2} >
                    {heuristic.phase.join(", ")}
                </Col>
                <Col md={2} >
                    {heuristic.productDimension.join(", ")}
                </Col>
                <Col md={1} >
                    {heuristic.rating}
                </Col>
                <Col md={4} >
                    <Card key={heuristic.id}>
                        <CardBody >
                            <CardText onClick={()=>toggleModal(heuristic)}> {heuristic.title}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    })

    
        
        /** The heuristic defined just below contains all the informations of heuristics that the user wants to see: designfor, level etc.
         * A short explanation about the heuristic stands as the last column. If the user wants to have more information
         * about this specific heuristic, s/he should click on the explanation to toggle the pop-up.
         */
        

    if (props.isSearchClicked){

        if (props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
            return(
                <Container fluid style={{ paddingLeft: 30, paddingRight: 0 }}>
                    
                    <Row className='d-flex align-items-center'>
                        <Col md={2}>
                            <h3>Design for</h3>
                        </Col>
                        <Col md={1}>
                            <h3>Industry</h3>
                        </Col>
                        <Col md={2}>
                            <h3>Phase</h3>
                        </Col>
                        <Col md={2}>
                            <h3>Product Dimension</h3>
                        </Col>
                        <Col md={1}>
                            <h3>Rating</h3>
                        </Col>
                        <Col md={3} className='d-flex align-items-center'>
                            <h3>Applicable heuristic</h3>
                            <i onClick={()=>handleSort()} className="fa fa-arrow-down"></i>
                        </Col>
                    </Row>
                    <Row className='d-flex'>
                            {heuristic}
                    </Row>

                    {/**If the user has clicked on the explanation, then the modal will be shown. 
                     * For this to be rendered properly, the information which heuristic has been clicked,
                     * will be sent to the component HeuristicDetails along with all data of that heuristic.
                     */}

                    <Modal className='modal-lg'  isOpen={isModalOpen} toggle={()=>closeModal()} >
                        <ModalHeader className='startpage' toggle={()=>closeModal()}></ModalHeader>
                        <ModalBody className='startpage'>
                            <HeuristicDetails selectedOne= {selectedHeuristic} 
                                postComment= {props.postComment} />
                        </ModalBody>
                    </Modal>
                    
                </Container>
            )

        }
    else
        return(
            <div>

            </div>
        )
    
}