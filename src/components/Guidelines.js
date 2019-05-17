import React from 'react';

class Guidelines extends React.Component {
  render() {
    return (
        <div class="d-flex justify-content-center">
            <div id="accordion" className="flex-column" style={{width: '75%', marginTop: '100px'}}>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Class Guide System
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            1. The main objective of this system is to transform the class into team / WE- FORCE.
                            2. To develop a sense of identity, we feeling, and confidence among students.
                            3.  To recognise the special gifts and talents of every student so as to promote their growth and development towards higher level of competency, creativity and fulfilment.
                            4. To establish adult to adult relationship between the staff and the students and to create a favourable environment in the campus to achieve authentic education. 
                            Eg: The role of class guide/Mentor is best illustrated in case of Helen Keller. As a young child she was not only deaf and blind but nearly demented in her behaviour. It was because of the dedication, insight and hard work of her teacher Anne Sullivan Helen was able to realise her intellectual and artistic gifts.
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            An effective Class guide
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            -	Transforms the class into a team by planning innovative activities and executing them through regular meetings.
                            -	Knows every student by name and is familiar with each student’s background, aptitude, capacity and talent.
                            -	Monitors attendance, progress and behavior in the campus
                            -	Helps the students to know their strength and weakness. 
                            -	Helps the student to keep a goal in life and encourage them to achieve it.
                            -	Gives special attention to slow learners, high achievers, deviant and economically poor students.
                            -	Recommends names to prizes, awards, scholarships, midday meals etc.
                            -	Provides academic, career and personal guidance.
                            -	Occasionally visits their houses especially when there is a tragedy at home.
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button className="btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Activities which could be taken up
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                            -Identify the slow learners and request the bright students to help them out on regular basis. A contract has to be worked out between the two.
                            -Class as a whole is made responsible for the class discipline, participation in college activities like fests, sports, retreats, etc
                            -Class can plan some awareness programmes with respect to environment, social & cultural issues, etc.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Guidelines;
