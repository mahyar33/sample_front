/**
 * Module dependencies.
 */
import React, {Component} from 'react';
import {Card, Form} from "semantic-ui-react";
import axios from "axios";
import {toast} from "react-toastify";
import {isEqual} from "lodash";


class DeleteCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            removeId: null
        };
    }

    /**
     * Check if user click the point on chart change dropdown
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEqual(prevProps.removeItem, this.props.removeItem))
            this.setState({removeId: this.props.removeItem})
    }

    /**
     * Send request to server to delete drone when form has been submitted
     */
    removeDrone = () => {
        axios.delete(this.props.back_end + `/drones/${this.state.removeId}/delete`, {}).then((response) => {
            toast.success(response.data.message);
            this.setState({
                removeId: ""
            })
        })
            .catch((error) => {
                if (error.response)
                    toast.error(error.response.data.message);
                else
                    toast.error(error.message);
            });
    }

    /**
     * Fill state when user change dropdown
     */
    handleInput = (e, data) => {
        this.setState({[data.name]: data.value})
    }


    render() {

        return (
            <Card centered fluid style={{margin: '20px 0'}}>
                <Card.Content>
                    <Card.Header>Remove Drone</Card.Header>
                    <Form onSubmit={this.removeDrone}>
                        <p>You can select by click the point on chart</p>
                        <Form.Group widths='equal'>
                            <Form.Select onChange={this.handleInput} fluid label='Drone List'
                                         options={this.props.options} name={'removeId'}
                                         value={this.state.removeId} placeholder='Select Drone'/>
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

export default DeleteCard;
