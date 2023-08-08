import React, { Component, useEffect, useState } from 'react';
import {Link, withRouter } from 'react-router-dom';
import Collection from './Collection';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';
import { amplitude } from '../utilities/amplitude';
import { identify } from 'amplitude-js';


const initialState= {
    effectSpecification: 'default',
    adressedLifeCyclePhase:"default",
    adressedSystemLevel: 'All',
    artefactCategorization: 'default',
    role: 'All'
}
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
            isSearchClicked: false,
            modal: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
        this.logClick = this.logClick.bind(this);
        this.toggleModal=this.toggleModal.bind(this)
    }
    

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("name: ", name)
        if (name=== "effectCategory"){
            this.setState(initialState)
            this.setState({
                [name]: value
            });
        }else{
            this.setState({
                [name]: value
            });
        }
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

    toggleModal(){
        this.setState({modal: !this.state.modal});
    }
    
    logClick = () => {
        amplitude.getInstance().logEvent('addYourOwnHeuristicClicked')
    }
    
    render(){
        console.log("state: ", this.state)
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
                            <h2><strong style={{marginRight: '20px'}}>Collection</strong><i className='fa fa-info-circle' onClick={this.toggleModal}></i></h2>
                            with all design heuristics available
                            <div className='row col-12 col-md-8' style={{marginTop:"100px"}}>
                                <Link className='text-decoration-none card-block' onClick={this.logClick} style={{color:"black"}} to="/add-your-own-heuristic">
                                    <Card className='align-items-center'>
                                        <CardTitle ><h4 className='m-1' > <span className='fa fa-plus-circle'></span><strong> Add your own heuristic</strong></h4> </CardTitle>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size='lg' style={{backgroundColor:"#C9E2FF"}}>
                            <ModalBody style={{backgroundColor:"#C9E2FF"}}>
                                <Container style={{fontFamily:'sans-serif', marginTop:'20px'}}>
                                    <Row>
                                        <h3 style={{textAlign:'center'}}>
                                            Explanation
                                        </h3>
                                    </Row>
                                    <Row>
                                        Target oriented heuristics help you reach your goals in the product development process. On our collection page we help you to find the best fitting ones.
                                        <br/><br/>
                                        Our goal was to create an extensive database with design heuristics for sustainable product design. But sustainability can be influenced in many ways and is highly dependent on your product’s quality or as we call them: “properties”. 
                                        <br/><br/>
                                        These properties can be differentiated in:
                                    </Row>
                                    <Row style={{marginTop: '20px'}}>
                                        <Col md={4} style={{textAlign:'center'}}>
                                            <Card>
                                                Technical Properties
                                            </Card>
                                        </Col>
                                        <Col md={4} style={{textAlign:'center'}}>
                                            <Card>
                                                Life Cycle Phase Properties
                                            </Card>
                                        </Col>
                                        <Col md={4} style={{textAlign:'center'}}>
                                            <Card>
                                                Life Cycle Properties
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '10px'}}>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    directly linked to product characteristics via physical dependencies. E.g. stiffness is defined by material and geometry. 
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    properties adressing suitability to a certain life cycle phase. Most of classical DfX targets are those properties.
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    properties that reflect a product’s interrelation with surrounding dur-ing the entire life cycle and can the-refore be further classified regarding phase.
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '10px'}}>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    Examples: 
                                                    <br/>Speed, Temperature, Volume, Weight, Stiffness, Structural Robust-ness, Density, Internal Variety
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    Examples: 
                                                    <br/>Maintainability, Logistics, Repair, Reuse, Remanufacturability, Supply chain, Assembly, Upgradeability
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <CardBody>
                                                    Examples: 
                                                    <br/>energy use, emissions to air, emis-sions to water, costs, impact on acidification, impact on POCP
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '20px'}}>
                                        All these properties can influence the overall sustainability of the product but they also influence one another. Technical properties can directly influence life cycle properties and so do life cycle phase properties. 
                                        <br/><br/>
                                        Since life cycle properties reflect the product’s interrelation with the entire life cycle our filter mechanism give you the possibility to classify the property closer by its influence in different phases.
                                        <br/><br/>
                                        More than that you can filter between heuristics for project managers (more high level heuristics) and for designers (which go more into detail).
                                    </Row>
                                    <Row style={{marginTop: '50px', justifyContent:'center'}}>
                                        <Col md={4} style={{justifyContent:'center'}}>
                                            <Button style={{backgroundColor:'white', borderRadius:'30px', border:'none', width:'221px', height:'63px'}} onClick={this.toggleModal}>
                                                <h5 style={{color: 'black', fontFamily:'sans-serif'}}>Got it!</h5>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>

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
                                                    <option>efficiency</option>
                                                    <option>noise level</option>
                                                    <option>complexity</option>
                                                    <option>internal variety</option>
                                                    <option>robustness</option>
                                                    <option>temperature</option>
                                                    <option>friction</option>
                                                    <option>volume</option>
                                                    <option>weight</option>
                                                    <option>losses</option>
                                                    <option>others</option>
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
                                                        <option>minimum risk</option>
                                                        <option>cost</option>
                                                        <option>standards</option>
                                                        <option>assembly</option>
                                                        <option>inspection</option>
                                                        <option>logistics</option>
                                                        <option>low quantity production</option>
                                                        <option>supply chain</option>
                                                        <option>modularity</option>
                                                        <option>user friendliness</option>
                                                        <option>aesthetics</option>
                                                        <option>serviceability</option>
                                                        <option>maintainability</option>
                                                        <option>repair</option>
                                                        <option>reuse</option>
                                                        <option>recyclability</option>
                                                        <option>disassembly</option>
                                                        <option>remanufacturing</option>
                                                        <option>sustainability</option>
                                                        <option>manufacturability</option>
                                                        <option>ergonomics</option>
                                                        <option>ease of design changes</option>
                                                        <option>amount of produced goods</option>
                                                        <option>economies of scale</option>
                                                        <option>economies of scope</option>
                                                        <option>product usage intensity</option>
                                                        <option>product lifetime</option>
                                                        <option>wear</option>
                                                        <option>customer value</option>
                                                        <option>other</option>
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
                                                                        <option>mineral and fossil use</option>
                                                                        <option>general material use</option>
                                                                        <option>energy use</option>
                                                                        <option>water use</option>
                                                                        <option>land use</option>
                                                                        <option>costs</option>
                                                                        <option>landfill/Waste</option>
                                                                        <option>impact on climate change through emissions</option>
                                                                        <option>impact on euthrophication</option>
                                                                        <option>impact on acidification</option>
                                                                        <option>impact on POCP</option>
                                                                        <option>impact on ozone depletion</option>
                                                                        <option>particulate matter</option>
                                                                        <option>impact on ecotoxicity</option>
                                                                        <option>impact on human toxicity</option>
                                                                        <option>other</option>
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
                                                                        <option>design</option>
                                                                        <option>raw material acquisition</option>
                                                                        <option>production</option>
                                                                        <option>assembly</option>
                                                                        <option>distribution</option>
                                                                        <option>usage</option>
                                                                        <option>after use</option>
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
                                                    <option>product</option>
                                                    <option>assembly</option>
                                                    <option>part</option>
                                                </Input>
                                            </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                            {(this.state.adressedSystemLevel=== "Product/ System") ?
                                            <>
                                                <Label htmlFor="artefactCategorization" md={5} ><h4>Artefact Categorization</h4></Label>
                                                <Col md={7}>
                                                    <Input type="select" name="artefactCategorization"
                                                            onChange={this.handleInputChange}
                                                            defaultValue={this.state.artefactCategorization}>
                                                        <option value="default" disabled hidden>
                                                            Select Artefact Categorization
                                                        </option>
                                                        <option>All</option>
                                                        <option>product identification and classification</option>
                                                        <option>overall product architecture</option>
                                                        <option>software/intelligence</option>
                                                        <option>technology</option>
                                                        <option>tolerances</option>
                                                        <option>packaging</option>
                                                        <option>interfaces</option>
                                                        <option>sense</option>
                                                        <option>control</option>
                                                        <option>functions</option>
                                                        <option>design process</option>
                                                        <option>production process</option>
                                                        <option>business model</option>
                                                        <option>logistics</option>
                                                        <option>services</option>
                                                        <option>others</option>
                                                    </Input>
                                                </Col>
                                            </> :
                                            <>
                                                {(this.state.adressedSystemLevel=== '(Sub-)Assembly') ?
                                                    <>
                                                        <Label htmlFor="artefactCategorization" md={5} ><h4>Artefact Categorization</h4></Label>
                                                        <Col md={7}>
                                                            <Input type="select" name="artefactCategorization"
                                                                    onChange={this.handleInputChange}
                                                                    defaultValue={this.state.artefactCategorization}>
                                                                <option value="default" disabled hidden>
                                                                    Select Artefact Categorization
                                                                </option>
                                                                <option>All</option>
                                                                <option>assembly identification and classification</option>
                                                                <option>assembly position and orientation</option>
                                                                <option>fasteners</option>
                                                                <option>others</option>
                                                            </Input>
                                                        </Col>
                                                    </> :
                                                    <>
                                                        {(this.state.adressedSystemLevel=== 'Part') ?
                                                            <>
                                                                <>
                                                                    <Label htmlFor="artefactCategorization" md={5} ><h4>Artefact Categorization</h4></Label>
                                                                    <Col md={7}>
                                                                        <Input type="select" name="artefactCategorization"
                                                                                onChange={this.handleInputChange}
                                                                                defaultValue={this.state.artefactCategorization}>
                                                                            <option value="default" disabled hidden>
                                                                                Select Artefact Categorization
                                                                            </option>
                                                                            <option>All</option>
                                                                            <option>part identification and classification</option>
                                                                            <option>part position and orientation</option>
                                                                            <option>surface characteristics</option>
                                                                            <option>geometry</option>
                                                                            <option>material characteristics</option>
                                                                            <option>others</option>
                                                                        </Input>
                                                                    </Col>
                                                                </>
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
                            if (this.state.adressedLifeCyclePhase==="All" || this.state.adressedLifeCyclePhase=== "default"){
                                if(this.state.effectSpecification=== "All" || this.state.effectSpecification=== "default"){
                                    if(this.state.adressedSystemLevel==="All" ){
                                        if(this.state.role==="All"){
                                            return item.positiveEffects.some(
                                                ({effectCategory}) => effectCategory === this.state.effectCategory
                                            )
                                        }
                                        else{
                                            if (this.state.role==="Project Manager"){
                                                return (
                                                    (item.orderCategory.includes("Property")||item.orderCategory.includes("properties"))&&
                                                    item.positiveEffects.some((({effectCategory}) => effectCategory === this.state.effectCategory))
                                                )
                                            }
                                            else{
                                                return (
                                                    item.positiveEffects.some((({effectCategory}) => effectCategory === this.state.effectCategory))
                                                )
                                            }
                                        }
                                    }
                                    else {
                                        if(this.state.role==="All"){
                                            if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                )
                                            }
                                            else{
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                ) && item.artefactCategorization.includes(
                                                    this.state.artefactCategorization
                                                )
                                            }
                                        }
                                        else{
                                            if (this.state.role==="Project Manager"){
                                                if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                                    return item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.adressedSystemLevel.includes(
                                                        this.state.adressedSystemLevel
                                                    ) && (item.orderCategory.includes("Property")||item.orderCategory.includes("properties"))
                                                }
                                                else{
                                                    return item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.adressedSystemLevel.includes(
                                                        this.state.adressedSystemLevel
                                                    ) && item.artefactCategorization.includes(
                                                        this.state.artefactCategorization
                                                    ) && (item.orderCategory.includes("Property")||item.orderCategory.includes("properties"))
                                                }
                                            }
                                            else{
                                                if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                                    return item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.adressedSystemLevel.includes(
                                                        this.state.adressedSystemLevel
                                                    )
                                                }
                                                else{
                                                    return item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.adressedSystemLevel.includes(
                                                        this.state.adressedSystemLevel
                                                    ) && item.artefactCategorization.includes(
                                                        this.state.artefactCategorization
                                                    )
                                                }
                                            }
                                        }
                                        
                                    }
                                }
                                else{
                                    if(this.state.adressedSystemLevel==="All" ){
                                        if(this.state.role==="All"){
                                            return item.positiveEffects.some(
                                                ({effectCategory}) => effectCategory === this.state.effectCategory
                                            ) && item.positiveEffects.some(
                                                ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                            )
                                        }
                                        else{
                                            if (this.state.role==="Project Manager"){
                                                return (
                                                    item.positiveEffects.some((({effectCategory}) => effectCategory === this.state.effectCategory)) && 
                                                    (item.orderCategory.includes("Property")||item.orderCategory.includes("properties"))&&
                                                    item.positiveEffects.some(
                                                        ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                    )
                                                )
                                            }
                                            else{
                                                return (
                                                    item.positiveEffects.some((({effectCategory}) => effectCategory === this.state.effectCategory)) &&
                                                    item.positiveEffects.some(
                                                        ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                    )
                                                )
                                            }
                                        }
                                    }
                                    else{
                                        if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties"))&&
                                                        item.positiveEffects.some(
                                                            (({effectCategory}) => effectCategory === this.state.effectCategory)
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                                else{
                                                    return (
                                                        item.positiveEffects.some(
                                                            (({effectCategory}) => effectCategory === this.state.effectCategory)
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                        else{
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                ) && item.artefactCategorization.includes(
                                                    this.state.artefactCategorization
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) &&
                                                        item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                                else{
                                                    return (
                                                        item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification.includes(this.state.effectSpecification) 
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                if(this.state.effectSpecification=== "All" || this.state.effectSpecification=== "default"){
                                    if(this.state.adressedSystemLevel==="All" ){
                                        if(this.state.role==="All"){
                                            return item.positiveEffects.some(
                                                ({effectCategory}) => effectCategory === this.state.effectCategory
                                            ) && item.positiveEffects.some(
                                                ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                            )
                                        }
                                        else{
                                            if (this.state.role==="Project Manager"){
                                                return (
                                                    (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                    && item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.positiveEffects.some(
                                                        ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                    )
                                                )
                                            }
                                            else{
                                                return (item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.positiveEffects.some(
                                                        ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                    )
                                                )
                                            }
                                        }
                                    }
                                    else{
                                        if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                        && item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                                else{
                                                    return (item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                        else{
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                ) && item.artefactCategorization.includes(
                                                    this.state.artefactCategorization
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                        && item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                                else{
                                                    return (item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    if(this.state.adressedSystemLevel==="All" ){
                                        if(this.state.role==="All"){
                                            return item.positiveEffects.some(
                                                ({effectCategory}) => effectCategory === this.state.effectCategory
                                            ) && item.positiveEffects.some(
                                                ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                            ) && item.positiveEffects.some(
                                                ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                            )
                                        }
                                        else{
                                            if (this.state.role==="Project Manager"){
                                                return (
                                                    (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                    && item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.positiveEffects.some(
                                                        ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                    ) && item.positiveEffects.some(
                                                        ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                    )
                                                )
                                            }
                                            else{
                                                return (item.positiveEffects.some(
                                                        ({effectCategory}) => effectCategory === this.state.effectCategory
                                                    ) && item.positiveEffects.some(
                                                        ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                    ) && item.positiveEffects.some(
                                                        ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                    )
                                                )
                                            }
                                        }
                                    }
                                    else{
                                        if(this.state.artefactCategorization=== "All" || this.state.artefactCategorization=== "default"){
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                ) && item.positiveEffects.some(
                                                    ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                        && item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                                else{
                                                    return (item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                        else{
                                            if(this.state.role==="All"){
                                                return item.positiveEffects.some(
                                                    ({effectCategory}) => effectCategory === this.state.effectCategory
                                                ) && item.positiveEffects.some(
                                                    ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                ) && item.positiveEffects.some(
                                                    ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                ) && item.adressedSystemLevel.includes(
                                                    this.state.adressedSystemLevel
                                                ) && item.artefactCategorization.includes(
                                                    this.state.artefactCategorization
                                                )
                                            }
                                            else{
                                                if (this.state.role==="Project Manager"){
                                                    return (
                                                        (item.orderCategory.includes("Property")||item.orderCategory.includes("properties")) 
                                                        && item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                                else{
                                                    return ( item.positiveEffects.some(
                                                            ({effectCategory}) => effectCategory === this.state.effectCategory
                                                        ) && item.positiveEffects.some(
                                                            ({step4AdressedLifeCyclePhase}) => step4AdressedLifeCyclePhase === this.state.adressedLifeCyclePhase
                                                        ) && item.positiveEffects.some(
                                                            ({effectCategorySpecification}) => effectCategorySpecification === this.state.effectSpecification
                                                        ) && item.adressedSystemLevel.includes(
                                                            this.state.adressedSystemLevel
                                                        ) && item.artefactCategorization.includes(
                                                            this.state.artefactCategorization
                                                        )
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                />
                
            </>
        )
    }
}
export default DHCollection;

