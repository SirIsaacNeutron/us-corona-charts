import React from 'react'
import PropTypes from 'prop-types';

import axios from 'axios';

import Chart from './Chart';

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

    getData() {
        console.log(this.state.covidData[0]);
        // const dataGrade = this.state.covidData[0].dataQualityGrade;

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
        // console.log(`Results for ${this.props.state}`);
        // console.log(deathsConfirmed);
        const hospitalizedCurrently = this.state.covidData.map(
            node => ({
                hospitalizedCurrently: node.hospitalizedCurrently,
                date:  new Date(
                    node.date.toString().substring(0, 4),
                    (node.date - 100).toString().substring(4, 6),
                    node.date.toString().substring(6)
                )
            }))
            .reverse();
        
        const icu = this.state.covidData.map(
            node => ({
                icuCurrently: node.inIcuCurrently,
                date:  new Date(
                    node.date.toString().substring(0, 4),
                    (node.date - 100).toString().substring(4, 6),
                    node.date.toString().substring(6)
                )
            })
        ).reverse();

        return { deathsConfirmed, hospitalizedCurrently, icu };
    }

    render() {
        const { deathsConfirmed, hospitalizedCurrently, icu } = this.getData();

        return (
            <div className='state-info'>
                <h2>{this.props.stateName}</h2>
                {/* <p>Data Grade: {dataGrade}</p> */ }
                <hr />
                <div className='charts' style={{ display: 'flex' }}>
                    <Chart title='New Deaths' data={deathsConfirmed} 
                    dataKey='deathsConfirmed' fill='black'/>
                    <Chart title='Currently Hospitalized' 
                    data={hospitalizedCurrently}
                    dataKey='hospitalizedCurrently' fill='blue'/>
                    <Chart title='Currently in ICU'
                    data={icu}
                    dataKey='icuCurrently' fill='grey' />
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