import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants.js';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const RoleSelector = ({navigation}) => {

    const redirect = (role) => {
        navigation.navigate('signin',{role:role})
    }
    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor={constants.M1}/>
        <View style={{width:WIDTH,height:HEIGHT*0.98}}>
            <TouchableOpacity onPress={()=>redirect(1)} activeOpacity={0.8} style={{alignItems:'center',justifyContent:'center',width:WIDTH*1.2,height:HEIGHT*0.52,backgroundColor:constants.M1,marginLeft:'-10%',transform: [{ rotate: '9deg' }],marginTop:'-8%'}}>
                <Text style={{fontSize:WIDTH*0.1,color:'#FFF',letterSpacing:WIDTH*0.008,transform:[{rotate:'-9deg'}]}}>ADMIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>redirect(2)} activeOpacity={0.8} style={{alignItems:'center',justifyContent:'center',width:WIDTH*1.2,height:HEIGHT*0.54,backgroundColor:'#29ffc6',marginLeft:'-10%',transform: [{ rotate: '9deg' }],}}>
                <Text style={{fontSize:WIDTH*0.1,color:'#FFF',letterSpacing:WIDTH*0.008,transform:[{rotate:'-9deg'}]}}>STUDENT</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
})

export default RoleSelector;