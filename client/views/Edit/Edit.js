import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import valid from '../../constants/valid';
import './edit.scss';

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            surname: '',
            name: '',
            patronymic: '',
            series: '',
            pasportNumber: '',
            issueDate: new Date(),
            phoneNumber: '',
            attestation: false,
            block: new Date(),
            issuedBy: '',
            surnameValid: valid.default,
            nameValid: valid.default,
            patronymicValid: valid.default,
            pasportNumberValid: valid.default,
            phoneNumberValid: valid.default,
            issuedByValid: valid.default,
            error: null
        };

    }

    render(){
        return(
            <Grid>
                <Form>
                    <Row>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="surname" validationState={ this.state.surnameValid }>
                                <ControlLabel>Фамилия</ControlLabel>
                                <FormControl type="text" placeholder="Введите фамилию"/>
                            </FormGroup>
                            <FormGroup controlId="name" validationState={ this.state.nameValid }>
                                <ControlLabel>Имя</ControlLabel>
                                <FormControl type="text" placeholder="Введите имя"/>
                            </FormGroup>
                            <FormGroup controlId="patronymic" validationState={ this.state.patronymicValid }>
                                <ControlLabel>Отчество</ControlLabel>
                                <FormControl type="text" placeholder="Введите отчество"/>
                            </FormGroup>
                            <FormGroup controlId="series" validationState={ this.state.seriesValid }>
                                <ControlLabel>Серия</ControlLabel>
                                <FormControl componentClass="select" placeholder="Выберите серию паспорта">
                                    <option value="AB" selected>AB</option>
                                    <option value="BM">BM</option>
                                    <option value="HB">HB</option>
                                    <option value="KH">KH</option>
                                    <option value="MP">MP</option>
                                    <option value="MC">MC</option>
                                    <option value="KB">KB</option>
                                    <option value="PP">PP</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="pasportNumber" validationState={ this.state.pasportNumberValid }>
                                <ControlLabel>Номер паспорта</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер паспорта"/>
                            </FormGroup>
                            <FormGroup controlId="issueDate">
                                <ControlLabel>Дата выдачи</ControlLabel>
                                <FormControl type="text" placeholder="Введите дату выдачи"/>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="phoneNumber" validationState={ this.state.phoneNumberValid }>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер телефона"/>
                            </FormGroup>
                            <FormGroup controlId="attestation">
                                <ControlLabel>Аттестация</ControlLabel>
                                <Checkbox>
                                </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="block">
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <FormControl type="text"/>
                            </FormGroup>
                            <FormGroup controlId="issuedBy" validationState={ this.state.issuedByValid }>
                                <ControlLabel>Кем выдан</ControlLabel>
                                <FormControl type="text" placeholder="Введите организацию, выдавшую документ"/>
                            </FormGroup>
                        </Col>
                    </Row>  
                </Form>
            </Grid>
        )
    }
}

export default withRouter(Edit);