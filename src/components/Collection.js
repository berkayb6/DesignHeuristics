import React, { useEffect, useState } from 'react';
import { Loading } from './LoadingComponent';
import {withRouter } from 'react-router-dom';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { amplitude } from '../utilities/amplitude';
import HeuristicDetails from './HeuristicDetailsComponent';
import Lib from 'react-xarrows';

function Collection (props){

    /** Collection Component has also an property which is showing the details of a specific heuristic
     * that the user clicked on. To show that as a pop-up (modal), it contains the HeuristicDetailsComponent inside of it.
     */

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isHeuristicClicked, setisHeuristicClicked] = useState(false)
    const [selectedHeuristic, setSelectedHeuristic] = useState('')
    const [sampleData, setSampleData] = useState(props.item)

    useEffect(()=>{
        setSampleData(props.item)
    }, [props.item])

    function handleSort(){
        const sortedData = [...sampleData].sort((a,b) =>{
            return a.title > b.title ? 1: -1
        })
        setSampleData(sortedData)
    
    }

    function toggleModal(selectedOne){
        amplitude.getInstance().logEvent(`${selectedOne.title}`)
        var titleDashed= selectedOne.title.trim().replace(/\s+/g, '-').toLowerCase();
        setisHeuristicClicked(!isHeuristicClicked)
        setSelectedHeuristic(selectedOne)
        props.history.push(titleDashed)
        setIsModalOpen(!isModalOpen)

    }

    function closeModal(){
        setIsModalOpen(!isModalOpen)
        //props.history.push('/design-heuristic-collection')
    }
    const heuristic= sampleData.map((heuristic)=>{
        return(
            <Row className='d-flex align-items-center'>
                <Col md={2} >
                    {heuristic.designFor.join(", ")}
                </Col>
                <Col md={1} >
                    {heuristic.industry.join(", ")}
                </Col>
                <Col md={2} >
                    {heuristic.phase.join(", ")}
                </Col>
                <Col md={2} >
                    {heuristic.productDimension.join(", ")}
                </Col>
                <Col md={1} >
                    {heuristic.rating}
                </Col>
                <Col md={4} >
                    <Card key={heuristic.id}>
                        <CardBody >
                            <CardText onClick={()=>toggleModal(heuristic)}> {heuristic.title}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    })

    
        
        /** The heuristic defined just below contains all the informations of heuristics that the user wants to see: designfor, level etc.
         * A short explanation about the heuristic stands as the last column. If the user wants to have more information
         * about this specific heuristic, s/he should click on the explanation to toggle the pop-up.
         */
        

    if (props.isSearchClicked){

        if (props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
                return(
                    <Container fluid style={{ paddingLeft: 30, paddingRight: 0 }}>
                        
                        <Row className='d-flex align-items-center'>
                            <Col md={2}>
                                <h3>Design for</h3>
                            </Col>
                            <Col md={1}>
                                <h3>Industry</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Phase</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Product Dimension</h3>
                            </Col>
                            <Col md={1}>
                                <h3>Rating</h3>
                            </Col>
                            <Col md={3} className='d-flex align-items-center'>
                                <h3>Applicable heuristic</h3>
                                <i onClick={()=>handleSort()} className="fa fa-arrow-down"></i>
                            </Col>
                        </Row>
                        <Row className='d-flex'>
                                {heuristic}
                        </Row>
                    </Container>
                )
           
            // else
            //     {console.log("url: ", props.heuristicUrl.name)}
            //     return(
            //         <Container fluid style={{ paddingLeft: 30, paddingRight: 0 }}>
                        
            //             <Row className='d-flex align-items-center'>
            //                 <Col md={2}>
            //                     <h3>Design for</h3>
            //                 </Col>
            //                 <Col md={1}>
            //                     <h3>Industry</h3>
            //                 </Col>
            //                 <Col md={2}>
            //                     <h3>Phase</h3>
            //                 </Col>
            //                 <Col md={2}>
            //                     <h3>Product Dimension</h3>
            //                 </Col>
            //                 <Col md={1}>
            //                     <h3>Rating</h3>
            //                 </Col>
            //                 <Col md={3} className='d-flex align-items-center'>
            //                     <h3>Applicable heuristic</h3>
            //                     <i onClick={()=>handleSort()} className="fa fa-arrow-down"></i>
            //                 </Col>
            //             </Row>
            //             <Row className='d-flex'>
            //                     {heuristic}
            //             </Row>

            //             {/* {console.log(url)} */}

            //             {/**If the user has clicked on the explanation, then the modal will be shown. 
            //              * For this to be rendered properly, the information which heuristic has been clicked,
            //              * will be sent to the component HeuristicDetails along with all data of that heuristic.
            //              */}

            //             <Link className='text-decoration-none card-block'style={{color:"black"}} to={props.heuristicUrl.name}>
            //                  <HeuristicDetails selectedOne= {selectedHeuristic} 
            //                         postComment= {props.postComment} /> 
            //             </Link>
            //             {/* <Modal className='modal-lg' isOpen={isModalOpen} toggle={()=>closeModal()} >
            //                 <ModalHeader className='startpage' toggle={()=>closeModal()}></ModalHeader>
            //                 <ModalBody className='startpage'>
            //                     <HeuristicDetails selectedOne= {selectedHeuristic} 
            //                         postComment= {props.postComment} />
            //                 </ModalBody>
            //             </Modal> */}
                        
            //         </Container>
            //     )

    }
    else
        return(
            <div>

            </div>
        )
    
}
export default withRouter(Collection);