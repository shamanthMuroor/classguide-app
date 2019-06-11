import React from 'react';
import StudItems from './StudItems';

class StudList extends React.Component {
	render() {
		let filteredList
		if(this.props.tag) {
			filteredList = this.props.studs.filter((students) => {
				return (
					students.Caste.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
				)
			})
		}
		else {
			filteredList = this.props.studs.filter((students) => {
				return (
					students.name.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
					||
					students.regno.toString().indexOf(this.props.filteredValue) !== -1
					||
					students.dob.toString().indexOf(this.props.filteredValue) !== -1
					||
					students.gender.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
	
				)
			})
		}

		let studentList =
			<div style={{ margin: '50px 20px 100px 20px', padding: '20px' }}>
				<h3>No data Found!</h3>
				<small style={{ color: 'gray' }}>(Note: Please check your internet connection)</small>
			</div>
			
		if (filteredList.length > 0) {
			studentList = filteredList.map((stud, i) => {
				return <StudItems key={i} slno={++i} stud={stud} setReg={this.props.setReg} />
			})
		}

		return (
			<React.Fragment>
				{studentList}
			</React.Fragment>
		)
	}
}

export default StudList;
