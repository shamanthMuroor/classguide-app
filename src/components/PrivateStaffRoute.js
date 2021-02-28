import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import {host} from '../App';
import { auth } from '../App';

class PrivateStaffRoute extends React.Component {
	state = {
		user: false,
		done: false
	}

	componentWillMount = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: true, done: true })
			} else {
				this.setState({ user: false, done: true })
			}
		})
	}

	componentWillUnmount = () => {
		this.setState({ user: false, done: false })
	}

	render() {
		return(
			<div>
				{this.state.done &&
				<Route
					path={this.props.path}
					exact
					render={() => 
						this.state.user
						?
						(
						  <this.props.component />
						)
						:
						(
						  <Redirect to="/login" />
						)
					}
				/>
				}
			</div>
		)
	}
}



	// class PrivateStaffRoute extends React.Component {  
	//     state = {
	//       user: false,
	//       done: false,
	//       loading: true
	//     }
	//     componentWillMount = async () => {
	//       if(localStorage.staffAuth) {
	//         let user = JSON.parse(localStorage.getItem("staffAuth"));
	//         // console.log(user.token);
	//         axios.get(`${host}/auth`,{
	//           headers:{
	//             'Authorization': user.token
	//           }
	//         })
	//           .then(async data => {
	//                 // console.log(data)
	//                 await this.setState({user: true,done: true, loading: false})
	//           })
	//           .catch(async err => {
	//               // console.log(err.response);
	//               // if(err.response.status === 401) {
	//                 await this.setState({user: false,done: true}) 
	//                 localStorage.removeItem("staffAuth");
	//               // }
	//           });
	//       } else {
	//         localStorage.removeItem("staffAuth"); 
	//         this.setState({user: false,done: true})
	//       }
	//     }
	//     render() { 
	//       return(
	//         <div>
	//           { 
	//             this.state.loading 
	//             && 
	//             <React.Fragment>
	//               <div className="d-md-none" style={{marginTop: '150px'}}></div>
	//               <h5 style={{marginTop: "15vw", textAlign:'center', padding: '5px'}}>
	//                 Wait a moment while we load your app
	//               </h5>
	//               <div className="loader"></div>
	//             </React.Fragment>
	//           }
	//           {this.state.done &&
	//             <Route
	//               path={this.props.path}
	//               exact
	//               render={(props) => 
	//                 this.state.user
	//                 ?
	//                 (
	//                   <this.props.component {...props} />
	//                 )
	//                 :
	//                 (
	//                   <Redirect to="/login" />
	//                 )
	//               }
	//             />
	//           }
	//         </div>   
	//       )
	//     }
	//   }

	export default PrivateStaffRoute;