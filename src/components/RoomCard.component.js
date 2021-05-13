import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const RoomCard = ({click,id,room,allottees,complaints}) => {

    const handlePress = () => {
        click(room,id);
    }
    let rm='10909021'

    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.card} onPress={() => handlePress()}>
            <View style={{height:'70%',alignItems:'center'}}>
                <Text style={{fontSize:WIDTH*0.1,color:'#FFF',fontWeight:'bold',letterSpacing:WIDTH*0.01}}>{room.substr(0,5)}</Text>
            </View>
            <View style={{height:'30%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:WIDTH*0.03}}>
                <View style={{width:'50%',flexDirection:'row',alignItems:'center'}}>
                    {
                        complaints>0?(
                            <>
                                <View style={{width:WIDTH*0.03,height:WIDTH*0.03,borderRadius:WIDTH,backgroundColor:'#FF4E4E',borderWidth:3,borderColor:'#FF4E4E70'}}></View>
                                <Text style={{color:'#F00',paddingLeft:WIDTH*0.02,fontSize:WIDTH*0.035,marginTop:'-2%',fontWeight:'bold'}}>{complaints}</Text>
                            </>
                        ):(
                            <>
                                <View style={{width:WIDTH*0.03,height:WIDTH*0.03,borderRadius:WIDTH,backgroundColor:'#05FF00',borderWidth:3,borderColor:'#05FF0070'}}></View>
                                <Text style={{color:'#FFF',paddingLeft:WIDTH*0.02,fontSize:WIDTH*0.035,marginTop:'-2%',fontWeight:'bold'}}>{complaints}</Text>
                            </>
                        )
                    }
                </View>
                <View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Entypo name='man' size={15} color="#FFF"/>
                    <Text style={{color:'#FFF',paddingLeft:WIDTH*0.01,fontSize:WIDTH*0.035,fontWeight:'bold'}}>{allottees}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.35,
        height:HEIGHT*0.18,
        backgroundColor:constants.M1,
        alignSelf:'center',
        borderBottomColor:'#57C99A',
        borderBottomWidth:HEIGHT*0.01,
        paddingTop:HEIGHT*0.04,
        borderRadius:WIDTH*0.02,
        elevation:9,
        marginBottom:HEIGHT*0.05
    }
})
export default RoomCard;