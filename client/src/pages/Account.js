import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

export default function Account() {
    const { user } = useAuthenticationContext();
  return (
    <Row className='min-vh-100'>
        <Col sm={12} className='text-center my-4 text-light'><h1>Account</h1></Col>
        <Col sm={12}>
            <Container>
                <Row>
                    <Col sm={12} className='bg-secondary'>
                        {user.email}
                    </Col>
                </Row>
            </Container>
        </Col>
    </Row>
  )
}
