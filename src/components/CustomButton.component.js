import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const CustomButtonFilled = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.5} style={[styles.filledButton, props.style]} onPress={props.click}>
            <View>
                <Text style={{fontSize:17, textAlign:'center', color:props.theme=='light'?'#00000090':'white'}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}
const CustomButtonOutlined = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.5} style={[styles.outlinedButton, props.style]} onPress={() => props.click(props.index)}>
            <View>
                <Text style={{fontSize:17, textAlign:'center', color:'white'}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}
const CircularPLusButton = (props) => {
    return(
        <TouchableOpacity onPress={props.handleAdd} style={{position:'absolute',bottom:0,width:WIDTH*0.15,height:WIDTH*0.15,backgroundColor:constants.M1,alignSelf:'center',borderRadius:WIDTH,marginBottom:HEIGHT*0.03,elevation:20,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#FFF',fontSize:WIDTH*0.15,marginTop:-HEIGHT*0.01}}>+</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    filledButton:{
        alignSelf:'center',
        width: WIDTH * 0.6,
        textAlign:'center',
        borderRadius:WIDTH*0.02,
        height:45,
        justifyContent:'center',
        backgroundColor:constants.M1,
        elevation:5,
    },
    outlinedButton:{
        alignSelf:'center',
        width: WIDTH * 0.7,
        textAlign:'center',
        // marginTop:40,
        // marginBottom:20,
        borderRadius:WIDTH*0.025,
        borderColor:'white',
        borderWidth:1,
        height:45,
        justifyContent:'center',
    },
})
export{
    CustomButtonFilled, 
    CustomButtonOutlined,
    CircularPLusButton
}