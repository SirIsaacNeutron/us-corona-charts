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
      states: ['fl', 'ca'] // TODO: add buttons to allow changes to this array
    }
  }

  render() {
    const stateInfos = this.state.states
        .sort((a, b) => {
          return a < b ? -1 : 1; // Alphabetically sort the states for now
        })
        .map((s, index) => 
        <StateInfo key={index} state={s} stateName={STATE_CODES[s]}/>);
    return (
      <div className='App'>
          <h1>Hello, world!</h1> 
          <p>Buttons go here.</p>
          {stateInfos}
      </div>
    );
  }
}

export default App;
