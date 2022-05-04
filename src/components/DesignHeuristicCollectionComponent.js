import React, { Component } from 'react';
import HeuristicDetails from './HeuristicDetailsComponent';
import {Link} from 'react-router-dom';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Header from './HeaderComponent';


class DHCollection extends Component{
    constructor(props) {
        super(props);

        this.state = {
            designfor: '',
            industry: '',
            level: '',
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
                <Header/>
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
                                        <Label htmlFor="designfor" md={5}><h4>Industry</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="industry"
                                                    value={this.state.industry}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>Automobility</option>
                                                <option>Airospace</option>
                                                <option>Furniture</option>
                                                <option>Household Goods</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="designfor" md={5}><h4>Level</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="level"
                                                    value={this.state.level}
                                                    placeholder="change the property"
                                                    onChange={this.handleInputChange}>
                                                <option>System</option>
                                                <option>Product</option>
                                                <option>Component</option>
                                                <option>Part</option>
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
                <Collection heuristics={this.props.heuristics}
                    isSearchClicked={this.state.isSearchClicked}
                    designfor={this.props.heuristics.filter( heuristic => heuristic.designfor=== this.state.designfor)}
                    industry={this.props.heuristics.filter( heuristic => heuristic.industry=== this.state.industry)}
                    level={this.props.heuristics.filter( heuristic => heuristic.level=== this.state.level)}
                    style = {{minHeight: "100vh"}}/>
            </>
        )
    }
}
export default DHCollection;


class Collection extends Component{
    constructor(props) {
        super(props);

        this.toggleModal=this.toggleModal.bind(this);
        this.closeModal=this.closeModal.bind(this);

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

        const heuristic= this.props.designfor.map((heuristic)=>{
            return(
                <div className='row align-items-center'>
                    <div className='col-12 col-md-2' >
                        
                        {heuristic.designfor}
                    </div>
                    <div className='col-12 col-md-1' >
                        {heuristic.level}
                    </div>
                    <div className='col-12 col-md-2' >
                        {heuristic.industry}
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
            return(
                <>
                    <div style={{backgroundColor:"#C9E2FF"}}>
                        <div className='container'>
                            <div className='row row-header'>
                                <div className='col-12 col-md-2' >
                                    <h3>Design for</h3>
                                </div>
                                <div className='col-12 col-md-1' >
                                    <h3>Level</h3>
                                </div>
                                <div className='col-12 col-md-2' >
                                    <h3>Industry</h3>
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

                    <Modal className='modal-lg'  isOpen={this.state.isModalOpen} toggle={this.closeModal} >
                        <ModalHeader className='startpage' toggle={this.closeModal}></ModalHeader>
                        <ModalBody className='startpage'>
                            <HeuristicDetails selectedOne= {this.state.selectedHeuristic} />
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