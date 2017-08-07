import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Alert from 'react-alert';
import valid from '../../constants/valid';
import './home.scss';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            surname: '',
            phoneNumber: '',
            code: '',
            pasportNumber: '',
            personalNumber: '',
            surnameValid: valid.default,
            phoneNumberValid: valid.default,
            codeValid: valid.default,
            pasportNumberValid: valid.default,
            personalNumberValid: valid.default,
            error: null
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSearhOnClick = this.handleSearhOnClick.bind(this);
        this.validate = this.validate.bind(this);
        this.validateControl = this.validateControl.bind(this);
        this.handlePersonalNumberOnChange = this.handlePersonalNumberOnChange.bind(this);
    }

    handleOnChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSearhOnClick(){
        if (this.validate()){
            alert(123);
        }
    }

    handlePersonalNumberOnChange(e){
        e.target.value = e.target.value.toUpperCase();
    }

    validate(){
        let err = {
            surnameValid: valid.default,
            phoneNumberValid: valid.default,
            codeValid: valid.default,
            pasportNumberValid: valid.default,
            personalNumberValid: valid.default,
            error: ''
        };
        let check = true;

        if (!this.state.surname & !this.state.phoneNumber & !this.state.code & !this.state.pasportNumber & !this.state.personalNumber) {
            err.surnameValid = valid.warning;
            err.phoneNumberValid = valid.warning;
            err.codeValid = valid.warning;
            err.pasportNumberValid = valid.warning;
            err.personalNumberValid = valid.warning;
            err.error = "Необходимо ввести минимум один критерий для поиска";
            check = false;
        }
        
        check = check & this.validateControl('phoneNumberValid', err, this.state.phoneNumber, /^\d{3}[ ]\d{2}[ ]\d{7}$/, "Введите корректный номер телефона");
        check = check & this.validateControl('pasportNumberValid', err, this.state.pasportNumber, /^\d{7}$/, "Введите корректный номер паспорта");
        check = check & this.validateControl('personalNumberValid', err, this.state.personalNumber, /^\d{7}[A-Z]\d{3}[A-Z]{2}\d{1}$/, "Введите корректный личный номер");

        this.setState(err);
        return check;
    }

    validateControl(validControl, err, control, regexp, errText){
        if (control && !regexp.test(control)){
            err[validControl] = valid.error;
            err.error += errText;
            return false;
        }
        return true;
    }

    render(){
        return(
            <Grid>
                <h2>Форма поиска</h2>
                <Form onChange={this.handleOnChange}>
                    <Row>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="surname" validationState={ this.state.surnameValid }>
                                <ControlLabel>Фамилия</ControlLabel>
                                <FormControl type="text" placeholder="Введите фамилию"/>
                            </FormGroup>
                            <FormGroup controlId="phoneNumber" validationState={ this.state.phoneNumberValid }>
                                <ControlLabel>Номер телефона</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер телефона" maxLength={14}/>
                            </FormGroup>
                            <FormGroup controlId="code" validationState={ this.state.codeValid }>
                                <ControlLabel>Код точки (ППО)</ControlLabel>
                                <FormControl type="text" placeholder="Введите код точки (ППО)"/>
                            </FormGroup>
                            <FormGroup className="error">
                                <Col sm={9}>
                                    <p>{ this.state.error }</p>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={3}>
                            <FormGroup controlId="pasportNumber" validationState={ this.state.pasportNumberValid }>
                                <ControlLabel>Номер паспорта</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер паспорта" maxLength={7}/>
                            </FormGroup>
                            <FormGroup controlId="personalNumber" validationState={ this.state.personalNumberValid }>
                                <ControlLabel>Личный номер</ControlLabel>
                                <FormControl type="text" placeholder="Введите личный номер" maxLength={14} onChange={ this.handlePersonalNumberOnChange }/>
                            </FormGroup>
                            <Button bsStyle="success" onClick={ this.handleSearhOnClick } className="pull-right searchButton">Найти</Button>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        )
    }
}

export default withRouter(Home);