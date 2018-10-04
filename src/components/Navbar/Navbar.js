import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import './navbar.css';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-light bg-light Navbar ">
                <Link to="/">
                    <h5 className="Navbar__title">Instagram - Fake </h5>
                </Link>

                <Link to={`/user/${this.props.userId}`} > 
                    <img src={this.props.avatar} className="rounded-circle nav-img-avatar" />
                </Link>

                <Link to="/photoUpload" > Public new photo </Link>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" 
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to="/me" className="dropdown-item">Profile</Link>
                        <a className="dropdown-item" href="#">Logout</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;