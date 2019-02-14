import React from 'react';
import OutRangedDrones from "./OutRangedDrones";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Form} from "semantic-ui-react";


configure({adapter: new Adapter()});

const back_end = process.env.back_end || 'http://localhost:8080';


describe('OutRangedDrones Component', () => {



    it('render OutRangedDrones without item', () => {
        let wrapper = shallow(<OutRangedDrones outRangedItems={[]} />);
        expect(wrapper.type()).toEqual(null)




    });

});