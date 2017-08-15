import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import valid from '../../constants/valid';
import validControl from '../../constants/validControl';
import './home.scss';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            surname: '',
            phoneNumber: '',
            code: '',
            documentNumber: '',
            personalNumber: '',
            surnameValid: valid.default,
            phoneNumberValid: valid.default,
            codeValid: valid.default,
            documentNumberValid: valid.default,
            personalNumberValid: valid.default,
            error: null,
            redirect: false
        };

        this.handleFormOnChange = this.handleFormOnChange.bind(this);
        this.handleSearhOnClick = this.handleSearhOnClick.bind(this);
        this.validate = this.validate.bind(this);
        this.validateControl = this.validateControl.bind(this);
        this.handlePersonalNumberOnChange = this.handlePersonalNumberOnChange.bind(this);
    }

    handleFormOnChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSearhOnClick(){
        if (this.validate()){
            this.props.getDealer({
                surname: this.state.surname,
                phoneNumber: this.state.phoneNumber,
                code: this.state.code,
                documentNumber: this.state.documentNumber,
                personalNumber: this.state.personalNumber
            });
            this.setState({
                redirect: true
            });
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
            documentNumberValid: valid.default,
            personalNumberValid: valid.default,
            error: ''
        };
        let check = true;

        if (!this.state.surname & !this.state.phoneNumber & !this.state.code & !this.state.documentNumber & !this.state.personalNumber) {
            err.surnameValid = valid.warning;
            err.phoneNumberValid = valid.warning;
            err.codeValid = valid.warning;
            err.documentNumberValid = valid.warning;
            err.personalNumberValid = valid.warning;
            err.error = "Необходимо ввести минимум один критерий для поиска";
            check = false;
        }
        
        check = check & this.validateControl(validControl.phoneNumberValid, err, this.state.phoneNumber, /^\d{3}[ ]\d{2}[ ]\d{7}$/, "Введите корректный номер телефона в формате 375 XX XXXXXX\n");
        check = check & this.validateControl(validControl.documentNumberValid, err, this.state.documentNumber, /^\d{7}$/, "Введите корректный номер документа\n");
        check = check & this.validateControl(validControl.personalNumberValid, err, this.state.personalNumber, /^\d{7}[A-Z]\d{3}[A-Z]{2}\d{1}$/, "Введите корректный личный номер");

        this.setState(err);
        return check;
    }

    validateControl(validControl, err, controlValue, regexp, errText){
        if (controlValue && !regexp.test(controlValue)){
            err[validControl] = valid.error;
            err.error += errText;
            return false;
        }
        return true;
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/employees" push />
        }

        return(
            <Grid>
                <h2>Форма поиска</h2>
                <Form onChange={this.handleFormOnChange}>
                    <Row>
                        <Col md={6} sm={6}>
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
                            <FormGroup controlId="documentNumber" validationState={ this.state.documentNumberValid }>
                                <ControlLabel>Номер документа</ControlLabel>
                                <FormControl type="text" placeholder="Введите номер документа" maxLength={7}/>
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