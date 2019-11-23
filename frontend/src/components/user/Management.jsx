import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';
import { useState } from 'react';
const baseUrl = 'http://localhost:3000/AlarmesAtuados'
// Estado inicial

export default class Management extends Component {


    constructor(props) {
        super(props);
        this.state = {
            alarm: { dataEntrada: '' , dataSaida: '' , descAlarm: '' , descEquipamento: '' , statusAlarme: '' , id: '' },
            list: []
        };
    }



    componentDidMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }
    renderMostAlarms() {

    }
    load(alarm) {
        this.setState({ alarm })
    };

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>Id do Alarme</th>
                    <th>Status</th>
                    <th>Descrição do Alarme</th>
                    <th>Urgente?</th>
                    <th>Ativar/Desativar Alarme</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRows}
                </tbody>
            </table>
        )
    };

    findAlarm(alarm) {
        const alarmCopy = alarm;
        console.log(alarmCopy);
        const method = 'get';
        const url = alarm ? `${baseUrl}?descAlarm=${alarm}`: baseUrl;
        axios[method](url,alarm)
            .then(resp => {
                this.setState({state.list},() => resp.data )
                this.renderRows()


            })
    }

    renderFilter(props){
        return (
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label><strong>Pesquisar</strong></label>
                    <input type="text" className="form-control"
                           name="findAlarm"
                           value={props.descAlarm}
                           placeholder="Pesquisar pela descrição do alarme"
                           onChange={(e) => {this.findAlarm(e.target.value)}
                           }
                    />
                </div>
            </div>
        )

    }
    updateField(alarm) {
        const method = alarm.id ? 'put' : 'post';
        const url = alarm.id ? `${baseUrl}/${alarm.id}` : baseUrl;
        axios[method](url,alarm)
            .then(resp => {
                console.log(resp.data.statusAlarme)
            });
        const alarmCopy = alarm;
        alarmCopy.statusAlarme = this.toggleAlarm(alarm.statusAlarme);
        this.setState({
            alarm: alarmCopy
        })
    };

    toggleAlarm(status) {
        if(status === 'On'){
            return 'Off'
        }

        return 'On';
    }


    renderRows() {
        return this.state.list.map(alarm =>{
                return(
                    <tr key={alarm.id}>
                        <td>{alarm.id}</td>
                        <td>{alarm.statusAlarme}</td>
                        <td>{alarm.descAlarm}</td>
                        <td>
                            <button  className="btn btn-outline-primary">
                                <a href="mailto:abcd@abc.com.br">Enviar email</a>
                            </button>
                        </td>

                        <td>
                            <button className="btn btn-dark ml-2 "
                                    onClick={() => this.updateField(alarm)}>

                                <i className="fa fa-dot-circle-o"></i>
                            </button>
                        </td>
                    </tr>

                )
            })
        };
    render () {
        return (
            <Main >
                {this.renderFilter(this.state)}
                <div className='display-4'>Gerenciamento de alarmes</div>
                <div className='display-5'>Alarmes que mais atuaram no sistema:</div>
                {this.renderMostAlarms()}
                {this.renderTable()}
            </Main>
        )
    }
};