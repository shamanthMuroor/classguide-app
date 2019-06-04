import React from 'react';
import AcadAchievers from './AcadAchievers';
import LevelAchievers from './LevelAchievers';
import NonAcadAchievers from './NonAcadAchievers';

class Achiever extends React.Component {
    state = {
        showAcad: true,
        showLevelAchievers: false, 
        showNonAcad: false,    
    }

    showAcadFn = () => {
        this.setState({ 
            showAcad: true,
            showLevelAchievers: false, 
            showNonAcad: false
         })
    }

    showLevelAchieversFn = () => {
        this.setState({ 
            showAcad: false,
            showLevelAchievers: true, 
            showNonAcad: false
        })
    }

    showNonAcadFn = () => {
        this.setState({ 
            showAcad: false,
            showLevelAchievers: false, 
            showNonAcad: true
        })
    }

    render() {
        let html = 
            <div className="container">
                <button
                    className="btn btn-secondary m-5"
                    onClick={this.showAcadFn}
                >
                    Academic Achievers
                </button>
                <button
                className="btn btn-secondary m-5"
                onClick={this.showLevelAchieversFn}
                >
                    Achievers in Different Level
                </button>
                <button
                    className="btn btn-secondary m-5"
                    onClick={this.showNonAcadFn}
                >
                    Non Academic Achievers
                </button>
            </div>

        return (
            <div className="container m-5">
                {html}
                {this.state.showAcad ? <AcadAchievers /> : null }
                {this.state.showLevelAchievers ? <LevelAchievers /> : null }
                {this.state.showNonAcad ? <NonAcadAchievers /> : null }
            </div>
        )
    }
}

export default Achiever;