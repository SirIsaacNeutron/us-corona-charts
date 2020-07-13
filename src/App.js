import React from 'react';
import './App.css';
import StateInfo from './components/StateInfo';

const STATE_CODES = {
  	'al': 'Alabama',
	'ak': 'Alaska',
	'az': 'Arizona',
	'ar': 'Arkansas',
	'ca': 'California',
	'co': 'Colorado',
	'ct': 'Connecticut',
	'de': 'Delaware',
	'dc': 'District Of Columbia',
	'fl': 'Florida',
	'ga': 'Georgia',
	'hi': 'Hawaii',
	'id': 'Idaho',
	'il': 'Illinois',
	'in': 'Indiana',
	'ia': 'Iowa',
	'ks': 'Kansas',
	'ky': 'Kentucky',
	'la': 'Louisiana',
	'me': 'Maine',
	'md': 'Maryland',
	'ma': 'Massachusetts',
	'mi': 'Michigan',
	'mn': 'Minnesota',
	'ms': 'Mississippi',
	'mo': 'Missouri',
	'mt': 'Montana',
	'ne': 'Nebraska',
	'nv': 'Nevada',
	'nh': 'New Hampshire',
	'nj': 'New Jersey',
	'nm': 'New Mexico',
	'ny': 'New York',
	'nc': 'North Carolina',
	'nd': 'North Dakota',
	'oh': 'Ohio',
	'ok': 'Oklahoma',
	'or': 'Oregon',
	'pa': 'Pennsylvania',
	'ri': 'Rhode Island',
	'sc': 'South Carolina',
	'sd': 'South Dakota',
	'tn': 'Tennessee',
	'tx': 'Texas',
	'ut': 'Utah',
	'vt': 'Vermont',
	'va': 'Virginia',
	'wa': 'Washington',
	'wv': 'West Virginia',
	'wi': 'Wisconsin',
	'wy': 'Wyoming',
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ['fl', 'ca', 'ny']
	}
	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
	this.setState({
		states: Array.from(e.target.selectedOptions, item => item.value)
	});
  }

  render() {
    const stateInfos = this.state.states
        .sort((a, b) => {
          return a < b ? -1 : 1; // Alphabetically sort the states for now
        })
        .map((s, index) => 
		<StateInfo key={s} state={s} stateName={STATE_CODES[s]}/>);
		
	let options = [];
	let keyNum = 0;
	for (const stateCode in STATE_CODES) {
		const stateName = STATE_CODES[stateCode];
		options.push(<option key={keyNum} value={stateCode}>{stateName}</option>)
		++keyNum;
	}

    return (
      <div className='App'>
		<div className='top bg-dark text-white'>
			<h1><i>US Corona Charts</i></h1>
			  
			<p className='pb-2'>Data Source: <a href='https://covidtracking.com/' 
			target='_blank' rel='noopener noreferrer'>
				The Covid Tracking Project</a>
			</p> 
		</div>
		<label for='data-notes'>Data Notes:</label>
		<ul id='data-notes'>
			<li>
				"COVID Death Increase" and "Total COVID Deaths" seem to 
				include "probable" deaths – deaths where COVID-19 was listed 
				as the cause of death, but without a lab test confirming that 
				that is the case.
			</li>
			<li>
				Blank spots in charts = no data available for those dates.
			</li>
			<li>
				Negative values show up in some of the charts for certain states. 
				These negative values show up in the COVID Tracking Project's data, 
				so they are not bugs on your end. I haven't found an explanation 
				for why these negative values exist.
			</li>
		</ul>
        <form className='mb-2'>
			<label htmlFor='options'>Select locations:</label>
			<br />
			<select id='options' multiple={true} value={this.state.states} 
			onChange={this.handleChange}>
				{options}
			</select>
			<br />
		</form>
        {stateInfos}
    	</div>
    );
  }
}

export default App;
