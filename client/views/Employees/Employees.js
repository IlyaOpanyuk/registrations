import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import './employees.scss';

import Employee from './components/Employee';

class EmployeeList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount(){
         axios.get('http://10.254.5.71:8084/api/dealers')
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
                    })
                }
            </Grid>
        )
    }
}

export default withRouter(EmployeeList);