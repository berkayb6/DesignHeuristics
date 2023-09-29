import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function Slides (props){
    const Slides_URL= `${baseUrl}assets/Knowledge in Product Development.pptx`
    const downloadFileAtURL = (url) => {
        fetch (url)
        .then(response => response.blob())
        .then(blob=> {
            const blobURL= window.URL.createObjectURL(new Blob([blob]))
            const fileName= url.split("/").pop();
            const aTag= document.createElement("a");
            aTag.href= blobURL;
            aTag.setAttribute("download", fileName);
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
        })
    }
    return(
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <TutorialInsideHeader/>
            <div className='container' >
                <div className='row row-content align-items-start' style={{fontFamily:'sans-serif'}}>
                    <div className='col-12 ' >
                        <h1><strong>You have something to add?</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Slides for your class
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Find ready-to-use slides addressing assisting methods for product design such as DfX and Design Heursitics. Be free to adapt, select and use slides under our CC0-License as you wish.
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5vw'}}>
                            <Col md={5}>
                                <img style={{height:'90%', width:'70%'}} src= {`${baseUrl}assets/ExcitingSlides.png`}/>
                            </Col>
                            <Col md={6} style={{alignItems:'center'}}>
                                <Row style={{textAlign:'justify', width:'90%'}}>
                                    <p>
                                        <h5 style={{lineHeight:'25pt'}}>
                                        <strong>Design Heuristics</strong>
                                        <br/><br/>
                                        *Definition
                                        <br/>
                                        Interrelatedness of heuristics
                                        <br/>
                                        Contradicitous heuristics
                                        <br/>How to work with design heuristics
                                        </h5>
                                        
                                    </p>
                                </Row>
                                <Row>
                                    <i className='fa fa-lg fa-arrow-circle-down' onClick={()=>{
                                            downloadFileAtURL(Slides_URL);
                                        }}>
                                    </i>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slides