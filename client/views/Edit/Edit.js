import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Checkbox, ButtonToolbar } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker'
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
            documentNumber: '',
            issueDate: new Date().toISOString(),
            phoneNumber: '',
            attestation: false,
            blockDate: new Date().toISOString(),
            issuedBy: '',
            surnameValid: valid.default,
            nameValid: valid.default,
            patronymicValid: valid.default,
            documentNumberValid: valid.default,
            phoneNumberValid: valid.default,
            issuedByValid: valid.default,
            error: null
        };

        this.handleFormOnChange = this.handleFormOnChange.bind(this);
        this.handleSaveOnClick = this.handleSaveOnClick.bind(this);
        this.handleBlockDateOnChange = this.handleBlockDateOnChange.bind(this);
        this.handleIssuedDateOnChange = this.handleIssuedDateOnChange.bind(this);
        alert(this.props.match.params.id);
    }

    handleFormOnChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSaveOnClick(e){
        this.setState({
            redirect: true
        })
    }

    handleBlockDateOnChange(value){
        this.setState({
            blockDate: value
        })
    } 

    handleIssuedDateOnChange(value){
        this.setState({
            issueDate: value
        })
    }

    render() {
        return(
            <Grid>
                <h2>Редактирование данных</h2>
                <Form onChange={ this.handleFormOnChange }>
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
                                    <option value="AB">AB</option>
                                    <option value="BM">BM</option>
                                    <option value="HB">HB</option>
                                    <option value="KH">KH</option>
                                    <option value="MP">MP</option>
                                    <option value="MC">MC</option>
                                    <option value="KB">KB</option>
                                    <option value="PP">PP</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="documentNumber" validationState={ this.state.documentNumberValid }>
                                <ControlLabel>Номер паспорта</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер паспорта"/>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={9}>
                                    <p className="error">{ this.state.error }</p>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="issueDate">
                                <ControlLabel>Дата выдачи</ControlLabel>
                                <DatePicker value={ this.state.issueDate } onChange={ this.handleIssuedDateOnChange }/>
                            </FormGroup>
                            <FormGroup controlId="phoneNumber" validationState={ this.state.phoneNumberValid }>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер телефона"/>
                            </FormGroup>
                            <FormGroup controlId="attestation">
                                <ControlLabel>Аттестация</ControlLabel>
                                <Checkbox>  
                                    { this.props.date ? this.props.date : new Date().toLocaleDateString() }
                                </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="blockDate" className="checkboxMargin" >
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <DatePicker value={ this.state.blockDate } onChange={ this.handleBlockDateOnChange }/>
                            </FormGroup>
                            <FormGroup controlId="issuedBy" validationState={ this.state.issuedByValid }>
                                <ControlLabel>Кем выдан</ControlLabel>
                                <FormControl type="text" placeholder="Введите организацию, выдавшую документ"/>
                            </FormGroup>
                            <ButtonToolbar className="pull-right">
                                <Button bsStyle="success" className="searchButton" onClick={ this.handleSaveOnClick }>Сохранить</Button>
                                <Button bsStyle="danger" className="searchButton">Отмена</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>  
                </Form>
            </Grid>
        )
    }
}

export default withRouter(Edit);