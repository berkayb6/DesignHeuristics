import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import StartHeader from './StartHeaderComponent';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

function RenderCard (){
    return(
        <Card height='300' width='50'>
            <CardImg src= "assets/SelectYourWay_left.jpg" width={20} height={250} alt= "Tutorials"/>
            <CardBody>
                <CardTitle> <h3><strong>Tutorials</strong></h3> </CardTitle>                
                <CardText> Here you will find tutorials on how to use our app and how design heuristics help you acchieve better designs.</CardText>
            </CardBody>
        </Card>
    )
}



class YourWay extends Component{

    

    render(){
        return(
            <div className='container'>
                <div className='row align-items-start'>
                    <div className='col-12 col-md m-1'>
                        <StartHeader/>
                        <RenderCard  />
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}
export default YourWay;