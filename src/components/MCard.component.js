import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StatusBar,
    StyleSheet
} from 'react-native';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const MCard = (props) => {

    const handleClick = () => {
        props.click(props.screen);
    }

    return(
        <TouchableOpacity style={styles.card} onPress={handleClick}>
            <Image source={props.icon} style={{width:WIDTH*0.09,height:WIDTH*0.1,opacity:0.7,marginBottom:'5%'}}/>
            <Text style={{textAlign:'center',opacity:0.7}}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.3,height:WIDTH*0.32,borderRadius:WIDTH*0.025,elevation:5,backgroundColor:'#FFF',alignItems:'center',paddingVertical:'15%',borderColor:constants.M1,borderWidth:0.5
    }
})

export default MCard;