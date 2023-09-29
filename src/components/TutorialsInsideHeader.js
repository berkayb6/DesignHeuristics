import React, { Component } from 'react';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Button, Card, CardImg} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { amplitude } from '../utilities/amplitude';

class TutorialInsideHeader extends Component{
    
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.logClick = this.logClick.bind(this);

        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
            
        });
    }

    logClick(item){
        amplitude.getInstance().logEvent(`${item}`)
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
            <div >
                <Navbar dark expand="md" > {/* expand makes that full screen for md */}
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} /> {/* Only appears on extrasmall to small screensizes
                        onClick calls the function "toggleNav" which needs to be defined */}
              
                        <Collapse isOpen={this.state.isNavOpen} style={{marginLeft:'25px'}} navbar>
                            <Nav navbar >
                            <NavItem className='col-12 col-md-2' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" to="/quickly-explained" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Explained</strong></span> 
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-7' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("slidesClicked")} to="/slides" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Slides</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-7' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("graphicsClicked")} to="/infographic" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Graphics</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-7' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("lessonsClicked")} to="/lesson-design" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Lessons</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-7' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("videosClicked")} to="/videos" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Videos</strong></span>
                                </NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
export default TutorialInsideHeader;