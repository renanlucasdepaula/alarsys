import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3000/AlarmesAtuados'
// Estado inicial
const initialState = {
    alarm: { dataEntrada: '' , dataSaida: '' , descAlarm: '' , descEquipamento: '' , statusAlarme: '' , id: '' },
    list: []
};
export default class Management extends Component {

    state = {...initialState}

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
                {this.renderRows()}
                </tbody>
            </table>
        )
    };

    updateField(alarm) {
        console.log(alarm)
    };


    renderRows() {
        return this.state.list.map(alarm =>{
                return(
                    <tr key={alarm.id}>
                        <td>{alarm.id}</td>
                        <td>{alarm.statusAlarme}</td>
                        <td>{alarm.descAlarm}</td>
                        <td>
                            <button className="btn btn-outline-primary"
                                    onClick={() => this.updateField()}>
                                <i className="fa fa-envelope-o"></i>
                            </button>
                        </td>

                        <td>
                            <button className="btn btn-dark ml-2 "
                                    onClick={() => this.updateField(alarm.statusAlarme)}>

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
                <div className='display-4'>Gerenciamento de alarmes</div>
                <div className='display-5'>Alarmes que mais atuaram no sistema:</div>
                {this.renderMostAlarms()}
                {this.renderTable()}
            </Main>
        )
    }
};