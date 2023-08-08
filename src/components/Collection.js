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
    console.log("props: ", props.item)

    function forwardHeuristicPage(selectedOne){
        amplitude.getInstance().logEvent(`${selectedOne.title}`)
        var heuristicUrl= selectedOne.shortId+ '/' + selectedOne.title.trim().replace(/\s+/g, '-').toLowerCase();
        setisHeuristicClicked(!isHeuristicClicked)
        setSelectedHeuristic(selectedOne)
        props.history.push(heuristicUrl)
        setIsModalOpen(!isModalOpen)

    }
    //console.log("item: ", props.item)
    function closeModal(){
        setIsModalOpen(!isModalOpen)
    }
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    const heuristic= sampleData.map((heuristic)=>{
        var uniqueEffectCategory= [];
        var effectCategoryArray= [];
        for (let i=0; i<heuristic.positiveEffects.length; i++){
            effectCategoryArray.push(heuristic.positiveEffects[i].effectCategory)

        }
        uniqueEffectCategory= effectCategoryArray.filter(onlyUnique)
        var effectCategory=uniqueEffectCategory.map(( category) =>{
            return  category})

        var effectCategorySpecification=heuristic.positiveEffects.map(( positiveEffect) =>{
            return  positiveEffect.effectCategorySpecification})
        return(
            <Row className='d-flex align-items-center' style={{marginBottom:'25px', borderStyle:'groove'}}>
                <Col md={2} style={{fontSize:'15px', marginRight:'1vw', textAlign:'center'}}>
                    {effectCategory.join(", ")}
                </Col>
                <Col md={3} style={{fontSize:'15px', marginRight:'1vw'}}>
                    {effectCategorySpecification.join(", ")}
                </Col>
                <Col md={1} style={{fontSize:'15px', marginRight:'1vw', textAlign:'center'}}>
                    {heuristic.adressedSystemLevel}
                </Col>
                <Col md={1} style={{fontSize:'15px', marginRight:'1vw', textAlign:'center'}}>
                    {heuristic.artefactCategorization}
                </Col>
                <Col md={1} style={{fontSize:'15px', marginRight:'1vw', textAlign:'center'}}>
                    {heuristic.rating}
                </Col>
                <Col md={3} >
                    <Card key={heuristic.id} >
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
                        <Col md={2} style={{marginRight:'1vw', textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Effect Category</h3>
                        </Col>
                        <Col md={3} style={{marginRight:'1vw', textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Effect Specification</h3>
                        </Col>
                        <Col md={1} style={{marginRight:'1vw', textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Adressed System Level</h3>
                        </Col>
                        <Col md={1} style={{marginRight:'1vw', textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Artefact Categorization</h3>
                        </Col>
                        <Col md={1} style={{marginRight:'1vw', textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Rating</h3>
                        </Col>
                        <Col md={3} className='d-flex align-items-center' style={{textAlign:'center'}}>
                            <h3 style={{fontSize:"1.3vw"}}>Applicable heuristic</h3>
                            <i onClick={()=>handleSort()} className="fa fa-arrow-down"></i>
                        </Col>
                    </Row>
                    <Row >
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