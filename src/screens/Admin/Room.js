import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Nodata from '@assets/no-data.png';
import NotifierBar from '@components/NotifierBar.component';
import RoomSlot_Card from '@components/RoomSlot_Card';
import Loader from '@components/Loader';
import { fetchRoomSlots } from '@actions/fetcherAction';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Room = ({ navigation, route }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoomSlots(route.params.room));
    }, []);



    const roomSlots = useSelector((state) => state.fetcher.roomSlots);
    const LOADER = useSelector((state) => state.common.loader);
    const NOTIFICATION = useSelector((state) => state.common.notification);



    return (
        <>
            <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
            <View style={{ backgroundColor: '#FFF', width: WIDTH, height: HEIGHT * 0.99, paddingTop: HEIGHT * 0.1 }}>
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
                    roomSlots.length > 0 ? (
                        <FlatList
                            data={roomSlots}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item._id.toString()}
                            style={{ width: '100%' }}
                            renderItem={({ item, index }) => (
                                <RoomSlot_Card slot={item} />
                            )}
                        />
                    ) : !LOADER ? (
                        <>
                            <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                            <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Room Slots Found</Text>
                        </>
                    ) : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Room;