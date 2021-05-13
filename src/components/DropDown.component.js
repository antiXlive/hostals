import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const DropDown = (props) => {




    return (
        <DropDownPicker
            isVisible={props.isVisible}
            onOpen={()=>{props.onOpen?props.onOpen():{},props.handleOpen?props.handleOpen(true):{}}}
            onClose={() => props.handleOpen?props.handleOpen(false):{}}
            items={props.data}
            searchable={props.searchable}
            searchablePlaceholder={props.searchablePlaceholder}
            placeholder={props.placeholder}
            placeholderStyle={{
                opacity: 0.5
            }}
            dropDownMaxHeight={HEIGHT * 0.2}
            containerStyle={{
                minHeight: HEIGHT * 0.065,
                width: WIDTH * 0.85,
                borderRadius: WIDTH * 0.02,
                borderWidth: 0,
                marginBottom: 15,
            }}
            style={{
                paddingLeft: 10,
                backgroundColor: '#00000010',
                borderRadius: WIDTH * 0.02,
                borderWidth: 0,
                zIndex:100
            }}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderRadius: WIDTH * 0.02,zIndex:100 }}
            onChangeItem={props.onChangeItem}
        />
    )
}

const styles = new StyleSheet.create({
})
export default DropDown;