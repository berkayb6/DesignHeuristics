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

    function forwardHeuristicPage(selectedOne){
        amplitude.getInstance().logEvent(`${selectedOne.title}`)
        var heuristicUrl= selectedOne.shortId+ '/' + selectedOne.title.trim().replace(/\s+/g, '-').toLowerCase();
        setisHeuristicClicked(!isHeuristicClicked)
        setSelectedHeuristic(selectedOne)
        props.history.push(heuristicUrl)
        setIsModalOpen(!isModalOpen)

    }
    console.log("item: ", props.item)
    function closeModal(){
        setIsModalOpen(!isModalOpen)
    }
    const heuristic= sampleData.map((heuristic)=>{
        var effectCategory=heuristic.positiveEffects.map(( positiveEffect) =>{
            return  positiveEffect.effectCategory})

        var effectCategorySpecification=heuristic.positiveEffects.map(( positiveEffect) =>{
            return  positiveEffect.effectCategorySpecification})

            {console.log("heuristics: ", heuristic)}
        return(
            <Row className='d-flex align-items-center'>
                <Col md={2} >
                    
                    {effectCategory.join(", ")}
                </Col>
                <Col md={1} >
                    {effectCategorySpecification.join(", ")}
                </Col>
                <Col md={2} >
                    {heuristic.adressedSystemLevel}
                </Col>
                <Col md={2} >
                    {heuristic.artefactCategorization}
                </Col>
                <Col md={1} >
                    {heuristic.rating}
                </Col>
                <Col md={4} >
                    <Card key={heuristic.id}>
                        <CardBody >
                            <CardText onClick={()=>forwardHeuristicPage(heuristic)}> {heuristic.title}</CardText>
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
                                <h3>Effect Category</h3>
                            </Col>
                            <Col md={1}>
                                <h3>Effect Specification</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Adressed System Level</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Artefact Categorization</h3>
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

    }
    else
        return(
            <div>

            </div>
        )
    
}
export default withRouter(Collection);