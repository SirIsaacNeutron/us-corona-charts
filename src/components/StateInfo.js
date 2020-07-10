import React from 'react'
import PropTypes from 'prop-types';

class StateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covidData: []
        }
    }

    render() {
        return (
            <div className="state-info">
                <h3>{this.props.stateName}</h3>
                <hr />
                <p>Charts for {this.props.stateName} go here.</p>
            </div>
        );
    }
}

StateInfo.propTypes = {
    state: PropTypes.string.isRequired,
    stateName: PropTypes.string.isRequired
}

export default StateInfo;