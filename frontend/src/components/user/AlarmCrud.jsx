import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3000/Alarmes';
// Estado inicial de cadastro de equipamento
const initialState = {
    Alarmes: { id: '' , descAlarm: '' , classificacao: '' , equipamentoRelacionado: '' , dataCadastro: '' },
    list: []
};

export default class AlarmCrud extends Component {

    state = {...initialState};

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    };

    clear() {
        this.setState({ initialState })
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
                            <label><strong>Descrição</strong></label>
                            <input type="text" className="form-control"
                                   name="descAlarme"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite a descrição do Alarme" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Equipamento</strong></label>
                            <input type="text" className="form-control"
                                   name="equipamentoRelacionado"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite os equipamentos relacionados(caso exista)" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Tipo</strong></label>
                            <select className="form-control"
                                    name="classificacao"
                                    value={this.alarm}
                                    onChange={e => this.updateField(e)}>
                                <option value="Baixo">Baixo</option>
                                <option value="Médio">Médio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Data de Cadastro</strong></label>
                            <input type="date" className="form-control"
                                   name="dataCadastro"
                                   value={this.alarm}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite a data"/>
                        </div>
                    </div>

                    <div className="row col-12 col-md-12 d-flex justify-content-lg-end">
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
                    <th>Descrição</th>
                    <th>Classificação</th>
                    <th>Equipamento</th>
                    <th>Data de Cadastro</th>
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
                    <td>{alarm.descAlarme}</td>
                    <td>{alarm.classificacao}</td>
                    <td>{alarm.equipamentoRelacionado}</td>
                    <td>{alarm.dataCadastro}</td>
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