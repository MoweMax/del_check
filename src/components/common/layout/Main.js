import React, {PureComponent} from 'react';
import NavigationTop from "../NavigationTop";
import SideBar from "../SideBar";
import { Col, Container, Row } from "reactstrap";

class MainLaoyout extends PureComponent
{
    render()
    {
        return (
            <div>
                <NavigationTop/>
                <Container>
                    <Row>
                        <Col sm="12" md="10" lg="10">
                        {this.props.children}
                        </Col>
                        <SideBar/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainLaoyout;