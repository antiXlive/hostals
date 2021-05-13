import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';

import Almirah from '@assets/Almirah.png';
import Bed from '@assets/Bed.png';
import Chair from '@assets/Chair.png';
import Table from '@assets/Table.png';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const RoomSlot_Card = ({ slot, handlePress }) => {


    return (
        <TouchableOpacity onPress={() => handlePress ? handlePress(slot) : {}} style={{ borderWidth: slot.student ? 0 : 1, width: WIDTH * 0.88, height: HEIGHT * 0.24, borderRadius: WIDTH * 0.015, backgroundColor: slot.student ? constants.M1 : '#FFF', alignSelf: 'center', marginBottom: 20, flexDirection: 'row', borderColor: slot.student ? 'transparent' : '#00000095' }}>
            <View style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: WIDTH, backgroundColor: slot.student ? '#FFF' : 'transparent', borderColor: slot.student ? 'transparent' : constants.M1, borderWidth: 1, position: 'absolute', top: 10, left: 10, paddingTop: '13%', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.05, color: '#00000095' }}>{slot.number}</Text>
            </View>
            <View style={{ width: '55%', height: '100%', paddingTop: '21%', paddingLeft: '3%' }}>
                <Text numberOfLines={1} style={{ color: slot.student ? '#FFF' : '#00000095', fontSize: WIDTH * 0.045, marginBottom: 15 }}>{slot.hostelName} | {slot.roomName}</Text>
                <Text numberOfLines={1} style={{ color: slot.student ? '#FFF' : '#00000095', fontSize: WIDTH * 0.038, marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Name</Text> - {slot.student ? slot.studentName : 'N/A'}</Text>
                <Text numberOfLines={1} style={{ color: slot.student ? '#FFF' : '#00000095', fontSize: WIDTH * 0.038 }}><Text style={{ fontWeight: 'bold' }}>Roll</Text> - {slot.student ? slot.studentRoll : 'N/A'}</Text>
            </View>
            <View style={{ width: '45%', height: '100%', paddingVertical: '4%', justifyContent: 'space-between' }}>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', }}>
                    <View style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH, backgroundColor: '#FFF', borderColor: slot.student ? 'transparent' : constants.M1, borderWidth: slot.student ? 0 : 1 }}>
                        <Image source={Almirah} style={{ width: '90%', height: '90%' }} />
                    </View>
                    <View style={{ paddingLeft: 10, justifyContent: 'center', width: '80%', height: '30%' }}>
                        <Text numberOfLines={1} style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold', color: slot.student ? '#FFF' : '#00000095' }}>{slot.almirahNumber} | {slot.almirahKey}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', }}>
                    <View style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH, backgroundColor: '#FFF', borderColor: slot.student ? 'transparent' : constants.M1, borderWidth: slot.student ? 0 : 1 }}>
                        <Image source={Bed} style={{ width: '90%', height: '85%' }} />
                    </View>
                    <View style={{ paddingLeft: 10, justifyContent: 'center', width: '80%', height: '30%' }}>
                        <Text numberOfLines={1} style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold', color: slot.student ? '#FFF' : '#00000095' }}>{slot.bedNumber}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', }}>
                    <View style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH, backgroundColor: '#FFF', borderColor: slot.student ? 'transparent' : constants.M1, borderWidth: slot.student ? 0 : 1 }}>
                        <Image source={Chair} style={{ width: '80%', height: '80%' }} />
                    </View>
                    <View style={{ paddingLeft: 10, justifyContent: 'center', width: '80%', height: '30%' }}>
                        <Text numberOfLines={1} style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold', color: slot.student ? '#FFF' : '#00000095' }}>{slot.chairNumber}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', }}>
                    <View style={{ width: WIDTH * 0.06, height: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH, backgroundColor: '#FFF', borderColor: slot.student ? 'transparent' : constants.M1, borderWidth: slot.student ? 0 : 1 }}>
                        <Image source={Table} style={{ width: '80%', height: '80%' }} />
                    </View>
                    <View style={{ paddingLeft: 10, justifyContent: 'center', width: '80%', height: '30%' }}>
                        <Text numberOfLines={1} style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold', color: slot.student ? '#FFF' : '#00000095' }}>{slot.tableNumber} | {slot.tableKey}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default RoomSlot_Card;