import React from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console and update state with error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <Container
          fluid
          className="min-vh-100 d-flex align-items-center justify-content-center bg-dark"
        >
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Alert variant="danger" className="text-center">
                <Alert.Heading>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Oops! Something went wrong
                </Alert.Heading>
                <p>
                  We're sorry, but something unexpected happened. This is
                  usually a temporary issue.
                </p>
                <hr />
                <div className="d-flex gap-2 justify-content-center">
                  <Button variant="outline-danger" onClick={this.handleReset}>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Try Again
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => (window.location.href = "/")}
                  >
                    <i className="bi bi-house me-1"></i>
                    Go Home
                  </Button>
                </div>

                {/* Development error details */}
                {process.env.NODE_ENV === "development" && (
                  <details className="mt-3 text-start">
                    <summary>Error Details (Development)</summary>
                    <div className="mt-2 p-2 bg-light text-dark rounded">
                      <h6>Error:</h6>
                      <pre className="small">
                        {this.state.error && this.state.error.toString()}
                      </pre>
                      <h6>Component Stack:</h6>
                      <pre className="small">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  </details>
                )}
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
