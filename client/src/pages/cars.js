import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../context/userContext'
import { db } from '../constant/constant'
import { Table, Button, Container, Modal, Form, Col, Badge, Nav } from "react-bootstrap"
import * as ROUTES from "../constant/constant"
const Cars = ({ }) => {
    const { user } = useContext(Context)
    const [cars, setCars] = useState([]);
    const history = useHistory()
    const [showUpdateCar, setShowUpdateCar] = useState(false);
    const [showAddNewCar, setShowAddNewCar] = useState(false);
    const [select, setSelect] = useState({});
    const [form, setForm] = useState({
        model: '',
        color: '',
    });
    useEffect(() => {
        setTimeout(() => {
            getCars()
        },1000)
    })

    if(cars) {
        cars.map((item, index) => {
            console.log(index +  " " + item.status)
        })
    }
    

    const handleDeleteCar = async (id) => {
        try {
            let token = user
            await fetch(`${db}inventory/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            })
            const items = [...cars];
            setCars(items.filter(item => item.id !== id))

        } catch (e) {
            console.log(e);
        }
    }
    const getCars = async () => {
        try {
            let token = user

            let res = await fetch(`${db}inventory`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            })

            let result = await res.json()
            setCars(result['vehicle list'])

        } catch (e) {
            console.log(e);
        }
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let token = user;
        try {
            await fetch(`${db}inventory/${select.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify(select)
            })
            getCars();
            setShowUpdateCar(false);
        } catch (e) {
            console.log(e)
        }
    }


    const onChange = (e) => {
        const f = { ...select };
        f[e.target.name] = e.target.value;
        console.log(select)
        if (e.target.name === 'maintenance') {
            f[e.target.name] = e.target.value === 'true';
        }
        setSelect(f);
    }


    const handleAddNewCar = async (e) => {
        e.preventDefault();
        let token = user;
        try {
            await fetch(`${db}inventory`, {
                method: 'Post',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify(form)
            })
            getCars();
            setShowAddNewCar(false);
        } catch (e) {
            console.log(e)

        } finally {
            setForm({
                model: '',
                color: ''
            })
        }
    }

    const updateForm = (e) => {
        const f = { ...form };
        f[e.target.name] = e.target.value;
        setForm(f);
    }



    return <Container>
        <h1>Cars <Button variant="success" onClick={() => setShowAddNewCar(true)}>Add New Car</Button></h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID#</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Accidents</th>
                    <th>Maintenance</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    cars.map(car => <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{car.model}</td>
                        <td>{car.color}</td>
                        <td>{car.accidents}</td>
                        <td>{car.maintenance === true ? <Badge variant='danger'>YES</Badge> : <Badge variant='primary'>NO</Badge>}</td>
                        <td>{car.status}</td>
                        <td>
                            <Button size='sm' onClick={() => { setShowUpdateCar(true); setSelect({ ...car }); }} className='ml-1' variant="dark">Edit</Button>
                            <Button size='sm' onClick={() => { handleDeleteCar(car.id) }} className='ml-1' variant="danger">Delete</Button>
                   
                            <Link to = {`https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas%20login&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&gclid=CjwKCAjw-e2EBhAhEiwAJI5jgwHDikdyV82h1iOH6yHtHmqz0UCSBRlg8lhfo0ZGae7wD2pO1jTgwBoCPSMQAvD_BwE`}>
                                <Button size='sm' className='ml-1' variant="success" >View Data</Button>
                            </Link>
                           
                            
                        </td>

                    </tr>)
                }
            </tbody>
        </Table>
        <Modal show={showAddNewCar} onHide={() => setShowAddNewCar(false)} animation={false}>
            <Form onSubmit={handleAddNewCar} >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control name="model" onChange={updateForm} value={form.model || ''} />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Car Color</Form.Label>
                            <Form.Control name="color" onChange={updateForm} value={form.color || ''} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowAddNewCar(false)} variant="secondary">Close</Button>
                    <Button type='submit' variant="primary">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        <Modal show={showUpdateCar} onHide={() => setShowUpdateCar(false)} animation={false}>
            <Form onSubmit={handleFormSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Car {select.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Model</Form.Label>
                            <Form.Control name="model" onChange={onChange} value={select.model || ''} />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Color</Form.Label>
                            <Form.Control name="color" onChange={onChange} value={select.color || ''} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Accidents</Form.Label>
                            <Form.Control name="accidents" type='number' onChange={onChange} value={select.accidents} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Transactions</Form.Label>
                            <Form.Control name="transactions" type='number' onChange={onChange} value={select.transactions} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Maintenance</Form.Label>
                            <Form.Control name='maintenance' onChange={onChange} value={select.maintenance} as="select">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowUpdateCar(false)} variant="secondary">Close</Button>
                    <Button type='submit' variant="primary">Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </Container >

}

export default Cars;