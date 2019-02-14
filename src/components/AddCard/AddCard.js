/**
 * Module dependencies.
 */
import React, {Component} from 'react';
import {Card, Form} from "semantic-ui-react";
import axios from "axios";
import {toast} from "react-toastify";






class AddCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quadrant: '',
            x: '',
            y: ''
        };

    }

    componentDidMount() {

    }
    /**
     * Fill state when user change the field
     */
    handleInput = (e, data) => {
        this.setState({[data.name]: data.value})
    }

    /**
     * Send request to server to create drone when form has been submitted
     */
    createDrone = () => {
        axios.post(this.props.back_end + '/drones/create', {
            quadrant: parseInt(this.state.quadrant,10),
            x: parseInt(this.state.x, 10),
            y: parseInt(this.state.y, 10)
        })
            .then((response) => {
                toast.success(response.data.message);
                this.setState({
                    quadrant: "",
                    x: "",
                    y: ""
                })
            })
            .catch((error) => {
                if (error.response)
                    toast.error(error.response.data.message);
                else
                    toast.error(error.message);


            });
    }



    render() {

        return (
            <Card centered fluid style={{margin: '20px 0'}}>
                <Card.Content>
                    <Card.Header>Add Drone</Card.Header>
                    <Form onSubmit={this.createDrone}>
                        <Form.Group widths='equal'>
                            <Form.Input value={this.state.quadrant}  name={"quadrant"}
                                        onChange={this.handleInput} fluid label='Quadrant' type={'number'}
                                        max={4} min={0} placeholder='choose a number between 0 and 4'/>
                            <Form.Input value={this.state.x} step="0.01" name={"x"} onChange={this.handleInput} fluid
                                        label='X' type={'number'} max={200}
                                        min={0} placeholder='choose a number between 0 and 200'/>
                            <Form.Input value={this.state.y} step="0.01" name={"y"} onChange={this.handleInput} fluid
                                        label='Y' type={'number'} max={200}
                                        min={0} placeholder='choose a number between 0 and 200'/>
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

export default AddCard;
