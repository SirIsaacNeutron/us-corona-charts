import React from 'react';
import PropTypes from 'prop-types';

import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';

const Chart = (props) => {
    return (
        <div className='chart'>
            <h3>{props.title}</h3>
            <AreaChart width={250} height={250} data={props.data}>
                <XAxis dataKey='date' scale='auto' />
                <YAxis />
                <Area dataKey={props.dataKey} fill={props.fill} stroke='none' />
                <Tooltip />
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