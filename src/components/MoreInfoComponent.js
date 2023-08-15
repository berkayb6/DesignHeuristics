import React from "react";
import Link from "react-router-dom/Link";
import { Card, CardImg, Col, Row } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

function MoreInfo(){

    return (
        

        <div className='container'>
            <div className='row row-header home-page-header'>
                <Row >
                    <Col md={5}>
                        <h5><strong>Department of Industrial Information Technology</strong></h5>
                    </Col>
                </Row>
                <Row style={{marginLeft:'50px'}}>
                    <Col md={3} >
                        <Card className='logo'>
                            <CardImg src= {`${baseUrl}assets/landingPageLogo.png`} width={20} height={50}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className='row row-content'>
                <Row style={{alignItems:'center'}}>
                    <Col md={5} >
                        <Row style={{textAlign:'justify'}}>
                            <p>
                                <h1> Design for X</h1>
                            <p>The scientific community is coming up with new guidelines to make products better, more sustainable und efficient. Worlwide designers find their own heuristics from their individual expertise. We created this platform to bring them together and learn from each other</p>

                            </p>
                            <Link className='col-md-3  btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/start' >
                                <h5>Go Back</h5>
                            </Link>
                        </Row>
                    </Col>
                    <Col md={5} style={{marginLeft:'100px'}}>
                        <img style={{height:'auto', width:'90%'}} src= {`${baseUrl}assets/startSeite.jpg`}/>
                    </Col>
                </Row>
                

            </div>
        </div>
    )
}

export default MoreInfo;