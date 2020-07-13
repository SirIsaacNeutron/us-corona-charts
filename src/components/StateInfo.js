import React from 'react'
import PropTypes from 'prop-types';

import axios from 'axios';

import Chart from './Chart';

const getDate = node => {
    return new Date(
        node.date.toString().substring(0, 4),
        (node.date - 100).toString().substring(4, 6),
        node.date.toString().substring(6)
    );
}
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
        const deathsConfirmed = this.state.covidData.map(
            day => ({ 
                deathsConfirmed: day.deathIncrease,
                date:  getDate(day)
            }))
            .reverse();
        // console.log(`Results for ${this.props.state}`);
        // console.log(deathsConfirmed);
        const hospitalizedCurrently = this.state.covidData.map(
            node => ({
                hospitalizedCurrently: node.hospitalizedCurrently,
                date:  getDate(node)
            }))
            .reverse();
        
        const icu = this.state.covidData.map(
            node => ({
                icuCurrently: node.inIcuCurrently,
                date:  getDate(node)
            })
        ).reverse();

        const testIncrease = this.state.covidData.map(
            node => ({
                testResultIncrease: node.totalTestResultsIncrease,
                date: getDate(node)
            })
        ).reverse();

        const ventilatorCurrently = this.state.covidData.map(
            node => ({
                ventilatorCurrently: node.onVentilatorCurrently,
                date: getDate(node)
            })
        ).reverse();

        const positiveIncrease = this.state.covidData.map(
            node => ({
                positiveIncrease: node.positiveIncrease,
                date: getDate(node)
            })
        ).reverse();

        return { deathsConfirmed, hospitalizedCurrently, 
            icu, testIncrease, ventilatorCurrently,
            positiveIncrease };
    }

    render() {
        const { deathsConfirmed, hospitalizedCurrently, icu, 
        testIncrease, ventilatorCurrently,
        positiveIncrease } = this.getData();

        let dataGrade = '';
        // This check is needed or else the dev server will crash with
        // an error
        if (this.state.covidData[0] !== undefined) {
            dataGrade = this.state.covidData[0].dataQualityGrade
        }

        return (
            <div className='state-info'>
                <h2>{this.props.stateName}</h2>
                <p><a href='https://covidtracking.com/about-data/state-grades'
                target='_blank' rel='noopener noreferrer'>Current Data Grade: {dataGrade}</a></p>
                <hr />
                <div className='charts d-flex justify-content-between'>
                    <Chart title='COVID Death Increase' data={deathsConfirmed} 
                    dataKey='deathsConfirmed' fill='red'/>
                    <Chart title='Currently Hospitalized' 
                    data={hospitalizedCurrently}
                    dataKey='hospitalizedCurrently' fill='blue'/>
                    <Chart title='Currently in ICU'
                    data={icu}
                    dataKey='icuCurrently' fill='grey' />
                    <Chart title='New Test Results'
                    data={testIncrease}
                    dataKey='testResultIncrease' fill='purple' />
                </div>
                <div className='charts d-flex justify-content-around'>
                    <Chart title='Currently on Ventilator'
                    data={ventilatorCurrently}
                    dataKey='ventilatorCurrently' fill='black' />
                    <Chart title='New Positive Cases'
                    data={positiveIncrease}
                    dataKey='positiveIncrease' fill='green' />
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