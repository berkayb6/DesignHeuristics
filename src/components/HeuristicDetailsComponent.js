import React, { Component, useState } from 'react';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, CardImg, Row} from 'reactstrap';
import { LocalForm, Control} from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';
import ReactStars from "react-rating-stars-component";
import Header from './HeaderComponent';
import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { Loading } from './LoadingComponent';
/** Please read first the explanation under HeuristicDetails */
function RenderDetailItem({item, type, id}){
    /**Since there are different kind of visualities with respect to heuristic properties,
     * there are different kind of rendering. To do the right rendering, the type variable is used.
     * 
     */
    if (type=== 'dimension'){
        return( 
            <Card className='heuristicDetailsCard align-items-center'>
                <Row className='heuristicDetailsCardBody'>
                    <Col md={6}>
                        <CardImg src= {`${baseUrl}assets/${item.replace(/ /g,'')}.jpg`} className='heuristicDetailsCardImage'/>
                    </Col>
                    <Col md={6}>
                        <CardTitle style={{display: "flex", justifyContent:'center', alignItems:'center', color: "black"}}> <h3><strong>{item}</strong></h3> </CardTitle>                
                    </Col>
                </Row>
            </Card>
        )
    }
    if (type==='positive'){
        return(
            <Card className='justify-content-center' style={{backgroundColor:'#BAEDAD', height: "50px", width: "auto", borderRadius: "10px", border: 0}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )
    }
    if (type==='negative'){
        return(
            <Card className='justify-content-center' style={{backgroundColor:'#F7BCB0', height: "50px", width: "auto", borderRadius: "10px", border: 0}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )  
    } 
    if (type==='image'){
        return(
            <CardImg className='align-items-center' src={`${baseUrl}assets/${id}/${item}`}>

            </CardImg>
        )  
    }
    if (type==='source'){
        return(
            <div>
                {item}
            </div>
        )  
    } 
    if (type==='comment'){
        return(
            <Card>
                <CardBody className='m-1 align-items-center' >
                    <strong>{item.author.username}</strong>
                    <CardText>
                        {item.comment}
                    </CardText>
                </CardBody>
            </Card>
        )  
    } 
    else
        return(
            <Card className='justify-content-center' style={{ height: "50px", width: "auto", borderRadius: "10px", border: 0}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )
    
}

class HeuristicDetails extends Component{   

    constructor(props){
        super (props);
        this.state = {
            didMount: false
        }

        this.sendComment=this.sendComment.bind(this);
    }
    componentDidMount(){
        this.setState({
            didMount: true
        })
    }
    
    sendComment(values){
        /** After the user submits the feedback, this function will be called to dispatch the input
        * being the heuristic which the user sends a feedback for, user's name and comment to the server.
        */
       // this.setState({ comments: [...this.state.comments, this.props.postComment(this.props.selectedOne._id, values.author, values.comment)]})
       this.props.postComment(this.props.heuristics._id, values.author, values.comment);
       window.location.reload(false);
        
    }
    render() {
        if (!this.props.heuristicsLoading){
                    /**To set the selected heuristic as the selected one, it is defined to avoid writing more codes */
            const selectedHeuristic= this.props.selectedHeuristic;
            const id = selectedHeuristic._id;
            /**Since each property of the seleceted heuristic has a different kind of visuality,
             * the type of these properties has been defined in each variable to improve the simplicity and
             * avoid more coding!
             * 
             * Each item or property will be rendered via the function defined above (RenderDetailItem)
             * The functions seeks for two property: item that should be rendered, and the type of that */
            
            // var dimensions = selectedHeuristic.productDimension[0].split(/[,]+/);
        

            
            // const productDimension= dimensions.map((dimension)=>{
            //     let type= 'dimension';
            //     return(
            //         <Col md={6} className="text-center">
            //             <RenderDetailItem item={dimension} type={type}/>
            //         </Col>
            //     )
            // })

            // const affectedSystemLevel = selectedHeuristic.adressedSystemLevel.map((systemLevel)=>{
            //     let type= "systemLevel";
            //     return (
            //         <Col md={4} className="text-center">
            //             <RenderDetailItem item={systemLevel} type={type}/>
            //             <br/>
            //         </Col>
            //     )
            // })
            const positiveInfluence= selectedHeuristic.positiveEffects.map((effect)=>{
                
                let type= 'positive';
                return(
                    <Col md={4} className="text-center">
                        <RenderDetailItem item={effect.effectCategorySpecification} type={type}/>
                        <br/>
                    </Col>
                )
            })

            const rating = {
                size: 30,
                count: 5,
                activeColor: "yellow",
                value: selectedHeuristic.rating,
                isHalf: false,
                emptyIcon: <i className="fa fa-star" />,
                halfIcon: <i className="fa fa-star-half-alt" />,
                filledIcon: <i className="fa fa-star" />
            };
            const negativeInfluence= (selectedHeuristic.negativeEffects.length>0 ? selectedHeuristic.negativeEffects.map((effect)=>{
                
                let type= 'negative';
                return(
                    <Col md={4} className="text-center">
                        <RenderDetailItem item={effect.effectCategorySpecification} type={type}/>
                    </Col>
                )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                        <strong>Currently, no known negative influence property</strong>
                        </CardBody>
                    </Card>
                </Col>
            )
            const applicableIndustry = selectedHeuristic.industry.map((industry)=>{
                let type= 'industry';
                return(
                    <Col md={4} className='text-center ' >
                        <RenderDetailItem item={industry} type={type}/>
                    </Col>
                )
            })

            const images= (selectedHeuristic.image.length>0 ? selectedHeuristic.image.map((image)=>{
                let type= 'image';
                return(
                    <Col md={5} className='text-center ' >
                        <RenderDetailItem item={image} type={type} id={id}/>
                    </Col>
                )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                            <strong>Currently, no known graphic property</strong>
                        </CardBody>
                    </Card>
                </Col>
            )

            const sources= selectedHeuristic.sources.map((source)=>{
                let type= 'source';
                return(
                    <Col>
                        <RenderDetailItem item={source} type={type}/>
                    </Col>
                )
            })
            const comments= (selectedHeuristic.comments.length>0 ? selectedHeuristic.comments.map((comment)=>{
                let type= 'comment';
                return(
                    <Col key={comment._id}>
                        <RenderDetailItem item={comment} type={type}/>
                    </Col> 
                )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                            <strong>Currently, no comment has been posted yet!</strong>
                        </CardBody>
                    </Card>
                </Col>
            )

            const secondExample = {
                size: 30,
                count: 5,
                activeColor: "yellow",
                value: 0,
                isHalf: false,
                emptyIcon: <i className="fa fa-star" />,
                halfIcon: <i className="fa fa-star-half-alt" />,
                filledIcon: <i className="fa fa-star" />,
                onChange: newValue => {
                    console.log(`Example 2: new value is ${newValue}`);
                }
            };
            if (this.props.heuristicsLoading) {
                return(
                    <div className='container'>
                        <div className='row'>
                            <Loading/>
                        </div>
                    </div>
                )
            }
            else if (this.props.heuristiscErrMess){
                return(
                    <div className='container'>
                        <div className='row'>
                            <h4>{this.props.heuristiscErrMess}</h4>
                        </div>
                    </div>
                )
            }
            else
                return (
                    <>
                        <Header auth={this.props.auth}
                            logoutUser={this.props.logoutUser}/>
                        <div className='container' style={{fontFamily: 'sans-serif'}}>
                            <div className='row row-header align-items-center'>
                                <Row>
                                    <Col md={4}>
                                        <h3>Design Advice</h3>
                                    </Col>
                                    <Col md= {6} >
                                        <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                            <CardBody style={{border: 0, paddingInline: "20px"}}>
                                                {selectedHeuristic.title}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col md={{offset:4, size:2}} style={{ height: "auto", width: 'auto', borderRadius: "10px"}}>
                                        <Card style={{ height: "auto", width: 'auto', borderRadius: "10px"}}>
                                            <CardBody style={{border: 0, paddingInline: "20px"}}>
                                                <strong>Add to library</strong>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </div>
                            <div className='row row-content' style={{rowGap: "60px"}}>
                                {/** After defining how to render each property of the corresponding heuristic,
                                 * there will be rendered below.
                                 */}
               
                                
                                <Row>
                                    <h4><b>Affected System Level </b></h4> 
                                    <Col md= {6} style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                        <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                            <CardBody style={{border: 0, paddingInline: "20px"}}>
                                                {selectedHeuristic.adressedSystemLevel}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <h4><b>Affected Artefact Categorization</b></h4> 
                                    <Col md= {6} style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                        <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                            <CardBody style={{border: 0, paddingInline: "20px"}}>
                                                {selectedHeuristic.artefactCategorization}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <h4><b>Possible positive influence </b></h4> 
                                    {positiveInfluence}
                                </Row>
                                <Row>
                                    <h4><b>Possible negative influence </b></h4> 
                                    {negativeInfluence}
                                </Row>
                                <Row>
                                    <h4><b>Rating</b></h4> 
                                    <ReactStars {...rating} />
                                </Row>
                                <Row>
                                    <h4><b>Applicable industry</b></h4> 
                                    {applicableIndustry}
                                </Row>
                                <Row>
                                    <h4><b>Description</b></h4>
                                    {selectedHeuristic.description?
                                    <Col md= {6} style={{ height: "auto", width: "auto", borderRadius: "10px"}}>
                                        <Card style={{ height: "auto", width: "auto", borderRadius: "10px"}}>
                                            <CardBody style={{border: 0, paddingInline: "20px"}} className='m-1 align-items-center' >
                                                <CardText>
                                                    {selectedHeuristic.description}
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    :
                                    <Col md={5} className="text-center">
                                        <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                                            <CardBody >
                                                <strong>Currently, no description is available</strong>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    }
                                </Row>
                                <Row>
                                    <h4><b>Graphics</b></h4> 
                                    {images}
                                </Row>
                                <Row>
                                    <h4><b>Sources</b></h4> 
                                    {sources}
                                </Row>
                                <Row>
                                    <h4><b>Comments</b></h4> 
                                    {comments}
                                </Row>
                                <Row style={{fontFamily: "sans-serif"}}>
                                    <h4><b>Rate the heuristic</b></h4>
                                    <ReactStars {...secondExample} />
                                </Row>
                                <LocalForm onSubmit={(values)=>{this.sendComment(values)}}>
                                    <Row className='form-group'>
                                        <Col>
                                            <Label htmlFor="author"></Label>
                                            <Control.text model=".author" id="author" name="author" 
                                                className= "form-control" placeholder="Your Name" 
                                                style={{width:"400px"}}  />
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col>
                                            <Label htmlFor="comment"></Label>
                                            <Control.text model=".comment" id="comment" name="comment"
                                                className= "form-control" placeholder="Your Feedback"
                                                style={{width:"400px", marginBottom:"20px"}}  />
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col>
                                            <Button type="submit"  value="submit" color="light"> Send comment</Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </div>
                        </div>
                    </>
                );

        }
    }
}
export default HeuristicDetails;