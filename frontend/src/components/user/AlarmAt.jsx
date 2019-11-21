import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3000/AlarmesAtuados';
// Estado inicial de cadastro de equipamento
const initialState = {
    Alarmes: { id: '' , dataEntrada: '' , dataSaida: '' , statusAlarme: '' , descAlarm: '', descEquipamento: '' },
    list: []
};

export default class AlarmAt extends Component {

    state = {...initialState};

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    };

    clear() {
        this.setState({ Alarmes: initialState.Alarmes })
    };

    save() {
        const alarm = this.state.alarm;
        const method = alarm.id ? 'put' : 'post';
        const url = alarm.id ? `${baseUrl}/${alarm.id}` : baseUrl;
        axios[method](url,alarm)
            .then(resp => {
                const list = this.getUpdateList(resp.data);
                this.setState({ alarm: initialState.alarm, list})
            })
    };

    getUpdateList(alarm, add = true) {
        const list = this.state.list.filter(newid => newid.id !== alarm.id);
        if(add) list.unshift(alarm)
        return list
    };

    updateField(event) {
        const alarm = {...this.state.alarm }
        alarm[event.target.name] = event.target.value
        this.setState ({ alarm })
    };

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Data de Entrada</strong></label>
                            <input type="date" className="form-control"
                                   name="dataEntrada"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Data de Saída</strong></label>
                            <input type="date" className="form-control"
                                   name="dataSaida"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Descrição do Alarme</strong></label>
                            <input type="text" className="form-control"
                                   name="descAlarm"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite a descrição do Alarme" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Descrição do Equipamento</strong></label>
                            <input type="text" className="form-control"
                                   name="descEquipamento"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite a descrição do Equipamento" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Status do Alarme</strong></label>
                            <select className="form-control"
                                    name="statusAlarme"
                                    value={this.alarm}
                                    onChange={e => this.updateField(e)}>
                                <option value="On">Ligado</option>
                                <option value="Off">Desligado</option>
                            </select>
                        </div>
                    </div>

                    <div className="row col-12 col-md-12 d-flex justify-content-end">
                        <button className="col-md-2 btn btn-success ml-2"
                                onClick={e => this.save(e)}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

        )

    }

    load(alarm) {
        this.setState({ alarm })
    };

    remove(alarm) {
        axios.delete(`${baseUrl}/${alarm.id}`).then(resp => {
            const list = this.getUpdateList(alarm, false)
            this.setState({ list })
        })
    };

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data de Entrada</th>
                    <th>Data de Saída</th>
                    <th>Descrição do Alarme</th>
                    <th>Descrição do Equipamento</th>
                    <th>Status do Alarme</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
            </table>
        )
    };

    renderRows() {
        return this.state.list.map(alarm =>{
            return(
                <tr key={alarm.id}>
                    <td>{alarm.id}</td>
                    <td>{alarm.dataEntrada}</td>
                    <td>{alarm.dataSaida}</td>
                    <td>{alarm.descAlarm}</td>
                    <td>{alarm.descEquipamento}</td>
                    <td>{alarm.statusAlarme}</td>
                    <td>
                        <button className="btn btn-warning"
                                onClick={() => this.load(alarm)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(alarm)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    };
    render () {
        return (
            <Main>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
};