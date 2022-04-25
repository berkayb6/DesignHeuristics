import React from "react";
import Link from "react-router-dom/Link";
import { Card, CardImg } from "reactstrap";

function MoreInfo(){

    return (
        

        <div className='container'>
            
            <div className='row row-header home-page-header'>
                <div className='col-12 col-sm-12'>
                    <h5><strong>Department of Industrial Information Technology</strong></h5>
                </div>
            </div>
            <div className='row row-content align-items-center'>
                <div className='col-12 col-md-6 '>
                    <div className='col-12'>
                        <h1> Design for X</h1>
                        <p className="w-75 p-3">The scientific community is coming up with new guidelines to make products better, more sustainable und efficient. Worlwide designers find their own heuristics from their individual expertise. We created this platform to bring them together and learn from each other</p>
                    </div>
                    <div className='col-12 justify-content-around'>
                        
                        <Link className='col-md-3  btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/start' >
                        <h5>Go Back</h5>
                        </Link>

                    </div>
                   
                    
                </div>

                <div className='col-12 col-md-5'>
                    
                    <Card>
                        <CardImg src= "assets/bycle.jpg" width={100} height={250}/>
                    </Card>

                
                </div>
                

            </div>
        </div>
    )
}

export default MoreInfo;