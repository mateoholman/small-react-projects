import React from 'react';
import moment from 'moment';

interface State {
    currentDateTime: moment.Moment,
    endTime: moment.Moment
};

interface Props {
    endTime: string
};

class LocalDTMoment extends React.Component<Props, State> {
    public state = {
        currentDateTime: moment(),
        endTime: moment()
    }

    public updateDateTime = () => setInterval(() => {
        this.setState({ currentDateTime: moment() })
    }, 1000);

    public componentDidMount() {
        this.updateDateTime();
    }

    public render() {
        const duration = moment.duration(+moment(this.props.endTime) - +this.state.currentDateTime);
        return (
            <div>
                {
                    this.props.endTime ?
                        (
                            <React.Fragment>
                                <p>
                                    {duration.months()} months {duration.days()} days {duration.hours()} hours {duration.minutes()} minutes {duration.seconds()} seconds
                                </p>
                                <p>Until the time ends!</p>
                            </React.Fragment>
                        ) :
                        (<h1>{moment(this.state.currentDateTime).format('MMMM Do YYYY, h:mm:ss a')}</h1>)
                }
            </div>
        );
    }
}

export default LocalDTMoment;