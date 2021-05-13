import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    Image,
    Text,
    FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostel } from '@actions/fetcherAction';
import NotifierBar from '@components/NotifierBar.component';
import GreetCard from '@components/GreetCard.component';
import Loader from '@components/Loader';
import HostelCard from '@components/HostelCard.component';
import Nodata from '@assets/no-data.png';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Home = ({ navigation }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchHostel());
    }, []);


    const hostels = useSelector((state) => state.fetcher.hostels);
    const USER_NAME = useSelector((state) => state.auth.userName);
    const LOADER = useSelector((state) => state.common.loader);
    const NOTIFICATION = useSelector((state) => state.common.notification);


    const handlePress = (name, hid) => {
        navigation.navigate('hostel', { headerLabel: name, hid: hid })
    }
    let userFname = USER_NAME ? USER_NAME.split(' ')[0] == 'Dr.' ? USER_NAME.split(' ')[1] : USER_NAME.split(' ')[0] : null



    return (
        <>
            <StatusBar backgroundColor='#F2F1F7' barStyle="dark-content" />
            <View style={{ backgroundColor: '#F2F1F7', width: WIDTH, height: HEIGHT }}>
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
                <GreetCard userName={userFname} />
                {
                    hostels.length > 0 ? (
                        <FlatList
                            data={hostels}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: HEIGHT * 0.05 }}
                            keyExtractor={item => item._id.toString()}
                            renderItem={({ item, index }) => (
                                <HostelCard key={item._id} ID={item._id} click={() => handlePress(item.name, item._id)} name={item.name} rooms={item.rooms} students={item.students} category={item.category} />
                            )}
                        />
                    ) : !LOADER ? (
                        <>
                            <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                            <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Hostels Found</Text>
                        </>
                    ) : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Home;