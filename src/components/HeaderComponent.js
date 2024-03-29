import React, { Component } from 'react';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Button, Card, CardImg} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { amplitude } from '../utilities/amplitude';

class Header extends Component{
    
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
    handleLogout() {
        this.props.logoutUser();
    }

    render(){
        return(
            <div style={{backgroundColor:"#C9E2FF"}}>
                <Navbar dark expand="md" > {/* expand makes that full screen for md */}
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} /> {/* Only appears on extrasmall to small screensizes
                        onClick calls the function "toggleNav" which needs to be defined */}
              
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar >
                            <Nav className='col-12 col-md-5' navbar>
                                <Card className='logo'>
                                    <CardImg src= {`${baseUrl}assets/BD-logolanding.png`} width={20} height={50}/>
                                </Card>
                            </Nav>
                            <NavItem className='col-12 col-md-2' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" to="/selectyourway" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Home</strong></span> 
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-5' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("dfxCollectionClicked")} to="/design-heuristic-collection" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Knowledge Base</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className='col-12 col-md-2' style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <NavLink className="nav-link" onClick={this.logClick("searchClicked")} to="/search" style={{color:"black"}}>
                                    <span className='fa-lg'><strong>Search</strong></span>
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className='ms-auto' navbar>
                                { !this.props.auth.isAuthenticated ?
                                    
                                    <Nav className='ms-auto' navbar>
                                        
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                        <NavItem  >
                                            <NavLink className="nav-link" style={{color:"black"}} to='/register'  >
                                                <span className='fa-lg'>Register</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem  >
                                            <NavLink className="nav-link" to="/login" style={{color:"black"}}>
                                                <span className='fa-lg'>Login</span> 
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    
                                    :
                                    <div className='row align-items-center'>
                                        <div className='col-12 col-md-4'>
                                            <NavLink className="nav-link fa fa-user-circle fa-3x"  style={{color:"black"}} to='/your-profile'/>
                                        </div>
                                        <div className='col-12 col-md-8'>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>

                                        </div>
                                    </div>
                                }
                               
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
export default Header;