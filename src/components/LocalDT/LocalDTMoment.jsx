import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class LocalDTMoment extends React.Component {
    state = {
        currentDateTime: moment(),
        endTime: null
    }

    updateDateTime = () => setInterval(() => {
        this.setState({ currentDateTime: moment() })
    }, 1000);

    componentDidMount() {
        this.updateDateTime();
    }

    render() {
        const duration = moment.duration(moment(this.props.endTime) - this.state.currentDateTime);
        return (
            <div>
                {
                    this.props.endTime ?
                        (
                            <React.Fragment>
                                <p>
                                    {duration.months()} months {duration.days()} days {duration.hours()} hours {duration.minutes()} minutes {duration.seconds()} seconds until the time ends!</p>
                            </React.Fragment>
                        ) :
                        (<h1>{moment(this.state.currentDateTime).format('MMMM Do YYYY, h:mm:ss a')}</h1>)
                }
            </div>
        );
    }
}

LocalDTMoment.propTypes = {
    endTime: PropTypes.string
}

export default LocalDTMoment;