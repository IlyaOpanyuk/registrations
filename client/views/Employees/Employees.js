import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './employees.scss';

import Employee from './components/Employee';

class EmployeeList extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <Grid>
                <h2>Результат поиска</h2>
                <Employee 
                    id={1}
                    code={2321}
                    surname="Опанюк"
                    name="Илья"
                    patronymic="Андреевич"
                    birthDate={ new Date("05.20.1996").toLocaleDateString() }
                    documentType="Паспорт"
                    issueDate={ new Date("06.03.2013").toLocaleDateString() }
                    issuedBy="Новогрудский РОВД"
                    personalNumber={13123121312}
                    series="KH"
                    documentNumber={2133213}
                    phoneNumber="375 44 7869294"
                    attestation={ new Date("10.01.2016").toLocaleDateString() }
                    blockDate="-"/>
            </Grid>
        )
    }
}

export default withRouter(EmployeeList);