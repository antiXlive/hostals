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
import { BottomSheetForm_Room_Slot, BottomSheetForm_Handle_Allotment } from '@components/BottomSheetForm.component';
import BottomSheetActions from '@components/BottomSheetActions.component';
import Nodata from '@assets/no-data.png';
import RoomSlot_Card from '@components/RoomSlot_Card';
import NotifierBar from '@components/NotifierBar.component';
import { fetchRoomSlots } from '@actions/fetcherAction';
import { allotRoomSlot } from '@actions/creatorAction';
import { deleteRoomSlot, retainSlot } from '@actions/deleterAction';
import Loader from '@components/Loader';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const ManageRoomSlots = (props) => {

    const ROOM = (props.route.params.room);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoomSlots(ROOM._id));
    }, []);

    const TOKEN = useSelector((state) => state.auth.token);
    const roomSlots = useSelector((state) => state.fetcher.roomSlots);
    const NOTIFICATION = useSelector((state) => state.common.notification);
    const LOADER = useSelector((state) => state.common.loader);


    const [allotForm, setAllotForm] = useState(false);
    const [slotForm, setSlotForm] = useState(false);
    const [options, setOP] = useState(false);
    const [selected, setSelected] = useState(null);


    const handleAdd = () => {
        setSlotForm(true);
    }
    const handleDelete = () => {
        let data = {
            id: selected._id,
            hid: selected.hostel,
            room: selected.room
        }
        dispatch(deleteRoomSlot(data, TOKEN));
        setOP(false);
    }
    const showAllotmentForm = () => {
        setAllotForm(true);
        setOP(false);
    }
    const handleAllotment = (student) => {
        dispatch(allotRoomSlot(selected._id, student, selected.room, TOKEN));
        setAllotForm(false);
    }
    const handleRetain = () => {
        dispatch(retainSlot(selected._id, selected.student, selected.room, TOKEN));
        setOP(false);
    }
    const handlePress = (item) => {
        setSelected(item);
        setOP(true)
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
                roomSlots && roomSlots.length > 0 ? (
                    <FlatList
                        data={roomSlots}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item, index }) => (
                            <RoomSlot_Card slot={item} handlePress={handlePress} />
                        )}
                    />
                ) : !LOADER?(
                    <>
                        <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                        <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Room Slots Found</Text>
                    </>
                ):null
            }
            <CircularPLusButton handleAdd={handleAdd} />
            {
                slotForm ? (
                    <BottomSheetForm_Room_Slot label='New Slot' closeModal={() => setSlotForm(false)} room={ROOM} token={TOKEN} />
                ) : null
            }
            {
                allotForm ? (
                    <BottomSheetForm_Handle_Allotment label='Allot to Student' closeModal={() => setAllotForm(false)} allot={handleAllotment} />
                ) : null
            }
            {
                options ? (
                    <BottomSheetActions closeModal={() => setOP(false)} delete={handleDelete} allot={selected.student ? null : showAllotmentForm} retain={selected.student ? handleRetain : null} />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
})

export default ManageRoomSlots;