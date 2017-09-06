import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Checkbox, ButtonToolbar } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import valid from '../../constants/valid';
import validControl from '../../constants/validControl';
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
            attestation: new Date().toISOString(),
            blockDate: new Date().toISOString(),
            issuedBy: '',
            surnameValid: valid.default,
            nameValid: valid.default,
            patronymicValid: valid.default,
            documentNumberValid: valid.default,
            issueDateValid: valid.default,
            phoneNumberValid: valid.default,
            issuedByValid: valid.default,
            error: null,
            successRedirect: false,
            cancelRedirect: false,
            posted: false,
            checkboxOptions: {
                checked: false,
                disabled: false
            }
        };

        this.handleFormOnChange = this.handleFormOnChange.bind(this);
        this.handleSaveOnClick = this.handleSaveOnClick.bind(this);
        this.handleBlockDateOnChange = this.handleBlockDateOnChange.bind(this);
        this.handleIssuedDateOnChange = this.handleIssuedDateOnChange.bind(this);
        this.handleCancelOnClick = this.handleCancelOnClick.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.handleSeriesOnChange = this.handleSeriesOnChange.bind(this);
        this.validate = this.validate.bind(this);
        this.validateControl = this.validateControl.bind(this);
        this.handleAttestationOnChange = this.handleAttestationOnChange.bind(this);
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
                    issueDate: answ.data[0].issueDate ? new Date(answ.data[0].issueDate).toISOString() : '',
                    phoneNumber: answ.data[0].phoneNumber,
                    attestation: answ.data[0].attestation === null ? new Date().toISOString() : new Date(answ.data[0].attestation).toISOString(),
                    blockDate: answ.data[0].blockDate ? new Date(answ.data[0].blockDate).toISOString() : '',
                    issuedBy: answ.data[0].issuedBy,
                    checkboxOptions: {
                        checked: answ.data[0].attestation ? true : false,
                        disabled: answ.data[0].attestation ? true : false,
                    }
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
        if (this.validate()){
            this.commitChanges();
            this.setState({
                successRedirect: true
            });
        }
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
        });
    }

    handleSeriesOnChange(e){
        this.setState({
            series: e.target.value
        });
    }

    handleAttestationOnChange(e){
        this.setState({
            checkboxOptions : {
                checked: this.state.checkboxOptions.checked ? false : true
            }
        });
    }

    commitChanges(){
        axios({
            method: 'post',
            url: 'http://10.254.5.71:8084/api/dealers/',
            data: JSON.stringify({ 
                id: this.state.id,
                surname: this.state.surname,
                name: this.state.name,
                patronymic: this.state.patronymic,
                series: this.state.series,
                documentNumber: this.state.documentNumber,
                issueDate: this.state.issueDate,
                phoneNumber: this.state.phoneNumber,
                attestation: this.state.attestation,
                blockDate: this.state.blockDate,
                issuedBy: this.state.issuedBy,
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

    validate(){
        let err = {
            surnameValid: valid.default,
            nameValid: valid.default,
            patronymicValid: valid.default,
            documentNumberValid: valid.default,
            issueDateValid: valid.default,
            phoneNumberValid: valid.default,
            issuedByValid: valid.default,
            error: ''
        };
        let check = true;

        if (!this.state.surname & !this.state.name & !this.state.patronymic & !this.state.documentNumber & !this.state.issueDate & !this.state.phoneNumber & !this.state.issuedBy) {
            err.surnameValid = valid.warning;
            err.nameValid = valid.warning;
            err.patronymicValid = valid.warning;
            err.documentNumberValid = valid.warning;
            err.issueDateValid = valid.warning;
            err.phoneNumberValid = valid.warning;
            err.issuedByValid = valid.warning; 
            err.error = "Заполните обязательные поля!";
            check = false;
        }

        check = check & this.validateControl(validControl.surnameValid, err, this.state.surname, /([а-яА-Яa-zA-Z]{1,})/, "");
        check = check & this.validateControl(validControl.nameValid, err, this.state.name, /([а-яА-Яa-zA-Z]{1,})$/, "");
        check = check & this.validateControl(validControl.patronymicValid, err, this.state.patronymic, /([а-яА-Яa-zA-Z]{1,})$/, "");
        check = check & this.validateControl(validControl.documentNumberValid, err, this.state.documentNumber, /^\d{7}$/, "Введите корректный номер документа\n");
        check = check & this.validateControl(validControl.issueDateValid, err, new Date(this.state.issueDate).toLocaleDateString('en-GB'), /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/, "");
        check = check & this.validateControl(validControl.phoneNumberValid, err, this.state.phoneNumber, /^\d{12}$/, "Введите корректный номер телефона в формате 375XXXXXXXX");
        check = check & this.validateControl(validControl.issuedByValid, err, this.state.issuedBy, /([а-яА-Я]{1,})$/, "");

        this.setState(err);
        return check;
    }

    validateControl(validControl, err, controlValue, regexp, errText){
        if (controlValue !== null && !regexp.test(controlValue)){
            err[validControl] = valid.error;
            err.error += errText;
            return false;
        }
        return true;
    }

    onChange(date) {
        this.setState({
            value: date
        });
    }

    render() {
        const { successRedirect, posted, checkboxOptions } = this.state;
        if (successRedirect & posted) {
            return <Redirect to="/employees" />
        }

        const { cancelRedirect } = this.state;
        if (cancelRedirect) {
            return <Redirect to="/employees" />
        }
        
        return(
            <Grid>
                <h2>Редактирование данных</h2>
                <Form onChange={ this.handleFormOnChange }>
                    <Row>
                        <Col md={6} sm={6}>
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
                                <ControlLabel>Номер документа</ControlLabel>
                                <FormControl value={ this.state.documentNumber } type="text" placeholder="Введите номер документа" maxLength={7}/>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={12}>
                                    <p>
                                        { 
                                            this.state.error ? 
                                                this.state.error.split('\n').map((item, key) => {
                                                    return <span key={key}>{item}<br/></span>
                                                }) : ''
                                        }
                                    </p>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={6}>
                            <FormGroup validationState={ this.state.issueDateValid }>
                                <ControlLabel>Дата выдачи</ControlLabel>
                                <DatePicker dateFormat="DD/MM/YYYY" value={ this.state.issueDate } onChange={ this.handleIssuedDateOnChange } />
                            </FormGroup>
                            <FormGroup controlId="phoneNumber" validationState={ this.state.phoneNumberValid }>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl value={ this.state.phoneNumber } type="text" placeholder="Введите номер телефона" maxLength={12}/>
                            </FormGroup>
                            <FormGroup controlId="attestation">
                                <ControlLabel>Аттестация</ControlLabel>
                                <Checkbox 
                                    checked={ checkboxOptions.checked } 
                                    disabled={ checkboxOptions.disabled } 
                                    onChange={ this.handleAttestationOnChange }>  
                                    { new Date(this.state.attestation).toLocaleDateString('en-GB') }
                                </Checkbox>
                            </FormGroup>
                            <FormGroup className="checkboxMargin" >
                                <ControlLabel>Блокировка доступа</ControlLabel>
                                <DatePicker dateFormat="DD/MM/YYYY" value={ this.state.blockDate } onChange={ this.handleBlockDateOnChange.bind(this) } />
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