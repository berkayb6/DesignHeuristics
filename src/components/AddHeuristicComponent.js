import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Col, Label, Row } from 'reactstrap';
import Header from './HeaderComponent';

class AddHeuristic extends Component{

    constructor(props){
        super(props);

        this.state= {
            pos_sustainability:false,
            pos_manufacturability:false,
            pos_ergonomics:false,
            neg_sustainability:false,
            neg_manufacturability:false,
            neg_ergonomics:false,
            system: false,
            product: false,
            component: false,
            part: false

        }

        this.handleChange=this.handleChange.bind(this);
        
    }

    handleChange(e){
        let target= e.target;
        this.setState({
            [target.id] : target.checked
        })
    }
    
    render(){

        return(
            <div>
                <Header/>
                <div className='container'>
                    <div className='row row-content'>
                        <LocalForm>
                            
                            <Label style={{marginBottom:"20px"}}><h2>Add a new design heuristic</h2></Label>

                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                
                                <Col md={2}>
                                    <h4>Design Order </h4>
                                </Col>
                                <Col md={4}>
                                    <Control.text model='.designOrder' id="designOrder" name="designOrder" style={{width:"400px"}} 
                                        className= "form-control"/>
                                </Col>
                                <Col>
                                    <p>
                                        What should be done? Please use a verb!{"\n"} e.g.: Locate
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={2}>
                                    <h4>Design Artefact </h4>
                                </Col>
                                <Col md={4}>
                                    <Control.text model='.designArtefact' id="designArtefact" name="designArtefact" style={{width:"400px"}} 
                                        className= "form-control"/>
                                </Col>
                                <Col>
                                    <p>
                                    What are you aiming for? Please specify the artefact! e.g.: unrecycable parts
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={2}>
                                    <h4>Design Atrribute </h4> <p>(optional)</p>
                                </Col>
                                <Col md={4}>
                                    <Control.text model='.designAttribute' id="designAttribute" name="designAttribute" style={{width:"400px"}} 
                                        className= "form-control"/>
                                </Col>
                                <Col>
                                    <p>
                                    What should be done with the artefact? Please specify the attribute!  e.g. in one area which can be easily removed and discarded
                                    </p>
                                </Col>
                            </Row>
                        </LocalForm>
                        <div className='row row-content '>                            
                        
                            <div className='col-12 col-md-3'>
                                <h5>Positive design effects</h5>
                            </div>
                            <div className='col-12 col-md-9'>
                                <h7>Choose what can be reached through your heuristic! e.g.: sustainability. You can choose more than one. Please contact us if you cannot find the reaction you are looking for!</h7>
                            </div>
                            
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="pos_sustainability"  autoComplete="off"/>
                                <label className="btn btn-outline-success" for="pos_sustainability">sustainability</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="pos_manufacturability" autoComplete="off"/>
                                <label className="btn btn-outline-success" for="pos_manufacturability">manufacturability</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="pos_ergonomics"  autoComplete="off" />
                                <label className='btn btn-outline-success'  for="pos_ergonomics">ergonomics</label>
                            </div>
                        </div>
                        <div className='row row-content '>
                            <div className='col-12 col-md-3'>
                                <h5>Negative design effects</h5>
                            </div>
                            <div className='col-12 col-md-9'>
                                <h7>Are there any possible trade offs? e.g.: cost efficiency. You can choose more than one but also none. Please contact us if you cannot find the reaction you are looking for!</h7>
                            </div>
                            
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="neg_sustainability"  autoComplete="off"/>
                                <label className="btn btn-outline-danger" for="neg_sustainability">sustainability</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="neg_manufacturability" autoComplete="off"/>
                                <label className="btn btn-outline-danger" for="neg_manufacturability">manufacturability</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="neg_ergonomics"  autoComplete="off" />
                                <label className='btn btn-outline-danger'  for="neg_ergonomics">ergonomics</label>
                            </div>
                        </div>
                        <div className='row row-content '>
                            <Label style={{marginBottom:"20px"}}><h2>Optional</h2></Label>
                            <div className='col-12 col-md-3'>
                                <h4>What System Level is adressed?</h4>
                            </div>
                            <div className='col-12 col-md-9'>
                                <h7>Please define the system level! You can choose more than one. If you do not chose the level, we assume that it works on every level.</h7>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox"  className="btn-check" id="system"  autoComplete="off"/>
                                <label className="btn btn-outline-light" style={{color: 'black'}} for="system">system</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="product" autoComplete="off"/>
                                <label className="btn btn-outline-light" style={{color: 'black'}} for="product">product</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="component"  autoComplete="off" />
                                <label className='btn btn-outline-light' style={{color: 'black'}} for="component">component</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="part"  autoComplete="off" />
                                <label className='btn btn-outline-light' style={{color: 'black'}} for="part">part</label>
                            </div>
                        </div>
                        <div className='row row-content '>
                            <div className='col-12 col-md-3'>
                                <h4>In which industry can your heuristic be used?</h4>
                            </div>
                            <div className='col-12 col-md-9'>
                                <h7>Please define the industry! You can choose more than one. If you do not chose the industry, we assume that it works in every industry.</h7>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="aircraft"  autoComplete="off"/>
                                <label className="btn btn-outline-light" style={{color: 'black'}} for="aircraft">aircraft</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="furniture" autoComplete="off"/>
                                <label className="btn btn-outline-light" style={{color: 'black'}} for="furniture">furniture</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="household"  autoComplete="off" />
                                <label className='btn btn-outline-light' style={{color: 'black'}} for="household">household</label>
                            </div>
                            <div className='col-12 col-md-2'>
                                <input type="checkbox" onChange={e => this.handleChange(e)} className="btn-check" id="automotive"  autoComplete="off" />
                                <label className='btn btn-outline-light' style={{color: 'black'}} for="automotive">automotive</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default AddHeuristic;