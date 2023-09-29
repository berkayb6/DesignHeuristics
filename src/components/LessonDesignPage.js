import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function LessonDesign (props){
    window.HTMLElement.prototype.scrollIntoView = function() {};

    const firstCardInfo = () => {
        window.location.replace('https://www.tu.berlin/iit/studium-lehre/master/anwendung-der-industriellen-informationstechnik');
    }

    const secondCardInfo = () => {
        window.location.replace('https://www.youtube.com/watch?v=f0uAq2yvS6k');
    }
    return(
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <TutorialInsideHeader/>
            <div className='container' >
                <div className='row row-content align-items-start' style={{fontFamily:'sans-serif'}}>
                    <div className='col-12 ' >
                        <h1><strong>Lesson Design</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Dear Colleagues,
                                        <br/><br/>
                                        In our university courses for Industrial IT and Technologies of Virtual Product Creation, we have been teaching students through a combination of traditional classes, practical seminars, and group projects. These diverse learning experiences aim to provide a comprehensive understanding of the subject matter and its real-world applications.
                                        <br/><br/>
                                        During the courses, students attend classes with presentations to grasp the foundational ideas and gain general knowledge. Seminars offer opportunities to delve deeper into specific tools like BPMN and CAD in Fusion 360, enhancing their practical skills.
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{textAlign:'center', width:'90%', backgroundColor:'#4BA6E2', marginTop:'1vw', marginBottom:'1vw'}}>
                            <Row>
                                <p>
                                    <h1 style={{lineHeight:'25pt', marginTop:'50px'}}>    
                                        <strong>The three pillars of the didactic concept</strong>
                                    </h1>
                                </p>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Row style={{marginLeft:'.5vw'}}>
                                        <Card className='lessonPageCard'>
                                            <CardImg src= {`${baseUrl}assets/LessonPage1.jpg`} style={{width:'300px'}} className='selectYourWayImage' alt= "Tutorials"/>
                                            <CardText style={{display:"block"}}> <p style={{display:"block"}}><h5 style={{fontFamily:'sans-serif'}}> <strong>“traditional” classes  with presentations and practical seminars for product development</strong> </h5></p></CardText>
                                        </Card>
                                    </Row>
                                    <Row style={{justifyContent:'center', marginTop:'20px', marginBottom:'50px'}}>
                                        <Button style={{backgroundColor:"white", borderRadius: "10px",width:'8vw'}} onClick={firstCardInfo}>
                                            <h4 style={{color:'black', fontFamily:'sans-serif', marginTop:'.2vw'}}>
                                                More Info
                                            </h4>
                                        </Button>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row style={{marginLeft:'.5vw'}}>
                                        <Card className='lessonPageCard'>
                                            <CardImg src= {`${baseUrl}assets/LessonPage2.jpg`} style={{width:'300px'}} className='selectYourWayImage' alt= "Tutorials"/>
                                            <CardText style={{display:"block"}}> <p style={{display:"block"}}><h5 style={{fontFamily:'sans-serif'}}> <strong>collaborative group work to develop new products including design reviews</strong> </h5></p></CardText>
                                        </Card>
                                    </Row>
                                    <Row style={{justifyContent:'center', marginTop:'20px', marginBottom:'50px'}}>
                                        <Button style={{backgroundColor:"white", borderRadius: "10px",width:'8vw'}} onClick={secondCardInfo}>
                                            <h4 style={{color:'black', fontFamily:'sans-serif', marginTop:'.2vw'}}>
                                                More Info
                                            </h4>
                                        </Button>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row style={{marginLeft:'.5vw'}}>
                                        <Card className='lessonPageCard'>
                                            <CardImg src= {`${baseUrl}assets/LessonPage3.jpg`} style={{width:'300px'}} className='selectYourWayImage' alt= "Tutorials"/>
                                            <CardText style={{display:"block"}}> <p style={{display:"block"}}><h5 style={{fontFamily:'sans-serif'}}> <strong>guided usage of the “Better Design” app for finding and sharing  design knowledge</strong> </h5></p></CardText>
                                        </Card>
                                    </Row>
                                    <Row style={{justifyContent:'center', marginTop:'20px', marginBottom:'50px'}}>
                                        <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/start">
                                            <Button style={{backgroundColor:"white", borderRadius: "10px",width:'8vw'}}>
                                                <h4 style={{color:'black', fontFamily:'sans-serif', marginTop:'.2vw'}}>
                                                    More Info
                                                </h4>
                                            </Button>
                                        </Link>
                                    </Row>
                                    
                                </Col>
                            </Row>
                        </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                    The highlight of the program is the group project, where students collaborate to develop new products. They apply the concepts learned in seminars and classes, with regular design reviews for progress evaluation.
                                    <br/><br/>
                                    To support their journey, we developed the "Better Design" app, providing design heuristics for sustainable product development. As students may lack extensive experiential knowledge in product development, the app serves as a valuable resource. They can also contribute their own heuristics, fostering a community of learning.
                                    <br/><br/>
                                    Our key “Lessons Learned for Lesson Design were:
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{justifyContent:'center', marginRight:'100px'}}>
                            <Col md={10}>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Give students certain <strong>roles within the team</strong>! Who is responsible for the mechanical design? Who is responsible for the business aspects? Who is responsible for sustainability assessment?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Have <strong>regular design reviews</strong>! Why did students choose certain design aspects? What phase are they in in the development process? concept development? detail design? What are the milestones?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Give students <strong>clear requirements</strong>! What is there task exactly? Do they have access to possible customers? Should they focus on certain optimization aspects? What sustainability aspects could be focussed on?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        <strong>Facilitate the app usage and explain!</strong> Students sometimes do not see how they can use certain heuristics. Also students tend to stick to ideas they already have instead of seeing new knowledge. We facilitated the usage by asking for what heuristics they used during reviews but also asked them to use the heuristics for documentation purposes.
                                    </CardText>
                                </Card>
                                <Card>
                                    <CardText style={{marginLeft:'20px'}}>
                                        <strong>Do not underestimate the complexity of sustainability!</strong> Sustainability can be influenced in multiple ways. Targets of used knowledge can influence only certain life cycle phases (e.g. recyclability), effects that need to be closer defined regarding the phase  (e.g. energy consumption) or technical properties that have indirect sustainability effects.                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonDesign