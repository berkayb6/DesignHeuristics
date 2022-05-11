import React, { Component } from 'react';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, CardImg, Row} from 'reactstrap';
import { LocalForm, Control} from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';

/** Please read first the explanation under HeuristicDetails */
function RenderDetailItem({item,type}){
    /**Since there are different kind of visualities with respect to heuristic properties,
     * there are different kind of rendering. To do the right rendering, the type variable is used.
     * 
     */
    if (type=='positive'){
        return(
            <Card>
                <CardBody className='align-items-center' style={{backgroundColor:'#BAEDAD'}}>
                    {item}
                </CardBody>
            </Card>
        )
    }
    if (type=='negative'){
        return(
            <Card>
                <CardBody className='align-items-center' style={{backgroundColor:'#F7BCB0'}}>
                    {item}
                </CardBody>
            </Card>
        )  
    } 
    if (type=='graphic'){
        return(
            <CardImg className='align-items-center' src={baseUrl + item}></CardImg>
        )  
    } 
    if (type=='source'){
        return(
            <div>

                {item}
            </div>
        )  
    } 
    if (type=='comment'){
        return(
            <Card>
                
                <CardBody className='m-1 align-items-center' >
                    <strong>{item.author}</strong>
                    <CardText>
                        {item.comment}
                    </CardText>
                </CardBody>
            </Card>
        )  
    } 
    else
        return(
            <Card>
                <CardBody className='align-items-center' >
                    {item}
                </CardBody>
            </Card>
        )
    
}

class HeuristicDetails extends Component{

    constructor(props){
        super (props);

        this.sendComment=this.sendComment.bind(this);
    }
    sendComment(values){
        this.props.addComment(this.props.selectedOne.id, values.author, values.comment);
    }
    
    render() {
        console.log(this.state)

        /**To set the selected heuristic as the selected one, it is defined to avoid writing more codes */
        const selectedHeuristic= this.props.selectedOne;
        const selectedComments= this.props.comments;

        /**Since each property of the seleceted heuristic has a different kind of visuality,
         * the type of these properties has been defined in each variable to improve the simplicity and
         * avoid more coding!
         * 
         * Each item or property will be rendered via the function defined above (RenderDetailItem)
         * The functions seeks for two property: item that should be rendered, and the type of that */

        const positiveInfluence= selectedHeuristic.positiveInfluence.map((influence)=>{
            let type= 'positive';
            return(
                <div className='col-12 col-md-3 m-1 text-center' >
                    <RenderDetailItem item={influence} type={type}/>
                </div>
            )
        })

        const negativeInfluence= selectedHeuristic.negativeInfluence.map((influence)=>{
            let type= 'negative';
            return(
                <div className='col-12 col-md-3 m-1 text-center' >
                    <RenderDetailItem item={influence} type={type}/>
                </div>
            )
        })

        const applicableIndustry = selectedHeuristic.applicableIndustry.map((industry)=>{
            let type= 'industry';
            return(
                <div className='col-12 col-md-4 m-1 text-center ' >
                    <RenderDetailItem item={industry} type={type}/>
                </div>
            )
        })

        const graphics= selectedHeuristic.graphics.map((graphic)=>{
            let type= 'graphic';
            return(
                <div className='col-12 col-md-5 m-1 text-center ' >
                    <RenderDetailItem item={graphic} type={type}/>
                </div>
            )
        })

        const sources= selectedHeuristic.sources.map((source)=>{
            let type= 'source';
            return(
                <div className='col-12 m-1' >
                    <RenderDetailItem item={source} type={type}/>
                </div>
            )
        })
        
        const comments= selectedComments.map((comment)=>{
            let type= 'comment';
            return(
                <div key={comment.id} className='col-12 m-1  '>
                    <RenderDetailItem item={comment} type={type}/>
                </div> 
            )
        })


        return (
            <div className='container'>
                <div className='row row-header align-items-center'>
                    <div className='col-12 col-md-4'>
                        Design Advice
                    </div>
                    <Card className='col-12 col-md-8'>
                        <CardBody>
                            {selectedHeuristic.title}
                            
                        </CardBody>
                    </Card>
                    <Card className='col-12 col-md-4 offset-md-4'>
                        <CardBody>
                            Add to library
                        </CardBody>
                    </Card>
                </div>
                <div className='row row-content' >
                    {/** After defining how to render each property of the corresponding heuristic,
                     * there will be rendered below.
                     */}
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Possible positive influence</h3>
                        {positiveInfluence}
                    </div>
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Possible negative influence</h3>
                        {negativeInfluence}
                    </div>
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Applicable industry</h3>
                        {applicableIndustry}
                    </div>
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Graphics</h3>
                        {graphics}
                    </div>
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Sources</h3>
                        {sources}
                    </div>
                    <div className='row' style={{marginBottom:'40px'}}>
                        <h3> Comments</h3>
                        {comments}
                    </div>
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
        );
    }
}
export default HeuristicDetails;