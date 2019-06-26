import React from 'react';
import { Link } from 'react-router-dom';  
import logo from '../../images/aloylogo.png'; 
import { auth } from '../../App'


class Navbar extends React.Component {
    state = {
        admin: false
    }

    componentWillMount = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ admin: true })
            }
        })
    }

	handleAdminLogout = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				auth.signOut()
                this.setState({ admin: false })
			}
		})
		this.props.history.push('/login')
	}

    render() {
        return (
            <nav className="navbar" style={{ backgroundColor: '#333333' }}> 
                <div style={{color: 'white', fontSize: '20px'}}>
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="College Logo" />
                    SAC
                </div>

                <Link className="nav-link" exact="true" to="#" onClick={this.handleAdminLogout} style={{fontWeight: '600'}}>Logout</Link>
            </nav>
        )
    }
}

export default Navbar;