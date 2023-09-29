import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function QuicklyExplained (props){
    return(
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <TutorialInsideHeader/>
            <div className='container' >
                <div className='row row-content align-items-start' style={{fontFamily:'sans-serif'}}>
                    <div className='col-12 ' >
                        <h1><strong>Quickly Explained</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Check out what’s behind the most important key words and ideas about Design Heuristics,  Design Principles, guidelines and DFX at a glance. 
                                        <br/><br/>
                                        Here we will answer the following questions:
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{justifyContent:'center', marginRight:'100px'}}>
                            <Col md={10}>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        What are Design Heuristics?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        What are Design Principles?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        What does DfX stand for?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        What’s the difference between Design Heuristics, principles, guidelines and DfX?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Why do some principles and heuristics contradict others?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        How is all this knowledge connected?
                                    </CardText>
                                </Card>
                                <Card style={{marginBottom:'15px'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        For which design phases are those design advices relevant?
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{justifyContent:'center', marginRight:'100px', marginTop:'200px'}}>
                            <Col md={10}>
                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>What are Design Heuristics?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Design Heuristics are rules of thumb that designers develop, often uncontiously, while gathering design experiences. They describe rules or procedures that the designer expects to lead to good results. Heuristics are  support quick gut decisions and while maybe not guaranteeing the optimal solution, they foster efficient good-enough gut solutions.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>What are Design Principles?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Design principles are fundamental guidelines that serve as the foundation for creating well-designed products or systems. They are broad, overarching concepts that help designers make informed decisions and solve complex problems. These principles often address aspects such as functionality, aesthetics, usability, sustainability, and manufacturability, ensuring that the final design meets the desired objectives and user needs.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>What does DfX stand for?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        DfX stands for "Design for X," where "X" can represent various factors such as manufacturability, assembly, reliability, serviceability, cost, sustainability, safety, and more. DfX is an approach that considers these specific factors during the design process to optimize the product's performance, quality, and overall lifecycle efficiency. By incorporating DfX, designers can enhance the product's usability, reduce production costs, improve reliability, and make it more environmentally friendly.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>What’s the difference between Design Heuristics, principles, guidelines and DfX?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Design heuristics, principles, guidelines, and DfX are all related but have distinct characteristics. Design principles are broad and fundamental concepts that guide the overall design process. Guidelines are more specific and offer detailed recommendations or suggestions for particular design aspects. DfX focuses on optimizing the design for specific objectives like manufacturability, reliability, or cost, ensuring the product's success in various aspects.
                                        <br/>
                                        Design heuristics are more general, rule-of-thumb guidelines or problem-solving strategies that designers employ.  Heuristics may not be as prescriptive as DfX strategies and are often derived from past experiences or best practices. While design heuristics can be valuable in guiding designers to consider important target-related factors, they may not provide as systematic an approach as DfX strategies.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>Why do some principles and heuristics contradict others?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Different designers may interpret design principles in various ways, leading to diverse approaches in achieving the same goal. For example, when aiming for simplicity, one designer might interpret it as minimalistic aesthetics, while another might focus on reducing the number of features or components. Simultaneously, a design heuristic could suggest adding certain features to enhance user experience or engagement. These two approaches might seem contradictory, but they are both attempting to achieve the overarching principle of creating a simple design.
                                        <br/><br/>
                                        Additionally, the design context and constraints can influence how principles and heuristics are applied. Limited resources, time, or technological restrictions might force designers to prioritize certain heuristics over principles to achieve a functional and feasible product. In such cases, the conflict arises due to the need to balance ideals with real-world limitations.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>How is all this knowledge connected?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        Knowledge in product development plays a crucial role in applying design principles, guidelines, heuristics, and DfX effectively. Designers need to be well-informed about the latest technologies, materials, manufacturing processes, user preferences, and industry standards to make informed decisions during the design process. This knowledge helps them understand the implications of design choices, anticipate potential challenges, and create innovative and functional products that meet customer demands and market requirements.
                                    </CardText>
                                </Card>

                                <Card >
                                    <CardTitle style={{marginLeft:'20px'}}>For which design phases are those design advices relevant?</CardTitle>
                                </Card>
                                <Card style={{marginBottom:'15px',marginLeft:'20px', backgroundColor: '#D9D9D9'}}>
                                    <CardText style={{marginLeft:'20px'}}>
                                        The relevance of knowledge assets such as design principles, guidelines, heuristics, and DfX varies across different design phases. In the early conceptual phase, design principles and heuristics are essential for generating creative ideas and exploring potential solutions. During the detailed design phase, guidelines and DfX considerations become more critical, as they provide specific insights to address issues related to manufacturing, assembly, reliability, and other factors. Throughout the entire design process, knowledge in product development remains valuable, allowing designers to iterate, refine, and optimize their designs to achieve the best possible outcome.
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuicklyExplained