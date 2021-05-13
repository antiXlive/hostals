import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LOGO from '@assets/hostals.png';
import Vector1 from '@assets/IDCard_Vector_1.png';
import Boy from '@assets/Boy_Avatar.png';
import Girl from '@assets/Girl_Avatar.png';
import Almirah from '@assets/Almirah.png';
import Bed from '@assets/Bed.png';
import Chair from '@assets/Chair.png';
import Table from '@assets/Table.png';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Student_ID_Card = ({student}) => {

    const [face, setFace] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.swapper, { backgroundColor: face ? '#FFF' : constants.M1 }]} onPress={() => { setFace(!face) }}>
                <Ionicons name='scan-outline' size={18} color={face ? "#000" : '#FFF'} />
            </TouchableOpacity>
            <View style={[styles.IDCARD, { backgroundColor: face ? '#FFF' : constants.M1, overflow: 'hidden' }]} onTouchEnd={() => setFace(!face)}>
                {
                    face ? (
                        <>
                            <View style={{ height: '100%', width: '90%' }}>
                                <View style={{ width: '100%', height: '35%', paddingTop: '5%' }}>
                                    <View style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 30 }}>Email</Text>
                                        <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{student.email}</Text>
                                    </View>
                                    <View style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: WIDTH * 0.035, paddingRight: 14 }}>Contact</Text>
                                        <Text style={{ opacity: 0.8, letterSpacing: WIDTH * 0.002, fontSize: WIDTH * 0.035 }}>{student.contact}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: '65%', paddingTop: '5%', paddingLeft: '3%' }}>
                                    <View style={{ height: '50%', flexDirection: 'row' }}>
                                        <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: WIDTH, borderColor: constants.M1 }}>
                                                <Image source={Almirah} style={{ width: '90%', height: '90%' }} />
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: constants.M1, width: '5%' }}></View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: constants.M1, borderRadius: WIDTH, width: '70%', height: '70%' }}>
                                                <Text style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold' }}>{student.bedNumber ? student.almirahNumber + ' | ' + student.almirahKey : 'N/A'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: WIDTH, borderColor: constants.M1 }}>
                                                <Image source={Bed} style={{ width: '95%', height: '95%' }} />
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: constants.M1, width: '5%' }}></View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: constants.M1, borderRadius: WIDTH, width: '70%', height: '70%' }}>
                                                <Text style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold' }}>{student.bedNumber ? student.bedNumber : 'N/A'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: '50%', flexDirection: 'row' }}>
                                        <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: WIDTH, borderColor: constants.M1 }}>
                                                <Image source={Table} style={{ width: '80%', height: '80%' }} />
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: constants.M1, width: '5%' }}></View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: constants.M1, borderRadius: WIDTH, width: '70%', height: '70%' }}>
                                                <Text style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold' }}>{student.bedNumber ? student.tableNumber + ' | ' + student.tableKey : 'N/A'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: WIDTH, borderColor: constants.M1 }}>
                                                <Image source={Chair} style={{ width: '80%', height: '80%' }} />
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: constants.M1, width: '5%' }}></View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: constants.M1, borderRadius: WIDTH, width: '70%', height: '70%' }}>
                                                <Text style={{ fontSize: WIDTH * 0.032, fontWeight: 'bold' }}>{student.bedNumber ? student.chairNumber : 'N/A'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: '100%', width: '10%', backgroundColor: constants.M1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={LOGO} style={{ width: WIDTH * 0.25, height: WIDTH * 0.045, transform: [{ rotate: '-90deg' }] }} />
                            </View>
                        </>
                    ) : (
                        <>
                            <Image source={Vector1} style={{ position: 'absolute', height: '100%', width: WIDTH * 0.25, right: -10 }} />
                            <View style={{ height: '100%', width: '35%', paddingTop: '5%', paddingLeft: '5%' }}>
                                <View style={{ borderWidth: 1, borderColor: '#FFF', width: '65%', height: '55%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={student.gender == 1 ? Boy : Girl} style={{ width: '90%', height: '90%' }} />
                                </View>
                            </View>
                            <View style={{ height: '100%', width: '60%', paddingTop: '5%', marginLeft: '-2%' }}>
                                <Text style={{ letterSpacing: WIDTH * 0.006, color: '#fff', fontSize: WIDTH * 0.05, lineHeight: HEIGHT * 0.05 }}>{student.name}</Text>
                                <Text style={{ letterSpacing: WIDTH * 0.006, color: '#fff', fontSize: WIDTH * 0.035, lineHeight: HEIGHT * 0.03 }}>{student.roll + ' | ' + student.department}</Text>
                                <Text style={{ letterSpacing: WIDTH * 0.006, color: '#fff', fontSize: WIDTH * 0.035, lineHeight: HEIGHT * 0.03 }}>{student.degree + ' | ' + student.batch}</Text>
                            </View>
                            <View style={{ position: 'absolute', width: '50%', height: '30%', bottom: 0, left: '25%', alignItems: 'center' }}>
                                <View style={{ borderRadius: WIDTH, width: '90%', height: '70%', borderWidth: 1, borderColor: student.hostelName ? '#FFF' : '#FF0000', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: student.hostelName ? '#FFF' : '#FF0000', fontWeight: student.hostelName ? 'bold' : '400', fontSize: WIDTH * 0.05 }}>{student.hostelName ? student.hostelName + ' | ' + student.roomName : 'UNALLOTED'}</Text>
                                </View>
                                <View style={{ width: 1, borderWidth: 1, height: '30%', borderColor: student.hostelName ? '#FFF' : '#FF0000' }}></View>
                            </View>
                        </>
                    )
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH, height: HEIGHT * 0.3, alignItems: 'center'
    },
    swapper: {
        width: WIDTH * 0.16, height: WIDTH * 0.1, borderTopLeftRadius: WIDTH * 0.03, borderTopRightRadius: WIDTH * 0.03, alignItems: 'center', paddingTop: 3, elevation: 10
    },
    IDCARD: {
        width: WIDTH * 0.95, height: HEIGHT * 0.25, alignSelf: 'center', borderRadius: WIDTH * 0.015, elevation: 10, position: 'relative', top: '-5%', flexDirection: 'row'
    }
})

export default Student_ID_Card;