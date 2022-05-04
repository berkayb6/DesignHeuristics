import React, { Component } from 'react';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, CardImg} from 'reactstrap';


function RenderDetailItem({item,type}){

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
            <CardImg className='align-items-center' src={item}></CardImg>
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

    sendComment(event){
        alert("Comment: " + this.comment.value );
        event.preventDefault();
    }
    
    render() {
        const selectedHeuristic= this.props.selectedOne;
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
        
        const comments= selectedHeuristic.comments.map((comment)=>{
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
                    <Form onSubmit={this.sendComment}>
                        <FormGroup>
                            <Label htmlFor="comment"></Label>
                            <Input type="text" id="comment" name="comment" style={{width:"400px"}} innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup >
                            <Button type="submit" value="submit" color="light"> Send comment</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}
export default HeuristicDetails;