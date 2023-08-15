import React from 'react';
import {Link} from 'react-router-dom';
import { CardImg } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RegisterCompleted(){

    return(
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
                            <p style={{fontSize: 'large'}}className="w-75 p-3">We are glad to that you are part of our community. From now on you can create your own heuristics, save others in your library or create your own projects!</p>

                    </div>
                    

                    <div className='col-12 col-md-4'>
                        <CardImg src={`${baseUrl}assets/robot.png`} width={100} height={800}/>
                    </div>
                </div>
                
            </div>
            <div className='container'>
                <div className='row row-content'>
                    <div className='col-12 col-md-6'>

                        <Link className='col-md-3 btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/selectyourway' >
                            <h5>Go</h5>
                        </Link>
                    </div>

                </div>
                

            </div>
        </>
    )
}
export default RegisterCompleted;