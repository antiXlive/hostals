import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, StatusBar, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CircularPLusButton } from '@components/CustomButton.component';
import ComplaintCard from '@components/ComplaintCard';
import NotifierBar from '@components/NotifierBar.component';
import { BottomSheetForm_New_Complain } from '@components/BottomSheetForm.component';
import { fetchStudentComplains, fetchStudentComplainsResolved } from '@actions/fetcherAction';
import { setNotification } from '@actions/commonAction';
import { lodgeComplaint } from '@actions/creatorAction';
import Nodata from '@assets/no-data.png';
import Loader from '@components/Loader';



import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Complain = ({ }) => {

    const dispatch = useDispatch();

    const STUDENT = useSelector((state) => state.auth.student);

    useEffect(() => {
        dispatch(fetchStudentComplains(STUDENT._id));
        dispatch(fetchStudentComplainsResolved(STUDENT._id));
    }, [STUDENT]);

    const [form, setF] = useState(false);
    const Tab = createMaterialTopTabNavigator();

    const complains = useSelector((state) => state.fetcher.studentComplains);
    const complainsResolved = useSelector((state) => state.fetcher.studentComplainsResolved);
    const NOTIFICATION = useSelector((state) => state.common.notification);
    const LOADER = useSelector((state) => state.common.loader);

    const handleAdd = () => {
        if (STUDENT.roomSlot && STUDENT.roomSlot.length > 1) {
            setF(true);
        } else {
            dispatch(setNotification({ msg: 'You have not been alloted a room yet', type: 'error' }))
        }
    }
    const handleSubmit = (msg) => {
        const data = {
            hostel: STUDENT.userHostel,
            room: STUDENT.userRoom,
            student: STUDENT._id,
            message: msg,
        }
        dispatch(lodgeComplaint(data));
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
                                <ComplaintCard hostelName={item.hostelName} roomName={item.roomName} message={item.message} resolved={true} />
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
                                <ComplaintCard hostelName={item.hostelName} roomName={item.roomName} message={item.message} />
                            )}
                        />
                    ) : (
                        <>
                            <>
                                <Image source={Nodata} style={{ borderWidth: 1, alignSelf: 'center', opacity: 0.5, marginTop: '10%' }} />
                                <Text style={{ alignSelf: 'center', fontSize: WIDTH * 0.06, opacity: 0.5, letterSpacing: WIDTH * 0.005 }}>No Complaints Found</Text>
                            </>
                        </>
                    )
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
                {
                    NOTIFICATION
                        ? (
                            <NotifierBar msg1={NOTIFICATION.msg} type={NOTIFICATION.type} endsIn={2000} />
                        )
                        : null
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
                <CircularPLusButton handleAdd={handleAdd} />

                {
                    form ? (
                        <BottomSheetForm_New_Complain label='New Complain' closeModal={() => setF(false)} handleSubmit={handleSubmit} />
                    ) : null
                }
            </View >
        </>
    )
}
export default Complain;