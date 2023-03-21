import React, { Component } from 'react';
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Col, Label, Row, Input, Button, Card, CardBody, CardImg, CardTitle, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import axios from 'axios';
import Header from './HeaderComponent';

const required = (val) => val && val.length;

class AddHeuristic extends Component{
    
    constructor(props){
        super(props);

        this.state= {
            file: {
                selectedFile: null,
                selectedFile2: null,
                selectedFile3: null
            },
            checkArtifact: "",
            checkArtifactRestriction: "",
            checkOrderVerb: "",
            checkOrderAdverb: "",
            isModalOpen: false,
            checkboxRequired: false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.postReq=this.postReq.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.step1 = React.createRef();
        this.step2 = React.createRef()  
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value
        });
    };

    onFileChange= event => {
        var file= {...this.state.file};
        file.selectedFile= event.target.files[0];
        this.setState({file});
    }

    onFileChange2= event => {
        var file= {...this.state.file};
        file.selectedFile2= event.target.files[0];
        this.setState({file});
    }

    onFileChange3= event => {
        var file= {...this.state.file};
        file.selectedFile3= event.target.files[0];
        this.setState({file});
    }

    onFileUpload = () => {
        const url = `${baseUrl}imageUpload`;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var requestArray= []
        console.log("files: ", this.state.file)
        for ( const[key, value] of Object.entries(this.state.file)){

            if (key!== null){
                var formData = new FormData();
                formData.append(
                    "imageFile",
                    value,
                    value.name
                //this.state.flexRadioDefault + ".jpg"
                );
                const request = axios.post(url, formData, config);
                requestArray.push(request)
            }
        }
        axios.all(requestArray).then((...responses) => {
            console.log(responses[0])
            console.log(responses[1]) 
        }).catch(errors => {
        })
    };
    guidelineChange = e => {
        const {id, value} = e.target; 
        if(id=== "artifact"){
            this.setState({checkArtifact: value})
        }
        else if (id=== "artifactRestriction"){
            this.setState({checkArtifactRestriction: value})
        }
        else if (id=== "orderVerb"){
            this.setState({checkOrderVerb: value})
        }
        else if (id=== "orderAdverb"){
            this.setState({checkOrderAdverb: value})
        }
    }


    closeModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })

    }

    handleSubmit (values){
        var rating= 4;
        var keys= Object.keys(values);
        var positiveEffects= keys.filter(value => value.startsWith('pos_')).map(value=> value.slice(4));
        

        var phases= keys.filter(value => value.startsWith('dimension')).map(value=> value.slice(10));
        var productDimension= phases[0]
        for (var i=1; i< phases.length; i++){
            productDimension= productDimension + ", " + phases[i]
        }

        if (positiveEffects.length===0){
            if (phases.length===0){
                this.step1.current.style={visibility:"visible"};
                this.step2.current.style={visibility:"visible"};
                this.step1.current.scrollIntoView();
                return
            }else{
                this.step1.current.style={visibility:"visible"};
                this.step2.current.style={visibility:"hidden"};
                this.step1.current.scrollIntoView();
                return
            }
        }else{
            if (phases.length===0){
                this.step1.current.style={visibility:"hidden"};
                this.step2.current.style={visibility:"visible"};
                this.step2.current.scrollIntoView();
                return
            }
        }

        var negativeEffects= keys.filter(value => value.startsWith('neg_')).map(value=> value.slice(4));
        var phase= keys.filter(value => value.startsWith('phase')).map(value=> value.slice(6));
        var industry= keys.filter(value => value.startsWith('ind')).map(value=> value.slice(4));
        var title = this.state.checkOrderVerb + " " + this.state.checkArtifact + " " + this.state.checkArtifactRestriction + " " + this.state.checkOrderAdverb;
        var designFor= positiveEffects; 
        var category= values.categories;
        var description= values.description;
        var image= []
        for ( const[key, value] of Object.entries(this.state.file)){
            if (value!== null){
                image.push(value.name)
            }
        }
        var sources= values.source;
        return new Promise (resolve=> {
            resolve(this.props.postHeuristic(
                designFor,
                positiveEffects,
                productDimension,
                title,
                negativeEffects,
                phase,
                industry,
                rating,
                category,
                description,
                image,
                sources
            ));
        })
    }

    async postReq (values) {
        await this.handleSubmit(values);
        this.onFileUpload();
    }

  

    render(){
        return(
            
            <div>
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}/>
                <div className='container'>
                    <div className='row row-content'>
                        <LocalForm onSubmit={values=> this.postReq(values)}>
                            <Label className='align-items-center' style={{marginBottom:"20px"}}><h2>You want to share your knowledge? Great!<br/>
                                We will help you set up your guide line with 5 easy steps.</h2></Label>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={2} >
                                    <h2 name="required" id="required">Step 1</h2>
                                </Col>
                                <Col md={3}>
                                    <h5>Positive design effects</h5>
                                </Col>
                                <Row md={12}>
                                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={this.step1} style={{visibility:"hidden"}}> At least one of positive design effects should be selected! </h6></Label>
                                </Row>
                                <Col md={9}>
                                    <h7>Tell us about the positive impact of your design advice! In the scientific community you differentiate between different DfX (Design for X)
                                        targets. To sort the guidelines for others better, it is easiest, you choose one or more of the following. If you think about another one, write us a mail.</h7>
                                </Col>

                                <Row className="col-12 d-flex justify-content-between" md={3} style={{marginTop:"20px"}}>
                                    
                                    <Control.checkbox model=".pos_minumumRisk" name="pos_minumumRisk" id="pos_minumumRisk"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_minumumRisk">minumum risk</Label>
                                    
                                    <Control.checkbox model=".pos_cost" name="pos_cost" id="pos_cost"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_cost">cost</Label>
                                    
                                    <Control.checkbox model=".pos_standards" name="pos_standards" id="pos_standards"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_standards">standards</Label>
                                    
                                    <Control.checkbox model=".pos_assembly" name="pos_assembly" id="pos_assembly"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_assembly">assembly</Label>
                                    
                                    <Control.checkbox model=".pos_inspection" name="pos_inspection" id="pos_inspection"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_inspection">inspection</Label>
                                    
                                    <Control.checkbox model=".pos_logistics" name="pos_logistics" id="pos_logistics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_logistics">logistics</Label>
                                    
                                    <Control.checkbox model=".pos_lowQuantityProduction" name="pos_lowQuantityProduction" id="pos_lowQuantityProduction"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_lowQuantityProduction">low quantity production</Label>
                                    
                                    <Control.checkbox model=".pos_supplyChain" name="pos_supplyChain" id="pos_supplyChain"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_supplyChain">supply chain</Label>
                                    
                                    <Control.checkbox model=".pos_modularity" name="pos_modularity" id="pos_modularity"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_modularity">modularity</Label>
                                    
                                    <Control.checkbox model=".pos_userFriendliness" name="pos_userFriendliness" id="pos_userFriendliness"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_userFriendliness">user friendliness</Label>
                                    
                                    <Control.checkbox model=".pos_aesthetics" name="pos_aesthetics" id="pos_aesthetics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_aesthetics">aesthetics</Label>
                                    
                                    <Control.checkbox model=".pos_serviceability" name="pos_serviceability" id="pos_serviceability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_serviceability">serviceability</Label>
                                    
                                    <Control.checkbox model=".pos_maintainability" name="pos_maintainability" id="pos_maintainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_maintainability">maintainability</Label>
                                    
                                    <Control.checkbox model=".pos_repair" name="pos_repair" id="pos_repair"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_repair">repair</Label>
                                    
                                    <Control.checkbox model=".pos_reuse" name="pos_reuse" id="pos_reuse"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_reuse">reuse</Label>
                                    
                                    <Control.checkbox model=".pos_recyclability" name="pos_recyclability" id="pos_recyclability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_recyclability">recyclability</Label>
                                    
                                    <Control.checkbox model=".pos_disassembly" name="pos_disassembly" id="pos_disassembly"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_disassembly">disassembly</Label>
                                    
                                    <Control.checkbox model=".pos_remanufacturing" name="pos_remanufacturing" id="pos_remanufacturing"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_remanufacturing">remanufacturing</Label>
                                    
                                    <Control.checkbox model=".pos_sustainability" name="pos_sustainability" id="pos_sustainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_sustainability">sustainability</Label>
                                    
                                    <Control.checkbox model=".pos_manufacturability" name="pos_manufacturability" id="pos_manufacturability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_manufacturability">manufacturability</Label>
                                    
                                    <Control.checkbox model=".pos_ergonomics" name="pos_ergonomics" id="pos_ergonomics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_ergonomics">ergonomics</Label>
                                    
                                </Row>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={2}>
                                    <h2>Step 2</h2>
                                </Col>
                                <Col md={3}>
                                    <h5>Product Dimension</h5>
                                </Col>
                                <Row md={12}>
                                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={this.step2} style={{visibility:"hidden"}}> At least one of product dimensions should be selected! </h6></Label>
                                </Row>

                                <Col md={9}>
                                    <h7>Let’s start with something easy. Tell us, in which product dimension your guideline can be used? 
                                        This helps other users to find your guideline! If you want, you can also choose more than one.</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between"  style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".dimension_materialSelection" name="materialSelection" id="materialSelection"
                                        className= "btn-check"/>
                                    <Label  className=" btn-outline-success" for="materialSelection">
                                        <Card className='addYourHeuristicCard align-items-center'>
                                            <Row className='addYourHeuristicCardBody'>
                                                <Col md={3}>
                                                    <CardImg src= {`${baseUrl}assets/materialSelection.jpg`} className='addYourHeuristicImage'/>
                                                </Col>
                                                <Col md={4}>
                                                    <CardTitle style={{display: "flex", justifyContent:'center', alignItems:'center', color: "black"}}> <h3><strong>Material Selection</strong></h3> </CardTitle>                
                                                </Col>
                                                <Col md={4}>
                                                    <CardText style={{color: "black"}}> <h7>Does your guideline give designers advices for choosing the right material, how to handle certain materials or information on which materials to better avoid for certain reasons?</h7></CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Label>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between"  style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".dimension_construction" name="construction" id="construction"
                                        className= "btn-check"/>
                                    <Label className=" btn-outline-success" for="construction">
                                        <Card className='addYourHeuristicCard align-items-center'>
                                            <Row className='addYourHeuristicCardBody'>
                                                <Col md={3}>
                                                    <CardImg src= {`${baseUrl}assets/construction.jpg`} className='addYourHeuristicImage'/>
                                                </Col>
                                                <Col md={4}>
                                                    <CardTitle style={{display: "flex", color: "black", justifyContent:'center', alignItems:'center'}}> <h3><strong>Construction</strong></h3> </CardTitle>                
                                                </Col>
                                                <Col md={4}>
                                                    <CardText style={{color: "black"}}> <h7>Does your guideline give designers advices for constructing a better product, where to locate components within a product, how to dimension the parts or which joints to use?</h7></CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Label>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between"  style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".dimension_processSelection" name="processSelection" id="processSelection"
                                        className= "btn-check"/>
                                    <Label className=" btn-outline-success" for="processSelection">    
                                        <Card className='addYourHeuristicCard align-items-center'>
                                            <Row className='addYourHeuristicCardBody'>
                                                <Col md={3}>
                                                    <CardImg src= {`${baseUrl}assets/processSelection.jpg`} className='addYourHeuristicImage'/>
                                                </Col>
                                                <Col md={4}>
                                                    <CardTitle style={{display: "flex",color: "black", justifyContent:'center', alignItems:'center'}}> <h3><strong>Process Selection</strong></h3> </CardTitle>                
                                                </Col>
                                                <Col md={4}>
                                                    <CardText style={{color: "black"}}> <h7>Does your guideline give designers advices on which processes to use for producing the product, which welding processes to use for which material or which ways the product desing can be made more efficient?</h7></CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Label>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between"  style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".dimension_software-system" name="software-system" id="software-system"
                                        className= "btn-check"/>
                                    <Label className=" btn-outline-success" for="software-system">                                           
                                        <Card className='addYourHeuristicCard align-items-center'>
                                            <Row className='addYourHeuristicCardBody'>
                                                <Col md={3}>
                                                    <CardImg src= {`${baseUrl}assets/software-system.jpg`} className='addYourHeuristicImage'/>
                                                </Col>
                                                <Col md={4}>
                                                    <CardTitle style={{display: "flex",color: "black", justifyContent:'center', alignItems:'center'}}> <h3><strong>Sofware/System</strong></h3> </CardTitle>                
                                                </Col>
                                                <Col md={4}>
                                                    <CardText style={{color: "black"}}> <h7>Does your guideline give designers advices on how to equip your product with the right software, on how to embed the product in a usage system or system with other products?</h7></CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Label>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between"  style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".dimension_others" name="others" id="others"
                                        className= "btn-check"/>
                                    <Label className=" btn-outline-success" for="others">
                                        <Card className='addYourHeuristicCard align-items-center'>
                                            <Row className='addYourHeuristicCardBody'>
                                                <Col md={3}>
                                                    <CardImg src= {`${baseUrl}assets/others.jpg`} className='addYourHeuristicImage'/>
                                                </Col>
                                                <Col md={4}>
                                                    <CardTitle style={{display: "flex",color: "black", justifyContent:'center', alignItems:'center'}}> <h3><strong>Others</strong></h3> </CardTitle>                
                                                </Col>
                                                <Col md={4}>
                                                    <CardText style={{color: "black"}}> <h7>You cannot put your advice in any of the above mentioned but still want to share it? Maybe an advice on how to bring users to recycle the product by themselves?</h7></CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Label>

                                </Col>
                            </Row>
                            <Row onChange={this.guidelineChange} className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={2}>
                                    <h2>Step 3</h2>
                                </Col>
                                <Col md={3}>
                                    <h5>guideline formulation</h5>
                                </Col>
                                <Col md={9}>
                                    <h7>This is the core information you give others! Please use your words carefully and check before hand, if 
                                        somebody else already posted your guideline. You can easily also add more information to an already guideline.</h7>
                                </Col>
                                <Row  className='form-group' style={{marginBottom:"20px", marginTop:"20px"}}>
                                    
                                    <Col>
                                        <h4>1. Artifact  </h4>
                                    </Col>
                                    <Row>
                                        <Col md={6}>
                                            <Control.text model='.artifact' id="artifact" name="artifact"  
                                                className= "form-control"
                                                validators= {{
                                                    required
                                                }}/>
                                            <Errors
                                                className='text-danger'
                                                model=".artifact"
                                                show="touched"
                                                messages= {{
                                                    required: 'Required '
                                                }} />
                                        </Col>
                                        <Col md={6}>
                                            <p>
                                            What do you want to give an advice for in detail? A product, a component, the material types, joints or certain processes? Please try to use one word or 2 maximum.
                                            </p>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row className='form-group' style={{marginBottom:"20px"}}>
                                    <Col >
                                        <h4>2. Artifact Restriction/Extension (optional) </h4>
                                    </Col>
                                    <Row>
                                        <Col md={6}>
                                            <Control.text model='.artifactRestriction' id="artifactRestriction" name="artifactRestriction"  
                                                className= "form-control"/>
                                        </Col>
                                        <Col md={6}>
                                            <p>
                                            This part is optional. To describe the artifact we only gave you 2 words. Here you can desribe it in more detail e.g. only products <strong>that contain hazardous components</strong> or only joints <strong>with plastic parts.</strong> You get the drill!
                                            </p>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row className='form-group' style={{marginBottom:"20px"}}>
                                    <Col>
                                        <h4>3. Order Verb  </h4>
                                    </Col>
                                    <Row>
                                        <Col md={6}>
                                            <Control.text model='.orderVerb' id="orderVerb" name="orderVerb"  
                                                className= "form-control"
                                                validators= {{
                                                    required
                                                }}/>
                                            <Errors
                                                className='text-danger'
                                                model=".orderVerb"
                                                show="touched"
                                                messages= {{
                                                    required: 'Required '
                                                }} />
                                        </Col>
                                        <Col md={6}>
                                            <p>
                                            What should be done with the artifact? Use a verb! Should be designed a certain way? write <strong>Design.</strong> Should something be avoided? Write <strong>Avoid.</strong> In the next field you can be more precise about it.
                                            </p>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row className='form-group' style={{marginBottom:"20px"}}>
                                    <Col>
                                        <h4>4. Order Adverb (optional)</h4>
                                    </Col>
                                    <Row>
                                        <Col md={6}>
                                            <Control.text model='.orderAdverb' id="orderAdverb" name="orderAdverb"  
                                                className= "form-control"/>
                                        </Col>
                                        <Col md={6}>
                                            <p>
                                            This part is optional. Here you can describe what should be done with the artifact in more detail e.g. the artifact should located <strong>in easily accessible areas</strong> or your artifact should the artifacts default state should be set <strong>at minimal material consumption.</strong>
                                            </p>
                                        </Col>
                                    </Row>
                                </Row>
                            </Row>
                            <Row  className='form-group' style={{marginBottom:"40px"}}>
                                <Col md={2}>
                                    <h2>Step 4</h2>
                                </Col>
                                <Col md={3}>
                                    <h5>Check your guideline</h5>
                                </Col>
                                <Col md={9}>
                                    <p>
                                        {this.state.checkOrderVerb + " " + this.state.checkArtifact + " " + this.state.checkArtifactRestriction + " " + this.state.checkOrderAdverb}
                                    </p>
                                </Col>
                            </Row>
                            
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={2}>
                                    <h2>Step 5</h2>
                                </Col>
                                <Col md={3}>
                                    <h5>Further information (optional)</h5>
                                </Col>
                                <Row style={{marginBottom:"40px", marginTop: "20px"}}>
                                    <Col>
                                        <h9>Everything from here on is optional. Nevertheless our research showed that these addtional informations are beneficial
                                            for your guideline to be understood by other designers.
                                        </h9>
                                    </Col>

                                </Row>
                                <Col md={3}>
                                    <h5>Negative design effects</h5>                                
                                </Col>
                                <Col md={9}>
                                    <h7>Are there any possible trade offs? e.g.: cost efficiency. You can choose more than one but also none. Please contact us if you cannot find the reaction you are looking for!</h7>
                                </Col>
                                <Row className="col-12 d-flex justify-content-between" md={3} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".neg_minumumRisk" name="neg_minumumRisk" id="neg_minumumRisk"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_minumumRisk">minumum risk</Label>
                                    
                                    <Control.checkbox model=".neg_cost" name="neg_cost" id="neg_cost"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_cost">cost</Label>
                                    
                                    <Control.checkbox model=".neg_standards" name="neg_standards" id="neg_standards"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_standards">standards</Label>
                                    
                                    <Control.checkbox model=".neg_assembly" name="neg_assembly" id="neg_assembly"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_assembly">assembly</Label>
                                    
                                    <Control.checkbox model=".neg_inspection" name="neg_inspection" id="neg_inspection"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_inspection">inspection</Label>
                                    
                                    <Control.checkbox model=".neg_logistics" name="neg_logistics" id="neg_logistics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_logistics">logistics</Label>
                                    
                                    <Control.checkbox model=".neg_lowQuantityProduction" name="neg_lowQuantityProduction" id="neg_lowQuantityProduction"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_lowQuantityProduction">low quantity production</Label>
                                    
                                    <Control.checkbox model=".neg_supplyChain" name="neg_supplyChain" id="neg_supplyChain"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_supplyChain">supply chain</Label>
                                    
                                    <Control.checkbox model=".neg_modularity" name="neg_modularity" id="neg_modularity"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_modularity">modularity</Label>
                                    
                                    <Control.checkbox model=".neg_userFriendliness" name="neg_userFriendliness" id="neg_userFriendliness"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_userFriendliness">user friendliness</Label>
                                    
                                    <Control.checkbox model=".neg_aesthetics" name="neg_aesthetics" id="neg_aesthetics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_aesthetics">aesthetics</Label>
                                    
                                    <Control.checkbox model=".neg_serviceability" name="neg_serviceability" id="neg_serviceability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_serviceability">serviceability</Label>
                                    
                                    <Control.checkbox model=".neg_maintainability" name="neg_maintainability" id="neg_maintainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_maintainability">maintainability</Label>
                                    
                                    <Control.checkbox model=".neg_repair" name="neg_repair" id="neg_repair"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_repair">repair</Label>
                                    
                                    <Control.checkbox model=".neg_reuse" name="neg_reuse" id="neg_reuse"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_reuse">reuse</Label>
                                    
                                    <Control.checkbox model=".neg_recyclability" name="neg_recyclability" id="neg_recyclability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_recyclability">recyclability</Label>
                                    
                                    <Control.checkbox model=".neg_disassembly" name="neg_disassembly" id="neg_disassembly"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_disassembly">disassembly</Label>
                                    
                                    <Control.checkbox model=".neg_remanufacturing" name="neg_remanufacturing" id="neg_remanufacturing"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_remanufacturing">remanufacturing</Label>
                                    
                                    <Control.checkbox model=".neg_sustainability" name="neg_sustainability" id="neg_sustainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_sustainability">sustainability</Label>
                                    
                                    
                                    <Control.checkbox model=".neg_manufacturability" name="neg_manufacturability" id="neg_manufacturability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_manufacturability">manufacturability</Label>
                                    
                                    
                                    <Control.checkbox model=".neg_ergonomics" name="neg_ergonomics" id="neg_ergonomics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_ergonomics">ergonomics</Label>
                                    
                                </Row>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Label style={{marginBottom:"20px"}}><h2>Optional</h2></Label>
                                <Col md={4}>
                                    <h4>What Phase is adressed?</h4>
                                </Col>
                                <Col md={8}>
                                    <h7>You can choose more than one.<br/>
                                        If you do not chose the level, we assume that it works on every level.</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between" md={6} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".phase_all" name="all" id="all"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="all">all</Label>

                                    <Control.checkbox model=".phase_design" name="design" id="design"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="design">design</Label>
                                    
                                    <Control.checkbox model=".phase_production" name="production" id="production"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="production">production</Label>
                                    
                                    <Control.checkbox model=".phase_use" name="use" id="use"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="use">use</Label>

                                    <Control.checkbox model=".phase_end" name="end" id="end"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="end">end</Label>

                                </Col>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={3}>
                                    <h4>In which industry can your heuristic be used?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Please define the industry! You can choose more than one. If you do not chose the industry, we assume that it works in every industry.</h7>
                                </Col>
                                <Row className="col-12 d-flex justify-content-between" md={3} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".ind_all" name="all" id="all"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="all">all</Label>

                                    <Control.checkbox model=".ind_metal production and processing" name="metal production and processing" id="metal production and processing"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="metal production and processing">metal production and processing</Label>
                                    
                                    <Control.checkbox model=".ind_manufacture of metal products" name="manufacture of metal products" id="manufacture of metal products"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="manufacture of metal products">manufacture of metal products</Label>

                                    <Control.checkbox model=".ind_production of data processing equipment" name="production of data processing equipment" id="production of data processing equipment"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="production of data processing equipment">production of data processing equipment</Label>

                                    <Control.checkbox model=".ind_production of electrical_equipment" name="production of electrical_equipment" id="production of electrical_equipment"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="production of electrical_equipment">production of electrical equipment</Label>

                                    <Control.checkbox model=".ind_electric motors" name="electric motors" id="electric motors"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="electric motors">electric motors</Label>

                                    <Control.checkbox model=".ind_mechnanical engineering" name="mechnanical engineering" id="mechnanical engineering"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="mechnanical engineering">mechnanical engineering</Label>

                                    <Control.checkbox model=".ind_vehicle construction" name="vehicle construction" id="vehicle construction"
                                            className= "btn-check"/>
                                     <Label className="btn btn-outline-light" style={{color: 'black'}} for="vehicle construction">vehicle construction</Label>

                                    <Control.checkbox model=".ind_ship and boat building" name="ship and boat building" id="ship and boat building"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="ship and boat building">ship and boat building</Label>

                                    <Control.checkbox model=".ind_rail vehicles" name="rail vehicles" id="rail vehicles"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="rail vehicles">rail vehicles</Label>

                                    <Control.checkbox model=".ind_clothing" name="clothing" id="clothing"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="clothing">clothing</Label>

                                    <Control.checkbox model=".ind_aircraft" name="aircraft" id="aircraft"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="aircraft">aircraft</Label>

                                    <Control.checkbox model=".ind_furniture" name="furniture" id="furniture"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="furniture">furniture</Label>
                                    
                                    <Control.checkbox model=".ind_household" name="household" id="household"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="household">household</Label>

                                    <Control.checkbox model=".ind_automotive" name="automotive" id="automotive"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="automotive">automotive</Label>
                                </Row>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={3}>
                                    <h4>Do you want to add categories?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Adding categories help users to find your heuristic easier. What are you adressing in detail? 
                                        Type in categories and devide them with commas e.g.: material, fasteners etc.</h7>
                                </Col>
                                <Col >
                                    <Control.textarea model='.categories' id="categories" style={{height:'100px'}} name="categories"  
                                        className= "form-control"/>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={3}>
                                    <h4>Do you want to add pictures?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Here you can optionally add pictures to describe your heuristic. This can be a draft or photo. 
                                        It proved to be helpful to use positive and negative examples, but you can use others too.</h7>
                                </Col>
                                <Row className='form-group' style={{marginBottom:"20px"}} >
                                    <Col md={2} style={{marginTop:'70px'}}>
                                        <Input type="file" onChange={this.onFileChange} />
                                    </Col>
                                    <Col md={4}>
                                        <Col >
                                            <h7> What kind of example is this?</h7>
                                        </Col>
                                        <Col className='d-flex justify-content-between' style={{marginBottom: '20px'}}>
                                            <span>positive</span>
                                            <span>negative</span>
                                            <span>different</span>
                                        </Col>
                                        <Col className='d-flex justify-content-between'  onChange={this.handleChange} >
                                            <Control.radio model=".positive1" name="flexRadioDefault" style={{ marginLeft: '.5rem' }} id="positive1"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative1" name="flexRadioDefault" id="negative1"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different1" name="flexRadioDefault" id="different1"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different1">&nbsp; &nbsp;</Label>                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} >
                                        <Col>
                                            <h7> Add a copyright </h7>
                                            <span> (optional)</span> 
                                        </Col>  
                                        <Control.text model='.copyright' id="copyright1" style={{marginTop:'45px'}} name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} style={{marginTop:'70px'}}>
                                        
                                        <Button onClick={this.onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"20px"}}>
                                    <Col md={2} >
                                        <Input type="file" onChange={this.onFileChange2} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' onChange={this.handleChange} >
                                            <Control.radio model=".positive2" name="flexRadioDefault2" id="positive2"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative2" name="flexRadioDefault2" id="negative2"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different2" name="flexRadioDefault2" id="different2"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different2">&nbsp; &nbsp;</Label>                                            
                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} > 
                                        <Control.text model='.copyright' id="copyright2" name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} >
                                        
                                        <Button onClick={this.onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"20px"}}>
                                    <Col md={2} >
                                        <Input type="file" onChange={this.onFileChange3} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' onChange={this.handleChange} >
                                            <Control.radio model=".positive3" name="flexRadioDefault3" id="positive3"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative3" name="flexRadioDefault3" id="negative3"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different3" name="flexRadioDefault3" id="different3"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different3">&nbsp; &nbsp;</Label>                                            
                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} > 
                                        <Control.text model='.copyright' id="copyright3" name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} >
                                        
                                        <Button onClick={this.onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={3}>
                                    <h4>Some more words?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Here you can optionally describe the heuristic closer. Tell us, in which cases this heuristic helped you or give other designers helpful advices on how to use it!</h7>
                                </Col>
                                <Col style={{marginTop:'30px'}}>
                                    <Control.textarea model='.extraInfo' id="extraInfo" style={{height:'200px'}} name="extraInfo"  
                                        className= "form-control"/>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={5}>
                                    <h4>Where did you find the heuristic?</h4>
                                </Col>
                                <Col md={7}>
                                    <p>Adding the source of your heuristic makes your heuristic more trustworthy. </p>
                                </Col>
                                <Col >
                                    <Control.text model='.source' id="source"  name="source"  
                                        className= "form-control"/>
                                </Col>
                            </Row>
                            <Row className='col-md-4'  >
                                <Button type="submit" value="submit" color="light"> Hand in</Button>
                            </Row>
                        </LocalForm>
                        <Modal className='modal-lg'  isOpen={this.state.isModalOpen} toggle={()=>this.closeModal()} >
                            <ModalHeader className='startpage' toggle={()=>this.closeModal()}></ModalHeader>
                            <ModalBody className='startpage'>
                                asdasd
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddHeuristic;