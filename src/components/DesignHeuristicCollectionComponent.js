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
            effectCategory: 'Technical Property',
            effectSpecification: 'default',
            adressedLifeCyclePhase:"default",
            adressedSystemLevel: 'All',
            artefactCategorization: 'default',
            role: 'All',
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
                                        <Label htmlFor="effectCategory" md={5}><h4>Effect Category</h4></Label>
                                        <Col md={7}>
                                            <Input type="select" name="effectCategory"
                                                    value={this.state.effectCategory}
                                                    onChange={this.handleInputChange}>
                                                <option>Technical Property</option>
                                                <option>Life Cycle Phase Property</option>
                                                <option>Life Cycle Property</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        
                                            <Label htmlFor="effectSpecification" md={5} ><h4>Effect Specification</h4></Label>
                                            {(this.state.effectCategory=== "Technical Property") ?
                                            <Col md={7}>
                                                <Input type="select" name="effectSpecification"
                                                        onChange={this.handleInputChange}
                                                        defaultValue={this.state.effectSpecification}>
                                                    <option value="default" disabled hidden>
                                                        Select Effect Category Specification
                                                    </option>
                                                    <option>All</option>
                                                    <option>Efficiency</option>
                                                    <option>Noise Level</option>
                                                    <option>Complexity</option>
                                                    <option>Internal Variety</option>
                                                    <option>Robustness</option>
                                                    <option>Temperature</option>
                                                    <option>Friction</option>
                                                    <option>Volume</option>
                                                    <option>Weight</option>
                                                    <option>Losses</option>
                                                    <option>Others</option>
                                                </Input>
                                            </Col> :
                                            <>
                                                {(this.state.effectCategory=== 'Life Cycle Phase Property') ?
                                                <Col md={7}>
                                                    <Input type="select" name="effectSpecification"
                                                            onChange={this.handleInputChange}
                                                            defaultValue={this.state.effectSpecification}>
                                                        <option value="default" disabled hidden>
                                                            Select Effect Category Specification
                                                        </option>
                                                        <option>All</option>
                                                        <option>Minimum risk</option>
                                                        <option>Cost</option>
                                                        <option>Standards</option>
                                                        <option>Assembly</option>
                                                        <option>Inspection</option>
                                                        <option>Logistics</option>
                                                        <option>Low quantity production</option>
                                                        <option>Supply chain</option>
                                                        <option>Modularity</option>
                                                        <option>User friendliness</option>
                                                        <option>Aesthetics</option>
                                                        <option>Serviceability</option>
                                                        <option>Maintainability</option>
                                                        <option>Repair</option>
                                                        <option>Reuse</option>
                                                        <option>Recyclability</option>
                                                        <option>Disassembly</option>
                                                        <option>Remanufacturing</option>
                                                        <option>Sustainability</option>
                                                        <option>Manufacturability</option>
                                                        <option>Ergonomics</option>
                                                        <option>Ease of design changes</option>
                                                        <option>Amount of produced goods</option>
                                                        <option>Economies of scale</option>
                                                        <option>Economies of scope</option>
                                                        <option>Product usage intensity</option>
                                                        <option>Product lifetime</option>
                                                        <option>Wear</option>
                                                        <option>Customer value</option>
                                                        <option>Other</option>
                                                    </Input>
                                                    </Col> :
                                                    <>
                                                        {(this.state.effectCategory=== 'Life Cycle Property') ?
                                                            <>
                                                                <Col md={7}>

                                                                    <Input type="select" name="effectSpecification"
                                                                            onChange={this.handleInputChange}
                                                                            defaultValue={this.state.effectSpecification}>
                                                                        <option value="default" disabled hidden>
                                                                            Select Effect Category Specification
                                                                        </option>
                                                                        <option>All</option>
                                                                        <option>Mineral and fossil use</option>
                                                                        <option>General material use</option>
                                                                        <option>Energy use</option>
                                                                        <option>Water use</option>
                                                                        <option>Land use</option>
                                                                        <option>Costs</option>
                                                                        <option>Landfill/Waste</option>
                                                                        <option>Impact on climate change through emissions</option>
                                                                        <option>Impact on euthrophication</option>
                                                                        <option>Impact on acidification</option>
                                                                        <option>Impact on POCP</option>
                                                                        <option>Impact on ozone depletion</option>
                                                                        <option>Particulate matter</option>
                                                                        <option>Impact on ecotoxicity</option>
                                                                        <option>Impact on human toxicity</option>
                                                                        <option>Other</option>
                                                                    </Input>
                                                                </Col>
                                                                <Label htmlFor="adressedLifeCyclePhase" ></Label>
                                                                <Col md={{offset:5, size:5}}>
                                                                    <h5>During</h5>
                                                                </Col>
                                                                <Col md={{offset:5, size:7}}>
                                                                    <Input type="select" name="adressedLifeCyclePhase"
                                                                            defaultValue={this.state.adressedLifeCyclePhase}
                                                                            onChange={this.handleInputChange}>
                                                                        <option value="default" disabled hidden>
                                                                            Select Adressed Life Cycle Phase
                                                                        </option>
                                                                        <option>All</option>
                                                                        <option>Design</option>
                                                                        <option>Raw material acquisition</option>
                                                                        <option>Production</option>
                                                                        <option>Assembly</option>
                                                                        <option>Distribution</option>
                                                                        <option>Usage</option>
                                                                        <option>After use</option>
                                                                    </Input>
                                                                </Col>
                                                            </>:
                                                            null

                                                        }
                                                </>
                                                }
                                            </>
                                            }
                                    </FormGroup>
                                    <FormGroup row>
                                            <Label md={5} htmlFor="adressedSystemLevel" ><h4>Adressed System Level</h4></Label>
                                            <Col md={7}>
                                                <Input type="select" name="adressedSystemLevel"
                                                        onChange={this.handleInputChange}
                                                        defaultValue={this.state.adressedSystemLevel}>
                                                    <option value="default" disabled hidden>
                                                        Select System Level
                                                    </option>
                                                    <option>All</option>
                                                    <option>Product/ System</option>
                                                    <option>(Sub-)Assembly</option>
                                                    <option>Part</option>
                                                </Input>
                                            </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                            <Label htmlFor="artefactCategorization" md={5} ><h4>Artefact Categorization</h4></Label>
                                            {(this.state.adressedSystemLevel=== "Product/ System") ?
                                            <Col md={7}>
                                                <Input type="select" name="artefactCategorization"
                                                        onChange={this.handleInputChange}
                                                        defaultValue={this.state.artefactCategorization}>
                                                    <option value="default" disabled hidden>
                                                        Select Artefact Categorization
                                                    </option>
                                                    <option>All</option>
                                                    <option>Product Identification and Classification</option>
                                                    <option>Overall Product Architecture</option>
                                                    <option>Software/Intelligence</option>
                                                    <option>Technology</option>
                                                    <option>Tolerances</option>
                                                    <option>Packaging</option>
                                                    <option>Interfaces</option>
                                                    <option>Sense</option>
                                                    <option>Control</option>
                                                    <option>Functions</option>
                                                    <option>Design Process</option>
                                                    <option>Production Process</option>
                                                    <option>Business Model</option>
                                                    <option>Logistics</option>
                                                    <option>Services</option>
                                                    <option>Others</option>
                                                </Input>
                                            </Col> :
                                            <>
                                                {(this.state.adressedSystemLevel=== '(Sub-)Assembly') ?
                                                <Col md={7}>
                                                    <Input type="select" name="artefactCategorization"
                                                            onChange={this.handleInputChange}
                                                            defaultValue={this.state.artefactCategorization}>
                                                        <option value="default" disabled hidden>
                                                            Select Artefact Categorization
                                                        </option>
                                                        <option>All</option>
                                                        <option>Assembly Identification and Classification</option>
                                                        <option>Assembly Position and Orientation</option>
                                                        <option>Fasteners</option>
                                                        <option>Others</option>
                                                    </Input>
                                                    </Col> :
                                                    <>
                                                        {(this.state.adressedSystemLevel=== 'Part') ?
                                                            <>
                                                                <Col md={7}>

                                                                    <Input type="select" name="artefactCategorization"
                                                                            onChange={this.handleInputChange}
                                                                            defaultValue={this.state.artefactCategorization}>
                                                                        <option value="default" disabled hidden>
                                                                            Select Artefact Categorization
                                                                        </option>
                                                                        <option>All</option>
                                                                        <option>Part Identification and Classification</option>
                                                                        <option>Part Position and Orientation</option>
                                                                        <option>Surface Characteristics</option>
                                                                        <option>Geometry</option>
                                                                        <option>Material Characteristics</option>
                                                                        <option>Others</option>
                                                                    </Input>
                                                                </Col>
                                                            </>:
                                                            null

                                                        }
                                                </>
                                                }
                                            </>
                                            }
                                    </FormGroup>
                                    <FormGroup row>
                                            <Label md={5} htmlFor="role" ><h4>Role</h4></Label>
                                            <Col md={7}>
                                                <Input type="select" name="role"
                                                        onChange={this.handleInputChange}
                                                        defaultValue={this.state.role}>
                                                    <option value="default" disabled hidden>
                                                        Select Your Role
                                                    </option>
                                                    <option>All</option>
                                                    <option>Product Designer</option>
                                                    <option>Project Manager</option>
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

                 

                <Collection isSearchClicked={this.state.isSearchClicked}
                    isLoading= {this.props.heuristicsLoading}
                    errMess= {this.props.heuristiscErrMess}
                    item= {this.props.heuristics
                        .filter ((item)=>{
                            if (this.state.effectCategory==="Life Cycle Property"){
                                if (this.state.adressedLifeCyclePhase==="All" || this.state.adressedLifeCyclePhase=== "default"){
                                    if(this.state.effectSpecification=== "All" || this.state.effectSpecification=== "default"){
                                        if(this.state.adressedSystemLevel==="All" ){
                                            if (this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Product Designer"){
                                                    return (
                                                        (item.orderCategory==="Life Cycle Property"|| "Life Cycle Phase Property" || "Technical Property") && item.positiveEffects.some((({effectCategory}) => effectCategory === this.state.effectCategory))
                                                    )
                                                }
                                                else{
                                                    return (
                                                        (item.positiveEffects).some((({effectCategory}) => effectCategory === this.state.effectCategory))
                                                        &&
                                                        (item.orderCategory==="Product Characteristic")
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                                else{
                                    return item.positiveEffects.some(
                                        (({effectCategory}) => effectCategory === this.state.effectCategory) && (({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase)
                                    )
                                }
                            }
                            else {
                                return item.positiveEffects.some(
                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                )
                            }
                        })
                    }
                    // item= {this.props.heuristics.filter(item => {
                    //     if(this.state.effectSpecification=== "all"){
                    //         if(this.state.adressedSystemLevel==="all"){
                    //                 if (this.state.role==="all"){
                    //                     var effectCategory=item.positiveEffects.map(( positiveEffect) =>{
                    //                         return  positiveEffect.effectCategory})
                    //                     return String(item.positiveEffects[0].effectCategory).includes(this.state.effectCategory)
                    //                 }
                                
                    //             else{
                    //                 return String(item.productDimension[0]).includes(this.state.productDimension) && String(item.designFor[0]).includes(this.state.designfor)
                    //             }
                    //         }
                    //         else{
                    //             if(this.state.productDimension==="all"){
                    //                 return (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor)
 
                    //             }
                    //             else{
                    //                 return String(item.productDimension[0]).includes(this.state.productDimension) && (String(item.phase[0]).includes(this.state.phase) || String(item.phase[0]).includes("all")) && String(item.designFor[0]).includes(this.state.designfor)
                    //             }
                    //         }
                    //     }
                    // })}
                    />
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

