import React, { useEffect } from 'react';
import {
    View, Text, FlatList, StatusBar, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HostelCard from '@components/HostelCard.component';
import Student_ID_Card from '@components/Student_ID_Card.component'
import Loader from '@components/Loader';
import { fetchHostel, fetchStudentDetails } from '@actions/fetcherAction';

import Nodata from '@assets/no-data.png';

import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Student_Home = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHostel());
        let slot = STUDENT.roomSlot && STUDENT.roomSlot.length > 1 ? true : false;
        dispatch(fetchStudentDetails(STUDENT._id, slot))
    }, []);

    const hostels = useSelector((state) => state.fetcher.hostels);
    const STUDENT = useSelector((state) => state.auth.student);
    const LOADER = useSelector((state) => state.common.loader);


    const handlePress = (name, hid) => {
        navigation.navigate('hostel', { headerLabel: name, hid: hid })
    }

    return (
        <>
            <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
            {
                LOADER ? (
                    <Loader />
                ) : null
            }
            <View style={{ backgroundColor: '#FFF', width: WIDTH, paddingTop: HEIGHT * 0.1, marginBottom: 50, height: HEIGHT }}>
                {
                    STUDENT?(
                        <Student_ID_Card student={STUDENT} />
                    ):null
                }
                <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: WIDTH * 0.06, marginBottom: 10 }}>Hostels</Text>
                {
                    hostels.length > 0 ? (
                        <FlatList
                            data={hostels}
                            showsVerticalScrollIndicator={false}
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
export default Student_Home;