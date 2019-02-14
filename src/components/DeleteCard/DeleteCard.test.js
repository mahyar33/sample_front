import React from 'react';
import DeleteCard from "./DeleteCard";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import sinon from 'sinon';
import {Form} from "semantic-ui-react";


configure({adapter: new Adapter()});

const back_end = process.env.back_end || 'http://localhost:8080';


describe('DeleteCard Component', () => {
    const result = {data: {message: 'ok'}};
    const promise = Promise.resolve(result);

    beforeAll(() => {
        sinon.stub(axios, 'delete').withArgs(back_end + `/drones/dfdf/delete`).returns(promise);
    });

    afterAll(() => {
        axios.get.restore();
    });
    it('test delete method when response is 200', (done) => {
        let wrapper = shallow(<DeleteCard options={[]} back_end={back_end}/>);
        wrapper.setProps({removeItem: 'dfdf'});
        expect(wrapper.state().removeId).toEqual('dfdf');
        const form = wrapper.find('Form');
        form.simulate('submit');
        process.nextTick(() => {
            expect(wrapper.state().removeId).toEqual('')
            console.log('hi', wrapper.state().removeId)
            done()
        })



    });

});