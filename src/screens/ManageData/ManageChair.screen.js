import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NotifierBar from '@components/NotifierBar.component';
import Data_Card from '@components/Data_Card';
import Nodata from '@assets/no-data.png';
import Loader from '@components/Loader';

import { fetchChairs } from '@actions/fetcherAction';
import { deleteChair } from '@actions/deleterAction';


import { BottomSheetForm_Add_Room_Belongings } from '@components/BottomSheetForm.component';
import { CircularPLusButton } from '@components/CustomButton.component';
import BottomSheetActions from '@components/BottomSheetActions.component';


import constants from '@helpers/constants.js';
import { FlatList } from 'react-native-gesture-handler';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const ManageChair = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChairs());
    }, []);

    const TOKEN = useSelector((state) => state.auth.token);
    const chairs = useSelector((state) => state.fetcher.chairs);
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
            id: selected
        }
        dispatch(deleteChair(data, TOKEN));
        setOP(false);
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
                chairs && chairs.length > 0 ? (
                    <FlatList
                        data={chairs}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item, index }) => (
                            <Data_Card cardTouch={() => { setSelected(item._id), setOP(true) }} data={item} onPress={() => { setSelected(item._id), setOP(true) }} />
                        )}
                    />
                ) : !LOADER?(
                    <>
                        <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                        <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Chairs Found</Text>
                    </>
                ):null
            }


            <CircularPLusButton handleAdd={handleAdd} />
            {
                showForm ? (
                    <BottomSheetForm_Add_Room_Belongings label='Add Chair' closeModal={() => setSF(false)} token={TOKEN} />
                ) : null
            }
            {
                options ? (
                    <BottomSheetActions closeModal={() => setOP(false)} delete={handleDelete} />
                ) : null
            }
        </View >
    )
}

const styles = StyleSheet.create({
})

export default ManageChair;