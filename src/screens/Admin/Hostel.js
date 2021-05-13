import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StatusBar,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Nodata from '@assets/no-data.png';
import NotifierBar from '@components/NotifierBar.component';


import { fetchRoomByHostel } from '@actions/fetcherAction';
import Loader from '@components/Loader';
import RoomCard from '@components/RoomCard.component';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Hostel = ({ navigation, route }) => {
    const HID = route.params.hid;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoomByHostel(HID));
    }, []);

    const rooms = useSelector((state) => state.fetcher.hostelRooms);
    const LOADER = useSelector((state) => state.common.loader);
    const NOTIFICATION = useSelector((state) => state.common.notification);


    const handlePress = (room, rid) => {
        let x = route.params.headerLabel + ' | ' + room;
        navigation.navigate('room', { room: rid, headerLabel: x })
    }





    return (
        <>
            <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
            <View style={{ backgroundColor: '#FFF', width: WIDTH, height: HEIGHT, paddingTop: HEIGHT * 0.1 }}>
                {
                    LOADER ? (
                        <Loader />
                    ) : null
                }
                {
                    NOTIFICATION
                        ? (
                            <NotifierBar msg1={NOTIFICATION.msg} type={NOTIFICATION.type} endsIn={2000} />
                        )
                        : null
                }
                {
                    rooms.length > 0 ? (
                        <FlatList
                            data={rooms}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={item => item._id.toString()}
                            style={{ width: WIDTH, height: '100%' }}
                            renderItem={({ item, index }) => (
                                <View style={{ height: 'auto', width: WIDTH * 0.5 }}>
                                    <RoomCard click={handlePress} id={item._id} room={item.name} allottees={item.students} complaints={item.complaints} />
                                </View>
                            )}
                        />
                    ) : !LOADER ? (
                        <>
                            <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                            <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Rooms Found</Text>
                        </>
                    ) : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Hostel;