import React from 'react';

class TagDetails extends React.Component {       
    componentWillMount = () => { 
        // console.log('id:' + tag)
        // console.log(this.props.stud)
        // this.props.studs.forEach(stud => {
        //     let arr= []
        //     arr.push({
        //         id: stud.id,
        //         ...stud.data()
        //     })
        //     this.setState({students: this.state.students.concat(arr)})
        // })
    }

    render() {
        const { name, location, caste, reg } = this.props.stud;
        let html = ''
        if(this.props.tag === 'scst') {
            if(caste === 'scst') {
                html = 
                <div>
                    <h6>{name}</h6>
                    <h6>{reg}</h6>
                    <h6>{caste}</h6>
                    <h6>{location}</h6>
                </div>
            }
                      
        }
        else if(this.props.tag === 'rural') {           
            if(location === 'rural') {
                html = 
                <div> 
                    <h6>{name}</h6>
                    <h6>{reg}</h6>
                    <h6>{caste}</h6>
                    <h6>{location}</h6>
                </div>
            }  
        }
        return (
            <React.Fragment>
                <div className="mt-5">
                        {/* {console.log(this.props.tag)} */}
                        {/* {console.log(this.props.stud.caste)} */}
                        { html }
                </div>
            </React.Fragment>
        ) 
    }
}

export default TagDetails;
