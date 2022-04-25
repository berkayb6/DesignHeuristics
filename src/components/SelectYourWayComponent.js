import React, { Component } from 'react';
import {Link} from "react-router-dom";
import StartHeader from './StartHeaderComponent';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';



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
            {/**The header will be replaced by StartHeaderComponent */}
                <div style={{marginBottom:"50px"}}>
                    
                    <StartHeader/>
                </div>

            {/**Below there are two cards: Tutorial and DfX-Assist.
             * Both of them should be clickable and lead to the corresponding page.
             * The box container has a div which is set to be row-wise.
             * Under row there are two different divs for two different cards.
             * Both take place of 12-columns for extra-small to small screen sizes, and side-by-side otherwise.
             * 
            */}

                <div className='container' >
                    
                    <div className='row align-items-start'>
                        
                        <div className='col-12 col-md offset-md-1' >
                            
                            <Card className='selectYourWayCard'>
                                <CardImg src= "assets/SelectYourWay_left.jpg" className='selectYourWayImage' alt= "Tutorials"/>
                                <CardBody>
                                    <CardTitle style={{display: "flex", justifyContent:'center', alignItems:'center'}}> <h3><strong>Tutorials</strong></h3> </CardTitle>                
                                    <CardText> <h5>Here you will find tutorials on how to use our app and how design heuristics help you acchieve better designs.</h5></CardText>
                                </CardBody>
                            </Card>
                        </div>

            {/**Link covers the card. To avoid that card-texts look like a link, e.g. underlined and are blue,
             * className "text-decoration-none" is added and also via style, the color has been changed to black
            */}

                        <div className='col-12 col-md offset-md-1' >
                            <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/selectyourmode">
                                <Card className='selectYourWayCard' onClick={this.directDfXAssist}>
                                    <CardImg src= "assets/SelectYourWay_right.jpg" className='selectYourWayImage' alt= "Tutorials"/>
                                    <CardBody>
                                        <CardTitle className='selectYourWayCardBody'> <h3><strong>DfX-Assist</strong></h3> </CardTitle>                
                                        <CardText > <h5 >Here you will find state of the design heuristics and and product development assistant</h5> </CardText>
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