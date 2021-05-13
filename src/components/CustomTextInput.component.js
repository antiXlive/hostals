import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const CustomTextInput = (props) => {

    const value = props.value;
    const name = props.name;
    const placeholder = props.placeholder;
    const handleChange = props.handleChange;
    const empty = props.empty;
    const capitalize = props.capitalize;
    const type = props.type;
    const length = props.length;

    const capital = capitalize?capitalize:"none"
    // console.log(value);
    const inputValue = value?value:'';
    const kType = type?type:'default'
    const mLength = length?length:50


    return(
        <View style={{position:'relative',height:HEIGHT*0.065,marginBottom:empty.status?HEIGHT*0.03:HEIGHT*0.022}}>
        <View style={
                [
                    styles.textInput,
                    empty.status?styles.errorInput:null,
                    {flexDirection:'row'},
                    props.style
                ]
            } 
        >
			<TextInput
                defaultValue={inputValue}
                autoCapitalize={capital}
                keyboardType= {kType}
                maxLength={mLength}
                style={[{width:'100%'},props.style]}
                placeholder={placeholder}
				onChangeText={(text) => handleChange(name, text)} 
                multiline={props.multiline}
			/>
		</View>
        {
            empty.status
            ?(
                <Text style={styles.errorText}>
                    {empty.msg}
                </Text>
            )
            :null
        }
        </View>
    )
}

const styles = new StyleSheet.create({
    textInput: {
        width:WIDTH*0.85,
        paddingLeft: 10,
        backgroundColor: '#00000010',
        borderRadius: WIDTH*0.02,
    },
    errorInput: {
        borderWidth:1,
        borderColor:'red'
    },
    errorText: {
        color:'red',
        fontSize:WIDTH*0.03,
        position:'absolute',
        right:'3%',
        bottom:-20,
        opacity:0.7,
    }
})
export default CustomTextInput;