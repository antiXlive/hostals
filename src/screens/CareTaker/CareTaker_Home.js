import React, { useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StatusBar, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HostelCard from '@components/HostelCard.component';
import GreetCard from '@components/GreetCard.component';
import Loader from '@components/Loader';
import { fetchHostel, fetchComplains, fetchComplainsResolved } from '@actions/fetcherAction';


import Nodata from '@assets/no-data.png';

import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const CareTaker_Home = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHostel());
        dispatch(fetchComplains());
        dispatch(fetchComplainsResolved());
    }, []);

    const hostels = useSelector((state) => state.fetcher.hostels);
    const USER_NAME = useSelector((state) => state.auth.userName);
    const complains = useSelector((state) => state.fetcher.complains);
    const complainsResolved = useSelector((state) => state.fetcher.complainsResolved);
    const LOADER = useSelector((state) => state.common.loader);


    const handlePress = (name, hid) => {
        navigation.navigate('hostel', { headerLabel: name, hid: hid })
    }



    return (
        <>
            <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
            <View style={{ backgroundColor: '#FFF', width: WIDTH, height: HEIGHT }}>
                {
                    LOADER ? (
                        <Loader />
                    ) : null
                }
                <GreetCard userName={USER_NAME ? USER_NAME.split(' ')[0] : ''} />
                <View style={{ width: WIDTH, height: HEIGHT * 0.15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05, marginBottom: HEIGHT * 0.05 }}>
                    <TouchableOpacity style={{ width: WIDTH * 0.4, height: WIDTH * 0.22, backgroundColor: '#FF6565', borderRadius: WIDTH * 0.016, paddingTop: '4%', paddingLeft: '4%' }}>
                        <Text style={{ color: '#FFF', fontSize: WIDTH * 0.04 }}>Un Resolved</Text>
                        <Text style={{ color: '#FFF', fontSize: WIDTH * 0.08, fontWeight: 'bold', letterSpacing: WIDTH * 0.005 }}>{complains.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: WIDTH * 0.4, height: WIDTH * 0.22, backgroundColor: '#65FF87', borderRadius: WIDTH * 0.016, paddingTop: '4%', paddingLeft: '4%' }}>
                        <Text style={{ color: '#FFF', fontSize: WIDTH * 0.04 }}>Resolved</Text>
                        <Text style={{ color: '#FFF', fontSize: WIDTH * 0.08, fontWeight: 'bold', letterSpacing: WIDTH * 0.005 }}>{complainsResolved.length}</Text>
                    </TouchableOpacity>
                </View>
                {
                    hostels.length > 0 ? (
                        <FlatList
                            data={hostels}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item._id.toString()}
                            style={{ marginBottom: HEIGHT * 0.01 }}
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
export default CareTaker_Home;