import React from 'react';
import moment from 'moment';

class LocalDTMoment extends React.Component {
    state = {
        currentDateTime: moment().format('MMMM Do YYYY, h:mm:ss a')
    }

    updateDateTime = () => setInterval(() => {
        this.setState({ currentDateTime: moment().format('MMMM Do YYYY, h:mm:ss a') })
    }, 1000);

    componentDidMount() {
        this.updateDateTime();
    }

    render() {
        return (
            <div>
                <h1>{this.state.currentDateTime}</h1>
            </div>
        );
    }
}

export default LocalDTMoment;