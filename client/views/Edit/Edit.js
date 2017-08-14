import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Checkbox, ButtonToolbar } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker'
import valid from '../../constants/valid';
import axios from 'axios';
import './edit.scss';

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
            error: null,
            successRedirect: false,
            cancelRedirect: false
        };

        this.handleFormOnChange = this.handleFormOnChange.bind(this);
        this.handleSaveOnClick = this.handleSaveOnClick.bind(this);
        this.handleBlockDateOnChange = this.handleBlockDateOnChange.bind(this);
        this.handleIssuedDateOnChange = this.handleIssuedDateOnChange.bind(this);
        this.handleCancelOnClick = this.handleCancelOnClick.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.handleSeriesOnChange = this.handleSeriesOnChange.bind(this);
    }

    componentDidMount() { 
        axios.get('http://10.254.5.71:8084/api/dealers/' + this.state.id + '/dealers')
            .then((answ) => {
                this.setState({
                    surname: answ.data[0].surname,
                    name: answ.data[0].name,
                    patronymic: answ.data[0].patronymic,
                    series: answ.data[0].series,
                    documentNumber: answ.data[0].documentNumber,
                    issueDate: answ.data[0].issueDate,
                    phoneNumber: answ.data[0].phoneNumber,
                    attestation: answ.data[0].attestation,
                    blockDate: answ.data[0].blockDate,
                    issuedBy: answ.data[0].issuedBy
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleFormOnChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSaveOnClick(e){
        this.commitChanges();
        this.setState({
            successRedirect: true
        });
    }

    handleCancelOnClick(e){
        this.setState({
            cancelRedirect: true
        });
    }

    handleBlockDateOnChange(value){
        this.setState({
            blockDate: value
        });
    } 

    handleIssuedDateOnChange(value){
        this.setState({
            issueDate: value
        })
    }

    commitChanges(){
        axios({
            method: 'post',
            url: 'http://10.254.5.71:8084/api/dealers/',
            data: JSON.stringify({ 
                ID: this.state.id,
                Surname: this.state.surname,
                Name: this.state.name,
                Patronymic: this.state.patronymic,
                Series: this.state.series,
                DocumentNumber: this.state.documentNumber,
                IssueDate: this.state.issueDate,
                PhoneNumber: this.state.phoneNumber,
                Attestation: this.state.attestation,
                BlockDate: this.state.blockDate,
                IssuedBy: this.state.issuedBy,
                posted: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log('Success' + resp);
            this.setState({
                posted: true
            });
        }).catch((err) => {
            console.log('Error: ' + err);
        });
    }

    handleSeriesOnChange(e){
        this.setState({
            series: e.target.value
        });
    }

    render() {
        const { successRedirect, posted } = this.state;
        if (successRedirect & posted) {
            return <Redirect to="/employees" push />
        }

        const { cancelRedirect } = this.state;
        if (cancelRedirect) {
            return <Redirect to="/employees" push />
        }
        
        return(
            <Grid>
                <h2>Редактирование данных</h2>
                <Form onChange={ this.handleFormOnChange }>
                    <Row>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="surname" validationState={ this.state.surnameValid }>
                                <ControlLabel>Фамилия</ControlLabel>
                                <FormControl value={ this.state.surname } type="text" placeholder="Введите фамилию"/>
                            </FormGroup>
                            <FormGroup controlId="name" validationState={ this.state.nameValid }>
                                <ControlLabel>Имя</ControlLabel>
                                <FormControl value={ this.state.name } type="text" placeholder="Введите имя"/>
                            </FormGroup>
                            <FormGroup controlId="patronymic" validationState={ this.state.patronymicValid }>
                                <ControlLabel>Отчество</ControlLabel>
                                <FormControl value={ this.state.patronymic } type="text" placeholder="Введите отчество"/>
                            </FormGroup>
                            <FormGroup controlId="series" validationState={ this.state.seriesValid }>
                                <ControlLabel>Серия</ControlLabel>
                                <FormControl componentClass="select" placeholder="Выберите серию паспорта" value={ this.state.series } onChange={ this.handleSeriesOnChange }>
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
                                <FormControl value={ this.state.documentNumber } type="text" placeholder="Введите номер паспорта"/>
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
                                <FormControl value={ this.state.phoneNumber } type="text" placeholder="Введите номер телефона"/>
                            </FormGroup>
                            <FormGroup controlId="attestation">
                                <ControlLabel>Аттестация</ControlLabel>
                                <Checkbox>  
                                    { this.state.attestation ? new Date(this.state.attestation).toLocaleDateString() : new Date().toLocaleDateString() }
                                </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="blockDate" className="checkboxMargin" >
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <DatePicker value={ this.state.blockDate } onChange={ this.handleBlockDateOnChange }/>
                            </FormGroup>
                            <FormGroup controlId="issuedBy" validationState={ this.state.issuedByValid }>
                                <ControlLabel>Кем выдан</ControlLabel>
                                <FormControl value={ this.state.issuedBy } type="text" placeholder="Введите организацию, выдавшую документ"/>
                            </FormGroup>
                            <ButtonToolbar className="pull-right">
                                <Button bsStyle="success" className="searchButton" onClick={ this.handleSaveOnClick }>Сохранить</Button>
                                <Button bsStyle="danger" className="searchButton" onClick={ this.handleCancelOnClick }>Отмена</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>  
                </Form>
            </Grid>
        )
    }
}

export default withRouter(Edit);