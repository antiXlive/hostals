import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, StatusBar, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ComplaintCard from '@components/ComplaintCard';
import { fetchComplains, fetchComplainsResolved } from '@actions/fetcherAction';
import { resolveComplain } from '@actions/deleterAction';
import Nodata from '@assets/no-data.png';
import Loader from '@components/Loader';


import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const CareTaker_Complain = ({ navigation }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchComplains());
        dispatch(fetchComplainsResolved());
    }, []);

    const Tab = createMaterialTopTabNavigator();

    const TOKEN = useSelector((state) => state.auth.token);
    const complains = useSelector((state) => state.fetcher.complains);
    const complainsResolved = useSelector((state) => state.fetcher.complainsResolved);
    const LOADER = useSelector((state) => state.common.loader);


    const handleResolveComplain = (id, room) => {
        const data = {
            id: id,
            room: room,
        }
        dispatch(resolveComplain(data, TOKEN));
    }

    const resolved = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {
                    complainsResolved && complainsResolved.length > 0 ? (
                        <FlatList
                            data={complainsResolved}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item._id.toString()}
                            renderItem={({ item, index }) => (
                                <ComplaintCard hostelName={item.hostelName} roomName={item.roomName} message={item.message} resolved={true} studentName={item.studentName} studentRoll={item.studentRoll} />
                            )}
                        />
                    ) : !LOADER ? (
                        <>
                            <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                            <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Tables Found</Text>
                        </>
                    ) : null
                }
            </View>
        )
    }
    const unresolved = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {
                    complains && complains.length > 0 ? (
                        <FlatList
                            data={complains}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item._id.toString()}
                            renderItem={({ item, index }) => (
                                <ComplaintCard hostelName={item.hostelName} roomName={item.roomName} message={item.message} resolveComplain={() => handleResolveComplain(item._id, item.room)} studentName={item.studentName} studentRoll={item.studentRoll} />
                            )}
                        />
                    ) : !LOADER ? (
                        <>
                            <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '15%' }} />
                            <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Complaints Found</Text>
                        </>
                    ) : null
                }
            </View>
        )
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
            <View style={{ flex: 1, paddingTop: HEIGHT * 0.1, backgroundColor: '#FFF' }}>
                {
                    LOADER ? (
                        <Loader />
                    ) : null
                }
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: constants.M1,
                    inactiveTintColor: '#00000080',
                    labelStyle: { fontSize: WIDTH * 0.04, textTransform: 'none', fontWeight: 'bold' },
                    style: { backgroundColor: '#FFF', marginBottom: HEIGHT * 0.05 },
                    indicatorStyle: { backgroundColor: constants.M1 }
                }}>
                    <Tab.Screen name='unresolved' options={{ tabBarLabel: 'Un Resolved' }} component={unresolved} />
                    <Tab.Screen name='resolved' options={{ tabBarLabel: 'Resolved' }} component={resolved} />
                </Tab.Navigator>
            </View >
        </>
    )
}
export default CareTaker_Complain;