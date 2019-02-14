/**
 * Module dependencies.
 */
import React, {Component} from 'react';
import { Message} from "semantic-ui-react";




class OutRangedDrones extends Component {


    componentDidMount() {

    }


    render() {

        return (
            this.props.outRangedItems.length > 0 ?
                <Message style={{marginBottom: '50px'}} negative>
                    <Message.Header>outRanged Drones (X or Y greater than 200)</Message.Header>
                    {this.props.outRangedItems.map((item) =>
                        <p key={item.name}>plane '{item.name}' is out of range. x:{item.x} y:{item.y}</p>
                    )}

                </Message> : null
        );
    }
}

export default OutRangedDrones;
