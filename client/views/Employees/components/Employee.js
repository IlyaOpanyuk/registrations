import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class Employee extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <FormGroup >
                                <ControlLabel>ID сотрудника</ControlLabel>
                                <FormControl componentClass="label">{ this.props.id }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Код точки (ППО)</ControlLabel>
                                <FormControl componentClass="label">{ this.props.code }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Фамилия</ControlLabel>
                                <FormControl componentClass="label">{ this.props.surname }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Имя</ControlLabel>
                                <FormControl componentClass="label">{ this.props.name }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Отчество</ControlLabel>
                                <FormControl componentClass="label">{ this.props.patronymic }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Дата рождения</ControlLabel>
                                <FormControl componentClass="label">{ this.props.birthDate }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Тип документа</ControlLabel>
                                <FormControl componentClass="label">{ this.props.documentType }</FormControl>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <ControlLabel>Дата выдачи</ControlLabel>
                                <FormControl componentClass="label">{ this.props.issueDate }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Кем выдан</ControlLabel>
                                <FormControl componentClass="label">{ this.props.issuedBy }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Личный номер</ControlLabel>
                                <FormControl componentClass="label">{ this.props.personalNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Серия и номер</ControlLabel>
                                <FormControl componentClass="label">{ this.props.series + this.props.documentNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl componentClass="label">{ this.props.phoneNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Аттестация</ControlLabel>
                                <FormControl componentClass="label">{ this.props.attestation }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <FormControl componentClass="label">{ this.props.blockDate }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="info" className="pull-right" onClick={ () =>{
                                        return(<Redirect to="/edit" push/>)
                                    }
                                 }>Редактировать</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        )
    }
}