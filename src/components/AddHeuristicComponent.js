import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Col, Label, Row, Input, Button } from 'reactstrap';
import Header from './HeaderComponent';
import axios from 'axios';

class AddHeuristic extends Component{

    constructor(props){
        super(props);

        this.state= {
            selectedFile: null

        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.postReq=this.postReq.bind(this);
    }

    

    onFileChange= event => {
        this.setState({selectedFile: event.target.files[0]});
    }

    onFileUpload = () => {
        const url = 'https://localhost:3443/imageUpload';
        var formData = new FormData();
        
        formData.append(
            "imageFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        console.log("upload: ", this.state.selectedFile);
        
        axios.post(url, formData, config).then((response)=> {
            console.log(response.data)
        }); 
        // this.props.uploadImage(formData)
    };

    fileData = () => { 
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
    };


    handleSubmit (values){
        var rating= 4;
        
        var keys= Object.keys(values);
        var description = "test";
        var positiveEffects= keys.filter(value => value.startsWith('pos'));
        var negativeEffects= keys.filter(value => value.startsWith('neg'));
        var systemLevel= keys.filter(value => value.startsWith('level'));
        var industry= keys.filter(value => value.startsWith('ind'));
        var applicableIndustry= industry;
        return new Promise (resolve=> {
            resolve(this.props.postHeuristic(
                values.designOrder,
                systemLevel,
                industry,
                rating,
                positiveEffects,
                negativeEffects,
                applicableIndustry,
                description,
                values.source
            ));
        })
        
        

    }

    async postReq (values) {
        
        const res = await this.handleSubmit(values);
        console.log("res: ", res)
        this.onFileUpload();
    
    }
    render(){

        return(
            
            <div>
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}/>
                <div className='container'>
                    <div className='row row-content'>
                        <LocalForm onSubmit={values=> this.postReq(values) }>
                            
                            <Label style={{marginBottom:"20px"}}><h2>Add a new design heuristic</h2></Label>

                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                
                                <Col md={2}>
                                    <h4>Design Order </h4>
                                </Col>
                                <Col md={6}>
                                    <Control.text model='.designOrder' id="designOrder" name="designOrder"  
                                        className= "form-control"/>
                                </Col>
                                <Col md={4}>
                                    <p>
                                        What should be done? Please use a verb!{"\n"} e.g.: Locate
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={2}>
                                    <h4>Design Artefact </h4>
                                </Col>
                                <Col md={6}>
                                    <Control.text model='.designArtefact' id="designArtefact" name="designArtefact"  
                                        className= "form-control"/>
                                </Col>
                                <Col md={4}>
                                    <p>
                                    What are you aiming for? Please specify the artefact! e.g.: unrecycable parts
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={2}>
                                    <h4>Design Attribute </h4> <p>(optional)</p>
                                </Col>
                                <Col md={6}>
                                    <Control.text model='.designAttribute' id="designAttribute" name="designAttribute"  
                                        className= "form-control"/>
                                </Col>
                                <Col md={4}>
                                    <p>
                                    What should be done with the artefact? Please specify the attribute!  e.g. in one area which can be easily removed and discarded
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={3}>
                                    <h5>Positive design effects</h5>                                
                                </Col>
                                <Col md={9}>
                                    <h7>Choose what can be reached through your heuristic! e.g.: sustainability. You can choose more than one. Please contact us if you cannot find the reaction you are looking for!</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between" md={6} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".pos_sustainability" name="pos_sustainability" id="pos_sustainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_sustainability">sustainability</Label>
                                    
                                    <Control.checkbox model=".pos_manufacturability" name="pos_manufacturability" id="pos_manufacturability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_manufacturability">manufacturability</Label>
                                    
                                    <Control.checkbox model=".pos_ergonomics" name="pos_ergonomics" id="pos_ergonomics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-success" for="pos_ergonomics">ergonomics</Label>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={3}>
                                    <h5>Negative design effects</h5>                                
                                </Col>
                                <Col md={9}>
                                    <h7>Are there any possible trade offs? e.g.: cost efficiency. You can choose more than one but also none. Please contact us if you cannot find the reaction you are looking for!</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between" md={6} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".neg_sustainability" name="neg_sustainability" id="neg_sustainability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_sustainability">sustainability</Label>
                                    
                                    <Control.checkbox model=".neg_manufacturability" name="neg_manufacturability" id="neg_manufacturability"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_manufacturability">manufacturability</Label>
                                    
                                    <Control.checkbox model=".neg_ergonomics" name="neg_ergonomics" id="neg_ergonomics"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-danger" for="neg_ergonomics">ergonomics</Label>
                                </Col>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Label style={{marginBottom:"20px"}}><h2>Optional</h2></Label>
                                <Col md={3}>
                                    <h4>What System Level is adressed?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Please define the system level! You can choose more than one. If you do not chose the level, we assume that it works on every level.</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between" md={6} style={{marginTop:"20px"}}>
                                    <Control.checkbox model=".level_system" name="system" id="system"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="system">system</Label>
                                    
                                    <Control.checkbox model=".level_product" name="product" id="product"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="product">product</Label>
                                    
                                    <Control.checkbox model=".level_component" name="component" id="component"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="component">component</Label>

                                    <Control.checkbox model=".level_part" name="part" id="part"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="part">part</Label>

                                </Col>

                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={3}>
                                    <h4>In which industry can your heuristic be used?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Please define the industry! You can choose more than one. If you do not chose the industry, we assume that it works in every industry.</h7>
                                </Col>
                                <Col className="col-12 d-flex justify-content-between" md={6} style={{marginTop:"20px"}}>
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
                                </Col>

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
                                        <Col className='d-flex justify-content-between' >
                                            <Control.radio model=".positive1" isToggle={false} name="flexRadioDefault" style={{ marginLeft: '.5rem' }} id="positive1"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-success" for="positive1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative1" isToggle={false} name="flexRadioDefault" id="negative1"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-danger" for="negative1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different1" isToggle={false} name="flexRadioDefault" id="different1"
                                                className= "btn-check"/>
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
                                        <Input type="file" onChange={this.onFileChange} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' >
                                            <Control.radio model=".positive2" name="flexRadioDefault2" id="positive2"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-success" for="positive2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative2" name="flexRadioDefault2" id="negative2"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-danger" for="negative2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different2" name="flexRadioDefault2" id="different2"
                                                className= "btn-check"/>
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
                                        <Input type="file" onChange={this.onFileChange} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' >
                                            <Control.radio model=".positive3" name="flexRadioDefault3" id="positive3"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-success" for="positive3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".positive3" name="flexRadioDefault3" id="negative3"
                                                className= "btn-check"/>
                                            <Label className="btn btn-outline-danger" for="negative3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".positive3" name="flexRadioDefault3" id="different3"
                                                className= "btn-check"/>
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


                        
                        {this.fileData()}


                    </div>
                </div>
            </div>
        )
    }
}
export default AddHeuristic;