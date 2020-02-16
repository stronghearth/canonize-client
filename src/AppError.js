import React from 'react';

export default class AppError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError (error) {
        return {hasError: true};
    }

    render() {
        if(this.state.hasError) {
            return (
            <h2>An error has occured. Cannot retrieve your canon at this time.</h2>
            );
        }
        return this.props.children;
    }
}