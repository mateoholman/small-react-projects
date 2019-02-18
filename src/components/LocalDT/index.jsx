import React from 'react';

class LocalDT extends React.Component {
    state = {
        currentDateTime: new Date()
    }

    updateDateTime = () => setInterval(() => {
        this.setState({ currentDateTime: new Date() })
    }, 1000);

    componentDidMount() {
        this.updateDateTime();
    }

    render() {
        return (
            <div>
                <h1>{this.state.currentDateTime.toUTCString()}</h1>
            </div>
        );
    }
}

export default LocalDT;