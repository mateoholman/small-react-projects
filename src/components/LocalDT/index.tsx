import React from 'react';

interface State {
    currentDateTime: Date
}

class LocalDT extends React.Component<State> {
    public state = {
        currentDateTime: new Date()
    }

    public updateDateTime = () => setInterval(() => {
        this.setState({ currentDateTime: new Date() })
    }, 1000);

    public componentDidMount() {
        this.updateDateTime();
    }

    public render() {
        return (
            <div>
                <h1>{this.state.currentDateTime.toUTCString()}</h1>
            </div>
        );
    }
}

export default LocalDT;