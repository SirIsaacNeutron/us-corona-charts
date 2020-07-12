import React from 'react';
import PropTypes from 'prop-types';

import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const tooltip = props => {
    // Based off http://recharts.org/en-US/examples/CustomContentOfTooltip
    // BOTH of these 'undefined' checks are necessary. Otherwise, the app will
    // crash if you try to get the tooltip of a different graph. 
    if (props.active && props.payload !== undefined && props.payload[0] !== undefined) {
        const d = props.payload[0].payload.date;
        const dateString = `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
        return (
            <div>
                <p className='mb-0'><small>{dateString}</small></p>
                { /* .value makes this tooltip reusable with different data */ }
                <p>{props.payload[0].value}</p>
            </div>
        );
    }
    return null;
}

const Chart = props => {
    return (
        <div className='chart'>
            <h3>{props.title}</h3>
            <AreaChart width={250} height={250} data={props.data}>
                <XAxis dataKey='date' scale='auto' />
                <YAxis />
                <Area dataKey={props.dataKey} fill={props.fill} stroke='none' />
                <Tooltip content={tooltip}/>
            </AreaChart>
        </div>
    );
}

Chart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataKey: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired
}

export default Chart;