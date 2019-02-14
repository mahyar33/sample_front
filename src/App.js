/**
 * Module dependencies.
 */
import React, {Component} from 'react';
import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {Container} from "semantic-ui-react";
import { ToastContainer} from "react-toastify";
import Chart from "./components/Chart/Chart";
import AddCard from "./components/AddCard/AddCard";
import DeleteCard from "./components/DeleteCard/DeleteCard";
import OutRangedDrones from "./components/OutRangedDrones/OutRangedDrones";
const back_end = process.env.back_end || 'http://localhost:8080';
const socket = io(back_end);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: [],
            outRangedDrones: [],
            removeId: null
        };

    }


    componentDidMount() {
        socket.on('event', (data) => {
            this.convertData(data);
        });
    }

    /**
     * Detect outRanged drones
     */
    checkRange = (item) => {

        if (item.x > 200 || item.y > 200)
            if (!this.state.outRangedDrones.some(e => e.name === item.name))
                this.setState({outRangedDrones: [...this.state.outRangedDrones, item]})
            else {
                this.setState({
                    outRangedDrones: this.state.outRangedDrones.filter(function (obj) {
                        return obj.name !== item.name;
                    })
                });

            }


    }

    /**
     * Convert data to show in chart and show in dropdown
     */
    convertData = (data) => {
        let options = []
        if (Array.isArray(data)) {
            data.map((item) => {
                item.x=parseFloat(item.x);
                item.y=parseFloat(item.y);
                item.quadrant=parseInt(item.quadrant);
                options.push({text: item.id, value: item.id, key: item.id})
                item.name = item.id;
                delete item.id;
                switch (item.quadrant) {
                    case 2:
                        item.x = -item.x;
                        break;
                    case 3:
                        item.x = -item.x;
                        item.y = -item.y;
                        break;
                    case 4:
                        item.y = -item.y;
                        break;

                }
                delete item.quadrant;
                this.checkRange(item)
            })

        } else {
            data = []

        }

        this.setState({data, options}, () => {
            console.log('state', this.state.data)
        });
    }
    /**
     * Set removeId to send DeleteCard when user Click the point on chart
     */
    selectedPoint = (item) => {
        this.setState({removeId: item})
    }

    render() {

        return (
            <div className="App">
                <ToastContainer position="top-left"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover/>
                <Container>
                    <AddCard back_end={back_end}/>
                    <DeleteCard options={this.state.options} removeItem={this.state.removeId} back_end={back_end}/>
                    <Chart selectedPoint={this.selectedPoint} data={this.state.data}/>
                    <OutRangedDrones outRangedItems={this.state.outRangedDrones}/>
                </Container>
            </div>
        );
    }
}

export default App;
