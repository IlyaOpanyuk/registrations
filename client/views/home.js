import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import Alert from 'react-alert';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.handleSearhOnClick = this.handleSearhOnClick.bind(this);
    }

    handleSearhOnClick(){
        alert(123);
    }

    render(){
        return(
            <Row>
                <Col sm={1}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Фамилия</ControlLabel>
                            <FormControl type="text" placeholder="Введите фамилию" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Номер телефона</ControlLabel>
                            <FormControl type="text" placeholder="Введите номер телефона" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Код точки (ППО)</ControlLabel>
                            <FormControl type="text" placeholder="Введите код точки (ППО)" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Номер паспорта</ControlLabel>
                            <FormControl type="text" placeholder="Введите номер паспорта" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Личный номер</ControlLabel>
                            <FormControl type="text" placeholder="Введите личный номер" />
                        </FormGroup>
                        <Button bsStyle="success" onClick={this.handleSearhOnClick}>Найти</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Home);