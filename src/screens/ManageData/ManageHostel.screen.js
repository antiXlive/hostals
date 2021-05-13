import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Nodata from '@assets/no-data.png';
import NotifierBar from '@components/NotifierBar.component';
import Data_Card from '@components/Data_Card';
import Loader from '@components/Loader';


import { fetchHostel } from '@actions/fetcherAction';
import { deleteHostel } from '@actions/deleterAction';


import { CircularPLusButton } from '@components/CustomButton.component';
import { BottomSheetForm_Add_Hostel } from '@components/BottomSheetForm.component';
import BottomSheetActions from '@components/BottomSheetActions.component';


import constants from '@helpers/constants.js';
import { FlatList } from 'react-native-gesture-handler';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const ManageHostel = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHostel());
    }, []);

    const TOKEN = useSelector((state) => state.auth.token);
    const hostels = useSelector((state) => state.fetcher.hostels);
    const NOTIFICATION = useSelector((state) => state.common.notification);
    const LOADER = useSelector((state) => state.common.loader);


    const [showForm, setSF] = useState(false);
    const [options, setOP] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleAdd = () => {
        setSF(true);
    }
    const handleEdit = () => {
        setOP(false);
    }
    const handleDelete = () => {
        let data = {
            id: selected
        }
        dispatch(deleteHostel(data, TOKEN));
        setOP(false);
    }
    const handleNavigation = (item) => {
        navigation.navigate('Manage Room', { hostel: item._id, name: item.name })
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
                hostels && hostels.length > 0 ? (
                    <FlatList
                        data={hostels}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item, index }) => (
                            <Data_Card cardTouch={() => handleNavigation(item)} data={item} onPress={() => { setSelected(item._id), setOP(true) }} />
                        )}
                    />

                ) : !LOADER?(
                    <>
                        <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                        <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Hostels Found</Text>
                    </>
                ):null
            }

            <CircularPLusButton handleAdd={handleAdd} />
            {
                showForm ? (
                    <BottomSheetForm_Add_Hostel label='Add Hostel' closeModal={() => setSF(false)} token={TOKEN} />
                ) : null
            }
            {
                options ? (
                    <BottomSheetActions closeModal={() => setOP(false)} edit={handleEdit} delete={handleDelete} />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
})

export default ManageHostel;