import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import axios from 'axios';

import Employee from './components/Employee';

class EmployeeList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: []
        };
        this.jsonToString = this.jsonToString.bind(this);
    }

    jsonToString(options){
        let optionsArr = 
            options.surname + ';' + 
            options.phoneNumber + ';' + 
            options.code + ';' +
            options.documentNumber + ';' +
            options.personalNumber;
        return optionsArr;
    }

    componentDidMount(){
        axios.get('http://10.254.5.71:8084/api/dealers/' + this.jsonToString(this.props.options) + '/dealers')
        .then((answ) => {
            this.setState({
                data: answ.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render(){
        return(
            <Grid>
                <h2>Результат поиска</h2>
                {
                    this.state.data ? 
                        this.state.data.map((item) => {
                            return <Employee 
                                        key={item.id} 
                                        id={item.id}
                                        code={item.code}
                                        surname={item.surname}
                                        name={item.name}
                                        patronymic={item.patronymic}
                                        birthDate={item.birthDate}
                                        documentType={item.documentType}
                                        issueDate={item.issueDate}
                                        issuedBy={item.issuedBy}
                                        personalNumber={item.personalNumber}
                                        series={item.series}
                                        documentNumber={item.documentNumber}
                                        phoneNumber={item.phoneNumber}
                                        attestation={item.attestation}
                                        blockDate={item.blockDate}/>
                        }) :
                        <div>
                            <h5>Данные не найдены</h5>
                            <Link to="/">Вернуться к странице поиска</Link>
                        </div>
                }
            </Grid>
        )
    }
}

export default withRouter(EmployeeList);