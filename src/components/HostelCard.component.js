import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const HostelCard = (props) => {

    const handlePress = () => {
        props.click(props.name,props.ID);
    }

    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.card} onPress={() => handlePress()}>
            <View style={{height:'70%',alignItems:'center'}}>
                <Text style={{fontSize:WIDTH*0.1,color:'#FFF',fontWeight:'bold',letterSpacing:WIDTH*0.02}}>{props.name.substr(0,10)}</Text>
                <Text style={{fontSize:WIDTH*0.04,color:'#FFF',letterSpacing:WIDTH*0.005,paddingTop:HEIGHT*0.007}}>{props.category==1?'Boys Hostel':'Girls Hostel'}</Text>
            </View>
            <View style={{height:'20%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:WIDTH*0.05,marginTop:'2%'}}>
                <View style={{width:'40%',flexDirection:'row'}}>
                    <MaterialIcons name='meeting-room' size={20} color="#FFF"/>
                    <Text style={{color:'#FFF',paddingLeft:WIDTH*0.02,fontSize:WIDTH*0.045,marginTop:'-1.2%',fontWeight:'bold'}}>{props.rooms}</Text>
                </View>
                <View style={{width:'40%',flexDirection:'row',justifyContent:'flex-end'}}>
                    <Entypo name='man' size={19} color="#FFF"/>
                    <Text style={{color:'#FFF',paddingLeft:WIDTH*0.02,fontSize:WIDTH*0.045,marginTop:'-1.2%',fontWeight:'bold'}}>{props.students}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.8,
        height:HEIGHT*0.25,
        backgroundColor:constants.M1,
        alignSelf:'center',
        borderBottomColor:'#57C99A',
        borderBottomWidth:HEIGHT*0.01,
        paddingTop:HEIGHT*0.045,
        borderRadius:WIDTH*0.02,
        elevation:9,
        marginBottom:HEIGHT*0.05
    }
})
export default HostelCard;