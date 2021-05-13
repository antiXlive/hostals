import React from 'react';
import {
    Text, Touchable, TouchableOpacity, View,
} from 'react-native';

import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ComplaintCard = (props) => {

    const hostelName = props.hostelName;
    const roomName = props.roomName;
    const message = props.message;
    const resolved = props.resolved;
    return (
        <View style={{ width: WIDTH * 0.9, minHeight: HEIGHT * 0.2, alignSelf: 'center', borderRadius: props.resolveComplain ? WIDTH * 0.02 : WIDTH * 0.01, borderTopColor: resolved ? constants.M1 : 'red', borderTopWidth: 5, backgroundColor: resolved ? '#63DB9625' : '#FF4E4E10', paddingTop: '3%', marginBottom: 20 }}>
            <View style={{ width: '100%', height: HEIGHT * 0.05, flexDirection: 'row' }}>
                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 10 }}>Hostel -</Text>
                    <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{hostelName}</Text>
                </View>
                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 10 }}>Room -</Text>
                    <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{roomName}</Text>
                </View>
            </View>
            {
                props.studentName ? (
                    <View style={{ width: '100%', height: HEIGHT * 0.05, flexDirection: 'row' }}>

                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 10 }}>Name -</Text>
                            <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{props.studentName}</Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 10 }}>Roll -</Text>
                            <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{props.studentRoll}</Text>
                        </View>
                    </View>
                ) : null
            }
            <View style={{ width: '100%', paddingHorizontal: '4%', paddingVertical: '2%', marginTop: 10, paddingBottom: 20 }}>
                <Text style={{ lineHeight: HEIGHT * 0.028, letterSpacing: WIDTH * 0.001 }}>
                    <Text style={{ fontWeight: 'bold' }}>ISSUE</Text> - {message}
                </Text>
            </View>
            {
                props.resolveComplain ? (
                    <TouchableOpacity onPress={props.resolveComplain} style={{ width: '100%', height: HEIGHT * 0.06, backgroundColor: '#59C957', borderBottomLeftRadius: WIDTH * 0.04, borderBottomRightRadius: WIDTH * 0.04, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: WIDTH * 0.05, letterSpacing: WIDTH * 0.003, }}>RESOLVE</Text>
                    </TouchableOpacity>
                ) : null
            }


        </View>
    )
}

export default ComplaintCard;