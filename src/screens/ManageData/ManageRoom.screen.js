import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircularPLusButton } from '@components/CustomButton.component';
import NotifierBar from '@components/NotifierBar.component';
import { BottomSheetForm_Add_Room } from '@components/BottomSheetForm.component';
import BottomSheetActions from '@components/BottomSheetActions.component';
import Nodata from '@assets/no-data.png';
import Data_Card from '@components/Data_Card';
import Loader from '@components/Loader';

import { fetchRoomByHostel } from '@actions/fetcherAction';
import { deleteRoom } from '@actions/deleterAction';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const ManageRoom = ({ navigation, route }) => {

    const HOSTEL = route.params.hostel;
    const NAME = route.params.name;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoomByHostel(HOSTEL));
    }, []);

    const TOKEN = useSelector((state) => state.auth.token);
    const rooms = useSelector((state) => state.fetcher.hostelRooms);
    const NOTIFICATION = useSelector((state) => state.common.notification);
    const LOADER = useSelector((state) => state.common.loader);

    const [showForm, setSF] = useState(false);
    const [options, setOP] = useState(false);
    const [selected, setSelected] = useState(null);


    const handleAdd = () => {
        setSF(true);
    }
    const handleDelete = () => {
        let data = {
            id: selected._id,
            hid: selected.hostel
        }
        dispatch(deleteRoom(data, TOKEN));
        setOP(false);
    }

    const handleNavigation = (room) => {
        navigation.navigate('Manage Room Slots', { room: room })
    }

    return (
        <View style={{ width: WIDTH, height: HEIGHT * 0.98, paddingTop: HEIGHT * 0.1, alignItems: 'center' }}>
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
                rooms && rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item, index }) => (
                            <Data_Card cardTouch={() => handleNavigation(item)} data={item} onPress={() => { setSelected(item), setOP(true) }} />
                        )}
                    />
                ) : !LOADER?(
                    <>
                        <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                        <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Rooms Found</Text>
                    </>
                ):null
            }

            <CircularPLusButton handleAdd={handleAdd} />
            {
                showForm ? (
                    <BottomSheetForm_Add_Room label='Add Room' closeModal={() => setSF(false)} id={HOSTEL} name={NAME} token={TOKEN} />
                ) : null
            }
            {
                options ? (
                    <BottomSheetActions closeModal={() => setOP(false)} delete={handleDelete} />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
})

export default ManageRoom;