import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Keyboard,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';


import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const BottomSheetActions = (props) => {

    const [bottom,setBottom] = useState(40);

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;


    useEffect(() => {
        keyboardDidShowListener =  Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener =  Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow () {
        setBottom(HEIGHT*0.24);
    }
    function _keyboardDidHide () {
        setBottom(0);
    }
    return(
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={{height:HEIGHT,backgroundColor:'#00000055'}}>
                <TouchableOpacity activeOpacity={0.9} style={{height:'100%'}} onPress={props.closeModal}></TouchableOpacity>                
                <View style={{height:'auto',position:'absolute',bottom:bottom+60,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,alignItems:'center'}}>
                    {
                        props.allot?(
                            <>
                            <TouchableOpacity onPress={props.allot} style={{height:HEIGHT*0.07,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                                <Text style={{color:'#0873FA',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>ALLOT</Text>
                            </TouchableOpacity>
                            <View style={{borderBottomWidth:1,borderColor:'#00000035',width:WIDTH*0.9,height:0.1}}></View>
                            </>
                        ):null
                    }
                    {
                        props.retain?(
                            <>
                            <TouchableOpacity onPress={props.retain} style={{height:HEIGHT*0.07,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                                <Text style={{color:'#0873FA',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>RETAIN SLOT</Text>
                            </TouchableOpacity>
                            <View style={{borderBottomWidth:1,borderColor:'#00000035',width:WIDTH*0.9,height:0.1}}></View>
                            </>
                        ):null
                    }
                    {
                        props.slot?(
                            <>
                            <TouchableOpacity onPress={props.slot} style={{height:HEIGHT*0.07,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                                <Text style={{color:'#0873FA',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>NEW SLOT</Text>
                            </TouchableOpacity>
                            <View style={{borderBottomWidth:1,borderColor:'#00000035',width:WIDTH*0.9,height:0.1}}></View>
                            </>
                        ):null
                    }
                    {/* <TouchableOpacity onPress={props.edit} style={{height:HEIGHT*0.07,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                        <Text style={{color:'#0873FA',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>EDIT</Text>
                    </TouchableOpacity> */}
                    <View style={{borderBottomWidth:1,borderColor:'#00000035',width:WIDTH*0.9,height:0.1}}></View>
                    <TouchableOpacity onPress={props.delete} style={{height:HEIGHT*0.07,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                        <Text style={{color:'#0873FA',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>DELETE</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={props.closeModal} style={{height:'7%',position:'absolute',bottom:bottom,width:WIDTH*0.95,alignSelf:'center',backgroundColor:'#FFF',borderRadius:10,paddingTop:'4%',alignItems:'center'}}>
                    <Text style={{color:'#E04139',fontSize:WIDTH*0.045,letterSpacing:WIDTH*0.004}}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        </>
    )
}


export default BottomSheetActions;