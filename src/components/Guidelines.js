import React from 'react';

class Guidelines extends React.Component {
  render() {
    return (
        <div className="d-flex justify-content-center">
            <div id="accordion" className="flex-column" style={{width: '75%', marginTop: '100px'}}>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0 ">
                            <button className="btn show d-flex justify-content-between" style={{width: '100%', paddingLeft:'0px', paddingRight:'0px'}} data-toggle="collapse" data-target="#GuidelinesOne" aria-expanded="true" aria-controls="GuidelinesOne">
                            <em>Class Guide System</em> <span><i className="fas fa-caret-down"></i></span>
                            </button>
                        </h5>
                    </div>

                    <div id="GuidelinesOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <ul type="square">
                                <li>The main objective of this system is to transform the class into team / WE- FORCE.</li>
                                <li>To develop a sense of identity, we feeling, and confidence among students.</li>
                                <li>To recognise the special gifts and talents of every student so as to promote their growth and development towards higher level of competency, creativity and fulfilment.</li>
                                <li>To establish adult to adult relationship between the staff and the students and to create a favourable environment in the campus to achieve authentic education.</li>
                                <p>Eg: The role of class guide/Mentor is best illustrated in case of Helen Keller. As a young child she was not only deaf and blind but nearly demented in her behaviour. It was because of the dedication, insight and hard work of her teacher Anne Sullivan Helen was able to realise her intellectual and artistic gifts.</p>
                            </ul>                            
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn collapsed d-flex justify-content-between" style={{width: '100%', paddingLeft:'0px', paddingRight:'0px'}} data-toggle="collapse" data-target="#GuidelinesTwo" aria-expanded="false" aria-controls="GuidelinesTwo">
                            <em style={{textAlign:'left'}}>An effective Class Guide</em> <span><i className="fas fa-caret-down"></i></span>
                            </button>
                        </h5>
                    </div>
                    <div id="GuidelinesTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body"> 
                        <ul type="square">        
                            <li>Transforms the class into a team by planning innovative activities and executing them through regular meetings. </li>
                            <li>Knows every student by name and is familiar with each student’s background, aptitude, capacity and talent. </li>
                            <li>Monitors attendance, progress and behavior in the campus </li>
                            <li>Helps the students to know their strength and weakness. </li> 
                            <li>Helps the student to keep a goal in life and encourage them to achieve it. </li>
                            <li>Gives special attention to slow learners, high achievers, deviant and economically poor students. </li>
                            <li>Recommends names to prizes, awards, scholarships, midday meals etc. </li>
                            <li>Provides academic, career and personal guidance. </li>
                            <li>Occasionally visits their houses especially when there is a tragedy at home. </li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button className="btn collapsed d-flex justify-content-between" style={{width: '100%', paddingLeft:'0px', paddingRight:'0px'}} data-toggle="collapse" data-target="#GuidelinesThree" aria-expanded="false" aria-controls="GuidelinesThree">
                            <em>Activities which could be taken up</em> <span><i className="fas fa-caret-down"></i></span>
                            </button>
                        </h5>
                    </div>
                    <div id="GuidelinesThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                            <ul type="square">
                                <li>Identify the slow learners and request the bright students to help them out on regular basis. A contract has to be worked out between the two.</li>
                                <li>Class as a whole is made responsible for the class discipline, participation in college activities like fests, sports, retreats, etc</li>
                                <li>Class can plan some awareness programmes with respect to environment, social and cultural issues, etc.</li>
                            </ul>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Guidelines;
