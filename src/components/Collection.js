import React, { useEffect, useState } from 'react';
import { Loading } from './LoadingComponent';
import {withRouter } from 'react-router-dom';
import { Col, Container, Row, Card, CardBody, CardText} from 'reactstrap';
import { amplitude } from '../utilities/amplitude';

function Collection (props){

    /** Collection Component has also an property which is showing the details of a specific heuristic
     * that the user clicked on. To show that as a pop-up (modal), it contains the HeuristicDetailsComponent inside of it.
     */
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    /** isHeuristicClicked variable contains the information if the user clicked on any heuristic to go to the detail page of that heuristic*/
    const [isHeuristicClicked, setisHeuristicClicked] = useState(false)

    /** if the user clicked on a heuristic, the selected heuristic will be saved to give the user more information about itself */
    const [selectedHeuristic, setSelectedHeuristic] = useState('')

    /** Sample data represents all the heuristics that are filtered out and is saved for the case that the user wanted to sort the heuristics alphabetically.
     * In this regard, useEffect and handleSort work for that purpose.
     */
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

    /** If the user clicked on a specific heuristic, the user will be redirected to the page of that heuristic */
    function forwardHeuristicPage(selectedOne){
        amplitude.getInstance().logEvent(`${selectedOne.title}`)
        var heuristicUrl= selectedOne.shortId+ '/' + selectedOne.title.trim().replace(/\s+/g, '-').toLowerCase();
        setisHeuristicClicked(!isHeuristicClicked)
        setSelectedHeuristic(selectedOne)
        props.history.push(heuristicUrl)
        setIsModalOpen(!isModalOpen)

    }
    function closeModal(){
        setIsModalOpen(!isModalOpen)
    }

    /** The following function is to make the content of the heuristic unique. This means, for example the heuristic has a property multiple times. This property should be seen only once in the collection page */
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    /** The heuristics that will be showed are defined as follows: */
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

    /** if the search button clicked the following cases will be tested:
     * - if the heuristics are still loading, then a turning circle will be popped up
     * - if any error occurs, the error message will be showed
     * - and if they are loaded correctly, the user will then see the heuristics.
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
                    <Row style={{fontFamily:'sans-serif'}}>
                        {`${props.item.length}`} Heuristics have been found with selected filters:
                    </Row>
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