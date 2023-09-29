import React, { Component } from 'react';
import {Link} from "react-router-dom";
import StartHeader from './StartHeaderComponent';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';


class YourWay extends Component{
    constructor(props){
        super(props);

        this.directDfXAssist=this.directDfXAssist.bind(this);

        this.state = {
            isAssistClicked: false
        };

    }

    directDfXAssist(){
        this.setState({
            isAssistClicked:!this.state.isAssistClicked
        });
    }

    render(){
        return(
            <>
            {/**The header will be replaced by StartHeaderComponent.
             * Since this component should have a header being "Select Your Way", selectyour prop
             * should be defined as "Way" and sent so to StartHeaderComponent
             */}
                <div style={{marginBottom:"50px"}}>
                    <StartHeader selectyour= "Way"
                        auth={this.props.auth}
                        logoutUser={this.props.logoutUser}/>
                </div>

            {/**Below there are two cards: Tutorial and DfX-Assist.
             * Both of them should be clickable and lead to the corresponding page.
             * The box container has a div which is set to be row-wise.
             * Under row there are two different divs for two different cards.
             * Both take place of 12-columns for extra-small to small screen sizes, and side-by-side otherwise.
             * 
            */}

                <div className='container' >
                    
                    <div className='row'>
                        
                        <div className='col-12 col-md offset-md-1' >
                            <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/tutorial">
                                <Card className='selectYourWayCard'>
                                    <CardImg src= {`${baseUrl}assets/SelectYourWay_left.jpg`} className='selectYourWayImage' alt= "Tutorials"/>
                                    <CardBody>
                                        <CardTitle style={{display: "flex", justifyContent:'center', alignItems:'center'}}> <h3><strong>Tutorials</strong></h3> </CardTitle>                
                                        <CardText style={{display:"block"}}> <p style={{display:"block"}}><h5 >Here you will find tutorials on how to use our app and how design heuristics help you acchieve better designs.</h5></p></CardText>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>

            {/**Link covers the card. To avoid that card-texts look like a link, e.g. underlined and are blue,
             * className "text-decoration-none" is added and also via style, the color has been changed to black
            */}

                        <div className='col-12 col-md offset-md-1' >
                            <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/design-heuristic-collection">
                                <Card className='selectYourWayCard' onClick={this.directDfXAssist}>
                                    <CardImg src= {`${baseUrl}assets/SelectYourWay_right.jpg`} className='selectYourWayImage' alt= "Tutorials"/>
                                    <CardBody>
                                        <CardTitle className='selectYourWayCardBody'> <h3><strong>Knowledge Base</strong></h3> </CardTitle>                
                                        <CardText style={{display:'block'}}> <p style={{display:'block'}}><h5>Here you will find a knowledge base with state of the art design heuristics for sustainable product development</h5> </p></CardText>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>
                    </div>
                    
                </div>
                <div className='col-12 justify-content-around'>
                    <Link className='col-md-3 offset-md-1 btn' to='/start' >
                        <Button className='btn-light btn-lg' style={{opacity:"0.4", width:"180px", borderRadius:"30px"}}>Go Back</Button>
                    </Link>
                </div>
            </>
        )
    }
}
export default YourWay;