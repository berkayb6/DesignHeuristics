import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function Infographic (props){
    const Infografik_URL= `${baseUrl}assets/Infografik.jpg`
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
                        <h1><strong>Videos</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Find videos about the use of knowledge in the product development process and the use of our design heuristics app.
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <i className='fa fa-lg fa-arrow-circle-down' onClick={()=>{
                                        downloadFileAtURL(Infografik_URL);
                                    }}>
                                </i>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Infographic