import {
    Component,
    DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
} from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service here
        console.error('Error caught by Error Boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div
                    style={{
                        color: 'red',
                        padding: '20px',
                        backgroundColor: '#ffe6e6',
                    }}
                >
                    <h1>Something went wrong:</h1>
                    <pre>{this.state.error.toString()}</pre>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
