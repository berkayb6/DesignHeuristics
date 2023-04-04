import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

const YouRock = props => {
    
    return (
        <>
            <div className='container'>
                
                <div className='row row-header home-page-header'>
                    <div className='col-12 col-md-6 col-sm-7'>
                        <h5><strong>Department of Industrial Information Technology</strong></h5>
                    </div>
                </div>
                <div className='row row-content align-items-center'>
                    <div className='col-12 col-md-6' >
                            <h1 style={{fontSize: '100px'}}>YOU</h1>
                            <h1 style={{fontSize: '100px'}}><strong>ROCK</strong></h1>
                            <p style={{fontSize: 'large'}}className="w-75 p-3">Thank you for submitting a new heuristic! Thanks to people like you, designers across the world learn to build better products.
                                You will be redirected to your home screen in 5 seconds.</p>

                    </div>
                    

                    <div className='col-12 col-md-4'>
                        <CardImg src={`${baseUrl}assets/robot.png`} width={100} height={800}/>
                    </div>
                </div>
                
            </div>
            <div className='container'>
                <div className='row row-content'>
                    <div className='col-12 col-md-6'>

                        <Link className='col-md-3 btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/design-heuristic-collection' >
                            <h5>Go</h5>
                        </Link>
                    </div>

                </div>
                

            </div>
        </>
    )

}

export default YouRock;