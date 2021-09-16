import React from 'react';
import { useState, useEffect } from 'react';



export default function Task() {

    const [tasks, setTasks] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [status, setStatus] = useState('');
    const [prazo, setPrazo] = useState('');

    const [tasksEdit, setTasksEdit] = useState({});
    const [tituloEdit, setTituloEdit] = useState('');
    const [conteudoEdit, setConteudoEdit] = useState('');
    const [prioridadeEdit, setPrioridadeEdit] = useState('');
    const [statusEdit, setStatusEdit] = useState('');
    const [prazoEdit, setPrazoEdit] = useState('');

    const [editar, setEditar] = useState(false)

    const task = {
        Titulo: titulo,
        Conteudo: conteudo,
        Prioridade: prioridade,
        Status: status,
        Prazo: prazo
    }

    const taskEdit = {
        Titulo: tituloEdit,
        Conteudo: conteudoEdit,
        Prioridade: prioridadeEdit,
        Status: statusEdit,
        Prazo: prazoEdit
    }


    const getAll = async () => {
        const request = await fetch('http://localhost:3001/get-all')
        const response = await request.json();
        setTasks(response);
    }

    const createTask = async (e) => {
        e.preventDefault()
        const request = await fetch('http://localhost:3001/create-task', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(task)
        })
        const response = await request.json()
        setTasks([...tasks, response])
    }

    const excluirTask = async (id) => {
        const request = await fetch(`http://localhost:3001/delete/${id}`, {
            method: 'DELETE'
        })
        getAll()
    }

    const editarTask = async (id) => {
        setEditar(true)
        const request = await fetch('http://localhost:3001/get-one/' + id)
        const response =await request.json()
        setTasksEdit(response)
    }

    const updateTask = async (e) => {
        e.preventDefault()
        const request = await fetch('http://localhost:3001/update/' + tasksEdit._id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(taskEdit)
        })
        const response = await request.json()
        setTasks([...tasks, response])
    }

    useEffect(() => {
        getAll()
    }, [])


    return (
        <div>
            <div>
                {!editar &&
                    <form onSubmit={createTask} method='POST'>
                        <h2>Adicionar</h2>
                        <div className="field">
                            <label htmlFor="">Titulo</label>
                            <input onChange={e => setTitulo(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Conteudo</label>
                            <input onChange={e => setConteudo(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Prioridade</label>
                            <input onChange={e => setPrioridade(e.target.value)} type="number" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Status</label>
                            <input onChange={e => setStatus(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Prazo</label>
                            <input onChange={e => setPrazo(e.target.value)} type="date" />
                        </div>
                        <button type="submit">Criar task</button>
                    </form>}
                {editar &&
                    <form onSubmit={updateTask} method='POST'>
                        <h2>Editar</h2>
                        <div className="field">
                            <label htmlFor="">Titulo</label>
                            <input value={tasksEdit.Titulo} onChange={e => setTituloEdit(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Conteudo</label>
                            <input value={tasksEdit.Conteudo} onChange={e => setConteudoEdit(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Prioridade</label>
                            <input value={tasksEdit.Prioridade} onChange={e => setPrioridadeEdit(e.target.value)} type="number" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Status</label>
                            <input value={tasksEdit.Status} onChange={e => setStatusEdit(e.target.value)} type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="">Prazo</label>
                            <input value={tasksEdit.Prazo} onChange={e => setPrazoEdit(e.target.value)} type="text" />
                        </div>
                        <button type="submit">Criar task</button>
                    </form>}

            </div>
            <div>
                {tasks.map(item => (
                    <ul>
                        <li>{item.Titulo}</li>
                        <li>{item.Conteudo}</li>
                        <li>{item.Prioridade}</li>
                        <li>{item.Status}</li>
                        <li>{item.Prazo}</li>
                        <button onClick={e => editarTask(item._id)}>Editar</button>
                        <button onClick={e => excluirTask(item._id)}>Excluir</button>
                    </ul>
                ))}
            </div>

        </div>
    )
}



