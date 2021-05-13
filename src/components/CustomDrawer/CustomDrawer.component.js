import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    StyleSheet
} from 'react-native'
import { DrawerContentScrollView, } from '@react-navigation/drawer'
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SIGNOUT } from '@actions/authAction';


import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '@helpers/constants'


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const DrawerItem = (props) => {
    const { label, iconFamily, iconName, size, name, activeRoute } = props;
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FFF')}
            onPress={props.handlePress}
        >
            <View style={styles.drawerItem}>
                {name && activeRoute && name === activeRoute ? <View style={styles.active}></View> : null}
                <View style={styles.drawerItem_icon}>
                    <DrawerIcon family={iconFamily} name={iconName} size={size} />
                </View>
                <View style={styles.drawerItem_label}>
                    <Text style={styles.drawerItem_labelText}>{label}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}
const DrawerIcon = ({ family, name, size }) => {
    switch (family) {
        case "MaterialCommunityIcons":
            return (
                <MaterialCommunityIcons name={name} size={size} color="#FFF" />
            )
        case "FontAwesome5":
            return (
                <FontAwesome5 name={name} size={size} color="#FFF" />
            )
        case "Ionicons":
            return (
                <Ionicons name={name} size={size} color="#FFF" />
            )
        case "EvilIcons":
            return (
                <EvilIcons name={name} size={size} color="#FFF" />
            )
        case "AntDesign":
            return (
                <AntDesign name={name} size={size} color="#FFF" style={{ transform: [{ rotateY: '180deg' }] }} />
            )
        default:
            return;
    }
}

const CustomDrawer = (props) => {

    const route = useRoute();
    const dispatch = useDispatch();
    const USER_NAME = useSelector((state) => state.auth.userName);
    const USER_DESIGNATION = useSelector((state) => state.auth.userType);

    const routeName = getFocusedRouteNameFromRoute(route);

    const [bgColor, setBgColor] = useState('#FFFFFF');



    const handlePress = (route_name) => {
        if (route_name === 'signout') {
            props.navigation.closeDrawer();
            setTimeout(() => { dispatch(SIGNOUT()) }, 700)
        }
        else {
            props.navigation.navigate(route_name);
        }

    }

    return (
        <>
            <View style={styles.mainContainer}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.userInfo}>
                        <View style={styles.userInfo_avatarContainer}>
                            <View style={styles.userInfo_avatar}>
                                <Text style={styles.userInfo_avatarText}>{USER_NAME ? (USER_NAME.split(' ')[0]).charAt(0)=='D'?USER_NAME.split(' ')[1].charAt(0):USER_NAME.split(' ')[0].charAt(0):''}</Text>
                            </View>
                        </View>
                        <View style={styles.userInfo_nameContainer}>
                            <Text numberOfLines={1} style={styles.userInfo_name}>{USER_NAME}</Text>
                            <Text style={styles.userInfo_designation}>{USER_DESIGNATION.toUpperCase()}</Text>
                        </View>
                    </View>
                    <DrawerItem
                        label="Home"
                        iconFamily="MaterialCommunityIcons"
                        iconName="home-circle-outline" size={27}
                        name='drawer_home'
                        activeRoute={routeName}
                        handlePress={() => handlePress('HOME')}
                    />
                    <DrawerItem
                        label="Manage Data"
                        iconFamily="FontAwesome5"
                        iconName="database" size={18}
                        name='manage_data'
                        activeRoute={routeName}
                        handlePress={() => handlePress('manage_data')}
                    />
                    <DrawerItem
                        label="About"
                        iconFamily="MaterialCommunityIcons"
                        iconName="information-outline" size={24}
                        name='about'
                        activeRoute={routeName}
                        handlePress={() => handlePress('about')}
                    />
                </DrawerContentScrollView>
                <DrawerItem
                    label="Sign Out"
                    iconFamily="AntDesign"
                    iconName="logout" size={18}
                    handlePress={() => handlePress('signout')}
                />
            </View>
        </>
    )
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.M1,
    },
    userInfo: {
        flexDirection: 'row',
        height: HEIGHT * 0.18,
        borderBottomWidth: 1.5,
        borderBottomColor: '#FFFFFF60',
        marginBottom: HEIGHT * 0.03
    },
    userInfo_avatarContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfo_avatar: {
        elevation: 10, borderWidth: 2,
        borderRadius: 100,
        backgroundColor: '#F0F0F0',
        borderColor: constants.M1,
        width: HEIGHT * 0.08,
        height: HEIGHT * 0.08,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfo_avatarText: {
        fontSize: HEIGHT * 0.06,
        fontWeight: 'bold',
        color: constants.M1
    },
    userInfo_nameContainer: {
        width: '65%',
        justifyContent: 'center',
    },
    userInfo_name: {
        color: '#FFF',
        letterSpacing: 1,
        fontSize: HEIGHT * 0.035
    },
    userInfo_designation: {
        color: '#FFF',
        paddingTop: '3%',
        fontSize: HEIGHT * 0.018,
        paddingLeft: '1%',
        letterSpacing: WIDTH * 0.004
    },
    drawerItem: {
        flexDirection: 'row',
        height: HEIGHT * 0.06,
        marginBottom: HEIGHT * 0.015
    },
    drawerItem_icon: {
        width: '18%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerItem_label: {
        width: '80%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    drawerItem_labelText: {
        fontSize: HEIGHT * 0.024,
        color: '#FFF'
    },
    active: {
        position: 'absolute',
        backgroundColor: '#FFFFFF50',
        width: '100%',
        height: '100%',
        // borderTopRightRadius:WIDTH*1,
        // borderBottomRightRadius:WIDTH*1,
    },

})

export default CustomDrawer;