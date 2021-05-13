import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;





const Data_Card = (props) => {


    const TextBox = ({ label, value, width }) => {
        return (
            <View style={{ flexDirection: 'row', height: HEIGHT * 0.035 }}>
                <Text style={[styles.label, props.data.slot || props.data.category || props.data.hostel || props.data.roll ? styles.labelAlloted : styles.labelUnalloted]}>{label} :</Text>
                <View style={{ maxWidth: '78%' }}>
                    <Text numberOfLines={1} style={[styles.value, props.data.slot || props.data.category || props.data.hostel || props.data.roll ? styles.valueAlloted : styles.valueUnalloted]}>
                        {
                            typeof value == 'number' ? value : value ? value : '____'
                        }
                    </Text>
                </View>
            </View>
        )
    }



    return (
        <TouchableOpacity onPress={props.cardTouch ? props.cardTouch : null} style={[styles.cardCommon, props.data.slot || props.data.category || props.data.hostel || props.data.roll ? styles.cardAlloted : styles.cardUnalloted]}>
            <TouchableOpacity onPress={props.onPress} style={{ width: WIDTH * 0.1, height: HEIGHT * 0.03, justifyContent: 'space-between', position: 'absolute', right: 10, top: 15, zIndex: 10,flexDirection:'row',paddingHorizontal:'15%' }}>
                <View style={{ backgroundColor: props.data.slot || props.data.category || props.data.hostel || props.data.roll ? 'rgba(255, 255, 255, 0.90)' : '#00000070', width: WIDTH * 0.012, height: WIDTH * 0.012, borderRadius: WIDTH }}></View>
                <View style={{ backgroundColor: props.data.slot || props.data.category || props.data.hostel || props.data.roll ? 'rgba(255, 255, 255, 0.90)' : '#00000070', width: WIDTH * 0.012, height: WIDTH * 0.012, borderRadius: WIDTH }}></View>
                <View style={{ backgroundColor: props.data.slot || props.data.category || props.data.hostel || props.data.roll ? 'rgba(255, 255, 255, 0.90)' : '#00000070', width: WIDTH * 0.012, height: WIDTH * 0.012, borderRadius: WIDTH }}></View>
            </TouchableOpacity>

            {/* STUDENT SCREEN */}
            {props.data.name ? (<TextBox label='NAME' value={props.data.name} />) : null}
            {props.data.roll ? (<TextBox label='ROLL' value={props.data.roll} />) : null}
            {props.data.email ? (<TextBox label='EMAIL' value={props.data.email} />) : null}
            {props.data.batch ? (<TextBox label='BATCH' value={props.data.degree + ' | ' + props.data.batch} />) : null}
            {props.data.contact ? (<TextBox label='CONTACT' value={props.data.contact} />) : null}

            {/* BELONGINGS SCREEN */}
            {props.data.number ? (<TextBox label='NUMBER' value={props.data.number} />) : null}
            {props.data.key ? (<TextBox label='KEY' value={props.data.key} />) : null}
            {props.data.hostelName || props.data.number ? (<TextBox label='HOSTEL' value={props.data.hostelName} />) : null}
            {props.data.number ? (<TextBox label='ROOM' value={props.data.roomName} />) : null}

            {/* HOSTEL SCREEN */}
            {props.data.category ? (<TextBox label='CATEGORY' value={props.data.category == 1 ? 'Boys Hostel' : 'Girls Hostel'} />) : null}
            {props.data.category ? (<TextBox label='ROOMS' value={props.data.rooms} />) : null}
            {props.data.category ? (<TextBox label='STUDENTS' value={props.data.students} />) : null}

            {/* ROOM SCREEN */}
            {typeof props.data.complaints && props.data.hostel ? (<TextBox label='SLOTS' value={props.data.slots} />) : null}
            {typeof props.data.complaints && props.data.hostel ? (<TextBox label='STUDENTS' value={props.data.students} />) : null}
            {typeof props.data.complaints && props.data.hostel ? (<TextBox label='COMPLAINTS' value={props.data.complaints} />) : null}



        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardCommon: {
        width: WIDTH * 0.9, paddingHorizontal: '5%', paddingVertical: '3%', justifyContent: 'space-between', marginBottom: '5%', borderRadius: WIDTH * 0.015
    },
    cardAlloted: {
        backgroundColor: constants.M1
    },
    cardUnalloted: {
        borderWidth: 1, borderColor: constants.M1, backgroundColor: 'transparent'
    },
    label: {
        fontSize: WIDTH * 0.035, fontWeight: 'bold', marginRight: 15
    },
    labelAlloted: {
        color: '#FFF'
    },
    labelUnalloted: {
        color: '#000'
    },
    value: {
        fontSize: WIDTH * 0.036, letterSpacing: WIDTH * 0.0025, width: '100%'
    },
    valueAlloted: {
        color: '#FFF'
    },
    valueUnalloted: {
        color: '#000'
    }
})
export default Data_Card;