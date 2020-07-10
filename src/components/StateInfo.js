import React from 'react'
import PropTypes from 'prop-types';

import axios from 'axios';
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';

class StateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covidData: []
        }
    }

    componentDidMount() {
        const { state } = this.props;
        axios.get(`https://covidtracking.com/api/v1/states/${state}/daily.json`)
        .then(resp => this.setState({
            covidData: resp.data
        }))
        .catch(err => console.log(err));
    }

    render() {
        const deathsConfirmed = this.state.covidData.map(
            day => ({ 
                deathsConfirmed: day.deathIncrease,
                date:  new Date(
                    day.date.toString().substring(0, 4),
                    (day.date - 100).toString().substring(4, 6),
                    day.date.toString().substring(6)
                )
            }))
            .reverse();
        console.log(`Results for ${this.props.state}`);
        console.log(deathsConfirmed);
        return (
            <div className='state-info'>
                <h2>{this.props.stateName}</h2>
                <hr />
                <div className='charts'>
                    <h3>Daily Deaths</h3>
                    <AreaChart width={350} height={350} data={deathsConfirmed}>
                        <XAxis dataKey='date' scale='auto' />
                        <YAxis />
                        <Area dataKey='deathsConfirmed' fill='black' />
                        <Tooltip />
                    </AreaChart>
                </div>
            </div>
        );
    }
}

StateInfo.propTypes = {
    state: PropTypes.string.isRequired,
    stateName: PropTypes.string.isRequired
}

export default StateInfo;