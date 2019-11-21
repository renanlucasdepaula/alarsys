import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3000/Equipamentos';
// Estado inicial de cadastro de equipamento
const initialState = {
    Equipamentos: { id: '' , nomeEquipamento: '' , numeroSerie: '' , tipo: '' , dataCadastro: '' },
    list: []
};

export default class EquipmentCrud extends Component {

    state = {...initialState};

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    };

    clear() {
        this.setState({ Equipamentos: initialState.Equipamentos })
    };

    save() {
        const equipment = this.state.equipment;
        const method = equipment.id ? 'put' : 'post';
        const url = equipment.id ? `${baseUrl}/${equipment.id}` : baseUrl;
        axios[method](url,equipment)
            .then(resp => {
                const list = this.getUpdateList(resp.data);
                this.setState({ alarm: initialState.equipment, list})
            })
    };

    getUpdateList(equipment, add = true) {
        const list = this.state.list.filter(newid => newid.id !== equipment.id);
        if(add) list.unshift(equipment)
        return list
    };

    updateField(event) {
        const equipment = {...this.state.equipment }
        equipment[event.target.name] = event.target.value
        this.setState ({ equipment })
    };

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Nome</strong></label>
                            <input type="text" className="form-control"
                                   name="nomeEquipamento"
                                   value={this.equipment}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o nome do equipamento" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Nº de Série</strong></label>
                            <input type="text" className="form-control"
                                   name="numeroSerie"
                                   value={this.equipment}
                                   onChange={e => this.updateField(e)}
                                   placeholder="Digite o número de série do equipamento" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Tipo</strong></label>
                                <select className="form-control"
                                        name="tipo"
                                        value={this.alarm}
                                        onChange={e => this.updateField(e)}>
                                    <option value="Tensão">Tensão</option>
                                    <option value="Corrente">Corrente</option>
                                    <option value="Óleo">Óleo</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label><strong>Data de Cadastro</strong></label>
                            <input type="date" className="form-control"
                                   name="dataCadastro"
                                   value={this.equipment}
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

    load(equipment) {
        this.setState({ equipment })
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
                    <th>Nome</th>
                    <th>Nº de Série</th>
                    <th>Tipo</th>
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
        return this.state.list.map(equipment =>{
            return(
                <tr key={equipment.id}>
                    <td>{equipment.id}</td>
                    <td>{equipment.nomeEquipamento}</td>
                    <td>{equipment.numeroSerie}</td>
                    <td>{equipment.tipo}</td>
                    <td>{equipment.dataCadastro}</td>
                    <td>
                        <button className="btn btn-warning"
                                onClick={() => this.load(equipment)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(equipment)}>
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