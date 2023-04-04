import React, { Component, useEffect, useState } from 'react';
import {Link, withRouter } from 'react-router-dom';
import Collection from './Collection';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';
import { amplitude } from '../utilities/amplitude';
import { identify } from 'amplitude-js';

class DHCollection extends Component{
    constructor(props) {
        super(props);

        this.state = {
            designfor: 'sustainability',
            industry: 'all',
            phase: 'all',
            productDimension: 'all',
            isSearchClicked: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
        this.logClick = this.logClick.bind(this);
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
        amplitude.getInstance().logEvent('heuristicSearchClicked')
        if (this.state.isSearchClicked===false){
            this.setState({
                isSearchClicked:!this.state.isSearchClicked
            })
        }
    }
    
    logClick = () => {
        amplitude.getInstance().logEvent('addYourOwnHeuristicClicked')
    }
    
    
    render(){
        let designForArray = [];       
        // this.props.heuristics.map((heuristic)=>{
        //     heuristic.designFor.map((item)=>{
        //         let splitted= item.split(/[ ,]+/)
        //         splitted.map((arrayItem)=>{
        //             designForArray.push(arrayItem)
        //         })
        //     });
        // })
        let uniqueDesignFor= [... new Set(designForArray)]
        const designForOptions= uniqueDesignFor.map((item)=>{
            return(
                <option>
                    {item}
                </option>
            )
        })

        var identify= new amplitude.Identify(); 
        amplitude.getInstance().identify(identify);
        var deviceId = amplitude.getInstance().options.deviceId;
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
                                <Link className='text-decoration-none card-block' onClick={this.logClick} style={{color:"black"}} to="/add-your-own-heuristic">
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
                {/* <Collection isSearchClicked={this.state.isSearchClicked}
                    isLoading= {this.props.heuristicsLoading}
                    errMess= {this.props.heuristiscErrMess}
                    item= {this.props.heuristics.filter(item => {
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
                        })
                    }
                    comments= {this.props.heuristics}
                    postComment= {this.props.postComment}
                    style = {{minHeight: "100vh"}}/> */}
            </>
        )
    }
}
export default DHCollection;

