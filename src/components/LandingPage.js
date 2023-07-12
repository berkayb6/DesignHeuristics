import React, { useEffect, useState, useRef } from 'react';
import { Loading } from './LoadingComponent';
import {withRouter } from 'react-router-dom';
import Footer from './FooterComponent';
import { Player } from 'video-react';
import { baseUrl } from '../shared/baseUrl';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Link from 'react-router-dom/Link';


function Landing (props){
    window.HTMLElement.prototype.scrollIntoView = function() {};
    const arr= ['useApp', 'defineDH', 'explain', 'introduce']
    const refs= useRef(['useApp', 'defineDH', 'explain', 'introduce']);
    // const defineDHRef= useRef(null);
    // const explainRef= useRef(null);
    // const introduceRef= useRef(null);
    
    function scrollDown(){
            refs.current[0].scrollIntoView({ behavior: 'smooth' });
       
        // if(item==='defineDH'){
        //     defineDHRef.current?.scrollIntoView({ behavior: 'smooth' });
        //     console.log("defn")
        // }if(item==='explain'){
        //     explainRef.current?.scrollIntoView({ behavior: 'smooth' });
        // }if(item==='introduce'){
        //     introduceRef.current?.scrollIntoView({ behavior: 'smooth' });
        // }
        
    }
    // function defineDH(){
    //     defineDHRef.current?.scrollIntoView({ behavior: 'smooth' });

    // }

    const getInContact = () => {
        window.location.replace('https://www.tu.berlin/iit');
      };

    const image = ()=> {
        <Col md={5}>
            <img style={{height:'auto', width:'70%', marginLeft:'10vw'}} src= {`${baseUrl}assets/startPageSS.png`}/>
        </Col>
    }
    return(
        <div>
            <Container fluid style={{fontFamily:'sans-serif'}} >
                <Row style={{width:'auto', display:'inline-block', textAlign:'center'}}>
                    <img style={{position:'absolute', left:'80%', width: '15vw', height:'auto'}} src= {`${baseUrl}assets/landingPageLogo.png`}/>
                    <video autoPlay loop muted id='video' style={{ objectFit: 'cover', height:'auto'}}>
                        <source src= {`${baseUrl}videos/clouds.mp4`} type='video/mp4'/>
                    </video>
                    <p style={{position:'absolute', width: 'auto', top:'30%', height:'auto'}}>
                        <h1 style={{fontSize:'8.5vw', letterSpacing:'5.5vw'}}>KNOWLEDGE</h1>
                        <h1 style={{fontSize:'6vw',  letterSpacing:'0.1vw'}}>For Sustainable Product Design</h1>
                    </p>
                    {/* <Row style={{marginLeft:'.1vw', width:'100%', position:'absolute',marginTop:'-4vw', height:'auto',}}>
                        <Col md={3}>
                        <Card onClick={()=>scrollDown()} style={{width:'17vw',marginTop:"1vw", borderRadius:"10px", backgroundColor:'#001F4D', borderRadius:'0px 20px 0px 20px'}}>
                        {console.log("ref: ", refs)}
                        <div style={{padding:"10px 20px 10px", fontSize:'1vw', color:'white'}}>
                        <p>Show<br/>The App</p>
                        </div>
                        </Card>
                        </Col>
                        <Col md={3}>
                        <Card  style={{width:'17vw',marginTop:"1vw", borderRadius:"10px", backgroundColor:'#001F4D', borderRadius:'0px 20px 0px 20px'}}>
                        <div  style={{padding:"10px 20px 10px", fontSize:'1vw', color:'white'}}>
                        <p>Define<br/>Design Heuristics</p>
                        </div>
                        </Card>
                        </Col>
                        <Col >
                        <Card onClick={()=>scrollDown('explain')} style={{width:'17vw',marginTop:"1vw", borderRadius:"10px", backgroundColor:'#001F4D', borderRadius:'0px 20px 0px 20px'}}>
                        <div style={{padding:"10px 20px 10px", fontSize:'1vw', color:'white'}}>
                        <p>Explain<br/>Sustainability</p>
                        </div>
                        </Card>
                        </Col>
                        <Col >
                        <Card onClick={()=>scrollDown('introduce')} style={{width:'17vw',marginTop:"1vw", borderRadius:"10px", backgroundColor:'#001F4D', borderRadius:'0px 20px 0px 20px'}}>
                        <div style={{padding:"10px 20px 10px", fontSize:'1vw', color:'white'}}>
                        <p>Introduce<br/>The Department</p>
                        </div>
                        </Card>
                        </Col>
                    </Row> */}
                </Row>
                <Row style={{marginTop:'5vw', display:'table'}} className='d-flex align-items-center'>
                    <Col style={{display:'table-cell', textAlign:'center'}}>
                        <p >
                            <h1 style={{fontSize:'2.5vw', letterSpacing:'.5vw'}}>You said there is <br/> <h1 style={{fontSize:'5vw'}}>an application!</h1></h1>
                        </p>
                    </Col>
                </Row>
                <Row style={{marginTop:'5vw'}}>
                    <Col md={5}>
                        <img style={{height:'auto', width:'70%', marginLeft:'10vw'}} src= {`${baseUrl}assets/startPageSS.png`}/>
                    </Col>
                    <Col md={6} style={{alignItems:'center'}}>
                        <Row>
                            <img ref={refs[0]} style={{height:'auto', width:'15vw', alignSelf:'flex-start'}} src= {`${baseUrl}assets/BD-logoLanding.png`}/>
                        </Row>
                        <Row style={{textAlign:'justify', width:'90%'}}>
                            <p>
                                <h5 style={{lineHeight:'25pt'}}>    
                                    BetterDesign is an application which allows professional designers, researcher as well as students to find relevant design knowledge and share their knowledge with others.
                                    <br/><br/>
                                    BetterDesign is more than just a website with design guidelines. BetterDesign uses an empirically validated standardized description for the knowledge assets, which allows users to integrate their knowldege easily, but also enable the system to filter and visualize the knowledge assets themselves but also their interrelation. The form we capture the knowledge assets is known as design heuristics, easy to understand rules of thumb.
                                    <br/><br/>
                                    While the knowledge that is currently found in the app mainly focusses on sustainable product development, it can be used to reach multiple other product property related design targets.
                                </h5>
                            </p>
                        </Row>
                        <Row className='align-items-center'>
                            <Col>
                                <Button style={{backgroundColor:"#001F4C", borderRadius: "10px",width:'8vw'}} onClick={()=> {window.location.href= "start"}}>
                                    Try it!
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:'5vw', display:'table'}} className='d-flex align-items-center'>
                    <Col style={{display:'table-cell', textAlign:'center'}}>
                        <p >
                            <h1 style={{fontSize:'2.5vw', letterSpacing:'.5vw'}}>What are <br/><h1 style={{fontSize:'5vw'}}>Design Heuristics?</h1></h1>
                        </p>
                    </Col>
                </Row>
                <Row style={{ display:'table'}} className='d-flex align-items-center'>
                    <p style={{textAlign:'center', display:'table-cell'}}>
                        <h1 style={{fontSize:'25px'}}>
                            Design Heuristics are a form of knowledge representation. They are mostly formulated as simple rules of thumb, that are derived from tacit knowledge. Find out more about design heuristics is in the video.
                        </h1>
                    </p>
                </Row>
                <Row style={{marginTop:'3vw'}} className='d-flex align-items-center justify-content-center'>
                    <Col style={{marginLeft:'30vw'}}>
                    <iframe
                        width="850vw"
                        height="480"
                        src={`https://www.youtube.com/embed/MqDPd6zOGWI`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                    </Col>
                </Row>
                <Row style={{marginTop:'5vw', display:'table'}} className='d-flex align-items-center'>
                    <Col style={{display:'table-cell', textAlign:'center'}}>
                        <p >
                            <h1 style={{fontSize:'2.5vw', letterSpacing:'.5vw'}}>What do I need to know about <br/>sustainability?</h1>
                        </p>
                    </Col>
                </Row>
                <Row  style={{display:"block"}}>
                    <p style={{display:"block"}}>
                        <h1 style={{fontSize:'20px', lineHeight:'25pt',textAlign:'justify', marginLeft:'10%', marginRight:'10%'}}>
                            We need to save ressources, we need to protect our environmnent from negative effects of creating, using and disposing products. 
                            <br/>This does not mean that we need to stop developing products. It is the oposite. When need to put more time and effort in creating those products. Creating sustainable products. But what does that actually mean and what do you, as a product developer need to know?
                            <br/><br/>Firstly it is important for you to know, that sustainability needs to be thought of in a hollistic manner. Your responsibility as a product designer does not end with selling your product. You need to think about the whole life cycle.
                        </h1>
                    </p>
                </Row>
                <Row style={{marginTop:'5vw'}}>
                    <Col md={5}>
                        <img style={{height:'70%', width:'70%', marginLeft:'10vw'}} src= {`${baseUrl}assets/LCP.png`}/>
                        <h1 style={{fontSize:'20px', textAlign:'justify', marginLeft:'10vw'}}>
                            Fig. Life Cycle Phases of a Product
                            <h1 style={{fontSize:'12px', textAlign:'justify'}}>
                                Source https://de.myclimate.org/en/get-active/corporate-clients/product-carbon-footprint-pcf/
                            </h1>
                        </h1>

                    </Col>
                    <Col md={6} style={{alignItems:'center'}}>
                        <Row style={{textAlign:'justify', width:'90%'}}>
                            <p>
                                <h5 style={{lineHeight:'25pt'}}>
                                    When it comes to sustainability, you have to think about your product regarding all of its dimensions. 
                                    <br/>You have to consider which ressources you use for the product, meaning the materials your product consists of, but also the ressources that are being used during the production. distribution, like for the packaging, or the materials during the usage phase of a products. This also includes the energy that is being used for the material acquisition, the production, the usage but also the disposal of your product. 
                                    <br/><br/>
                                    But when it comes to sustainability it is not only about what you take from our planets ressources but also about what you emit back through the production, usage and disposal of products. Most of us are familiar with the amount of CO2 we emit by, let’s say, using a plane, and know that we need to reduce those emissions to stop, or at least slow down, climate change. But it is not only on the customers to change their behavior, but also on us product developers and scientists to find ways to reduce the CO2 emissions during all life cycle phases.
                                </h5>
                            </p>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} style={{alignItems:'center', marginLeft:'10vw'}}>
                        <Row style={{textAlign:'justify', width:'90%'}}>
                            <p>
                                <h5 style={{lineHeight:'25pt'}}>
                                    At the same time it is not only CO2 emissions which negatively influences the our environment. It is also the impact on the acidification of our environment, the depletion of the ozone layer through gases that are produced, the impact on the ozone emissions in our direct surrounding which affects the production of smog in densely populated regions.
                                    <br/>It also needs to be considered if the production, usage and disposal of a product can have negative health effects by human or ecological toxicity. 
                                    <br/><br/>
                                    All these effects can be quantified in a so called Life Cycle Analysis. But also more qualitative aspects of a product can be optimized to have a positive impact on the sustainability of a product. For instance product developers can make it easier for customers to maintain or repair their product, or to make it upgradable or remanufacturable to increase the life time of a product. More than that product developers can also design products to be easier and better recyclable so that certain parts of the product can be used in other products. 
                                </h5>
                            </p>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <img style={{height:'auto', width:'70%'}} src= {`${baseUrl}assets/appSS.png`}/>
                        <h1 style={{fontSize:'20px', textAlign:'justify'}}>
                            Fig: Screenshot of our Application showing the Product’s properties
                        </h1>
                    </Col>
                </Row>
                <Row  style={{display:"block", marginTop:'2vw'}}>
                    <p style={{display:"block"}}>
                        <h1 style={{fontSize:'20px', lineHeight:'25pt',textAlign:'justify', marginLeft:'10%', marginRight:'10%'}}>
                        As you can see sustainability needs to be looked at hollistically. There are certain impact categories (like emissions, ressource ussage, toxicity) which need to be further classified by the time they are produced/emitted during the life cycle. More than that there are other dimensions of a product which can have a positive impact on the sustainability of a product like the products design for recyclablity, disassemblability, reusability or remanufacturing, which can also be found in DfX (Design for X) guidelines in scientific literature. 
                                <br/>With our application we want to give product designers the possibilty to directly name the effects a guideline has that they use and want to share. For that we developed a effect categorzation scheme that can be seen in the screenshot above. This can also help future product designers to improve their existing products if a life cycle assessment showed that a product has big improvement needs in certain impact categories and life cycle phases. 
                        </h1>
                    </p>
                </Row>
                <Row style={{marginTop:'7vw', display:'table'}} className='d-flex align-items-center'>
                    <Col style={{display:'table-cell', textAlign:'center'}}>
                        <p >
                            <h1 style={{fontSize:'2.5vw', letterSpacing:'.5vw'}}>And the application and website comes from which <br/><h1 style={{fontSize:'5vw'}}>Institute?</h1></h1>
                        </p>
                    </Col>
                </Row>
                <Row style={{marginTop:'5vw'}}>
                    <Col md={5} style={{alignItems:'center', marginLeft:'10vw'}}>
                        <Row style={{textAlign:'justify', width:'90%'}}>
                            <p>
                                <h5 style={{lineHeight:'25pt'}}>
                                    The app and the website is developed by the institute for industrial Information Technology of the Technische Universität Berlin. It was developed during the DFG funded project “Design Heuristiken für die zielgerichtete Produktentwicklung”. 
                                    <br/><br/>
                                    Our department has a long lasting history of not only Knowledge Engineering but various forms of assessing and improving the sustainability of products and processes.
                                    <br/><br/>
                                    Key research fields of our institute in this field are digital twins, knowledge dynamics, smart product service systems, business models and artificial intelligence. 
                                    <br/><br/>
                                    We are more than happy to get into contact with you for possible research projects and the professional exchange regarding our research topics.
                                </h5>
                            </p>
                        </Row>
                        <Row>
                            <Button style={{backgroundColor:"#001F4C", borderRadius: "10px",width:'8vw'}} onClick={getInContact}>
                                get in contact!
                            </Button>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <img style={{height:'auto', width:'70%'}} src= {`${baseUrl}assets/PTZ.png`}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default withRouter(Landing);