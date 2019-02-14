import React from 'react';
import AddCard from "./AddCard";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import sinon from 'sinon';
import {Form} from "semantic-ui-react";


configure({adapter: new Adapter()});

const back_end = process.env.back_end || 'http://localhost:8080';


describe('AddCard Component', () => {
    const result = {data: {message: 'ok'}};
    const promise = Promise.resolve(result);

    beforeAll(() => {
        sinon.stub(axios, 'post').withArgs(back_end + `/drones/create`, {quadrant: 2, x: 10, y: 20}).returns(promise);
    });

    afterAll(() => {
        axios.get.restore();
    });
    it('test post method when response is 200', (done) => {
        let wrapper = shallow(<AddCard back_end={back_end}/>);
        wrapper.setState({quadrant: '2', x: '10', y: '20'});
        const form = wrapper.find('Form');
        form.simulate('submit');
        process.nextTick(() => {
            expect(wrapper.state()).toEqual({quadrant: '', x: '', y: ''})
            done()
        })


    });

});