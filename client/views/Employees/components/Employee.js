import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import valid from '../../../constants/valid';
import '../employees.scss';

class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }

        this.handleEditOnClick = this.handleEditOnClick.bind(this); 
    }

    handleEditOnClick(e){
        this.setState({
            redirect: true
        })
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{
                pathname: '/edit/' + this.props.id
            }} />
        }
        
        return(
            <Grid className="employeeMargin">
                <Form>
                    <Row>
                        <Col md={6} sm={6}>
                            <FormGroup >
                                <ControlLabel>ID сотрудника</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.id }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Фамилия</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.surname }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Имя</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.name }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Отчество</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.patronymic }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Дата рождения</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.birthDate ? new Date(this.props.birthDate).toLocaleDateString('en-GB') : '-' }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Тип документа</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.documentType }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Дата выдачи</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.issueDate ? new Date(this.props.issueDate).toLocaleDateString('en-GB') : '-' }</FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>Кем выдан</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.issuedBy }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Личный номер</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.personalNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Серия и номер</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.series + this.props.documentNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.phoneNumber }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Аттестация</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.attestation ? new Date(this.props.attestation).toLocaleDateString('en-GB') : '-' }</FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <FormControl disabled={true} componentClass="label">{ this.props.blockDate ? new Date(this.props.blockDate).toLocaleDateString('en-GB') : '-' }</FormControl>
                            </FormGroup>
                            <FormGroup className="editButtonMargin">
                                <Button bsStyle="info" className="pull-right" onClick={ this.handleEditOnClick }>Редактировать</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        )
    }
}

export default withRouter(Employee);

/*
Временно недоступный функционал
<FormGroup>
    <ControlLabel>Код точки (ППО)</ControlLabel>
    <FormControl disabled={true} componentClass="label">{ this.props.code }</FormControl>
</FormGroup>
*/