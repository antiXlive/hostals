import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import almirahImg from '@assets/Almirah.png';
import tableImg from '@assets/Table.png';
import keyImg from '@assets/key.png';
import bedImg from '@assets/Bed.png';
import chairImg from '@assets/Chair.png';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const StudentCard = ({index,name,roll,department,degree,year,mobile,bed,chair,almirah,akey,table,tkey}) => {

    const handlePress = () => {
        // click(room);
    }

    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.card} onPress={() => handlePress()}>
            <View style={{height:'45%',flexDirection:'row'}}>
                <View style={{width:'15%',paddingTop:HEIGHT*0.025,paddingLeft:WIDTH*0.02,overflow:'hidden'}}>
                    <View style={{position:'absolute',width:WIDTH*0.17,height:WIDTH*0.22,borderRadius:WIDTH,backgroundColor:'#63DB9630',transform:[{rotate:'35deg'}],top:'-7%',left:'-75%'}}></View>
                    <Text style={{fontSize:WIDTH*0.05}}>{index}.</Text>
                </View>
                <View style={{width:'85%',paddingTop:'4%',paddingLeft:'1%'}}>
                    <Text style={{fontSize:WIDTH*0.05,letterSpacing:WIDTH*0.008}}>{name}</Text>
                    <Text style={{fontSize:WIDTH*0.04,letterSpacing:WIDTH*0.002,marginTop:'2.5%',opacity:0.6}}>{degree}  |  {year}  -  {department}</Text>
                    <Text style={{fontSize:WIDTH*0.035,letterSpacing:WIDTH*0.002,marginTop:'2.5%',opacity:0.6}}>{roll}  |  {mobile}</Text>
                </View>
            </View>
            <View style={{height:'48%',marginTop:'6%',backgroundColor:'#63DB9610',paddingTop:'2%'}}>
                <View style={{height:'45%',flexDirection:'row',paddingHorizontal:'3%'}}>
                    <View style={{width:'50%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                        <Image source={almirahImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginRight:'4%'}}/>
                        <Text>{almirah}</Text>
                        <Image source={keyImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginHorizontal:'4%'}}/>
                        <Text>{akey}</Text>
                    </View>
                    <View style={{width:'50%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                        <Text>{tkey}</Text>
                        <Image source={keyImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginHorizontal:'4%'}}/>
                        <Text>{table}</Text>
                        <Image source={tableImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginLeft:'4%'}}/>
                    </View>
                </View>
                <View style={{height:'45%',flexDirection:'row',paddingHorizontal:'3%'}}>
                    <View style={{width:'50%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                        <Image source={bedImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginRight:'5%'}}/>
                        <Text>{bed}</Text>
                    </View>
                    <View style={{width:'50%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                        <Text>{chair}</Text>
                        <Image source={chairImg} style={{width:WIDTH*0.08,height:WIDTH*0.08,marginLeft:'5%'}}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.9,
        height:HEIGHT*0.27,
        alignSelf:'center',
        backgroundColor:'#FBFBFC',
        borderRadius:WIDTH*0.02,
        elevation:9,
        marginBottom:HEIGHT*0.05,
        overflow:'hidden'
    }
})
export default StudentCard;