import React from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import Logo from '@assets/hostals_logo.png'



import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const About = () => {

    return (
        <>
            <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
            <View style={{ height: HEIGHT * 0.1, backgroundColor: '#FFF' }}></View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FFF', width: WIDTH, paddingHorizontal: WIDTH * 0.04, paddingBottom: HEIGHT * 0.03 }}>
                <View style={{ width: WIDTH * 0.35, height: WIDTH * 0.35, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Image source={Logo} style={{ width: WIDTH * 0.3, height: WIDTH * 0.3 }} />
                </View>
                <Text style={{ fontSize: WIDTH * 0.042, textAlign: 'justify', lineHeight: HEIGHT * 0.037, letterSpacing: WIDTH * 0.003, color: '#333A36', marginBottom: 20 }}>
                    Welcome to Hostals, your number one mobile app for hostel management services. We're dedicated to giving you the very best of the hostel management services, with a focus on a easy to use mobile interface with a consistent backend services through our dedicated and robust data servers.
                </Text>
                <Text style={{ fontSize: WIDTH * 0.042, textAlign: 'justify', lineHeight: HEIGHT * 0.037, letterSpacing: WIDTH * 0.003, color: '#333A36', marginBottom: 20 }}>
                    Founded in 2021 by Mr. Piyush, Hostals has come a long way from its beginnings in IIIT Manipur HB-1 Boys Hostel. When Piyush first started out, his passion for serving the mankind through his technology drove him to do so that Hostals can offer you the only and only one most advanced hostel room management services. We now serve customers all over the world, and are thrilled that we're able to turn our passion into this mobile app.
                </Text>
                <Text style={{ fontSize: WIDTH * 0.042, textAlign: 'justify', lineHeight: HEIGHT * 0.037, letterSpacing: WIDTH * 0.003, color: '#333A36', marginBottom: 50 }}>
                    We hope you enjoy Hostals as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                </Text>
                <Text style={{ fontSize: WIDTH * 0.04, textAlign: 'center', lineHeight: HEIGHT * 0.037, letterSpacing: WIDTH * 0.003, color: '#333A36', marginBottom: 10 }}>
                    Sincerely,
                </Text>
                <Text style={{ fontSize: WIDTH * 0.045, textAlign: 'center', lineHeight: HEIGHT * 0.037, letterSpacing: WIDTH * 0.003, color: '#333A36', marginBottom: HEIGHT * 0.1 }}>
                    Piyush Kumar
                </Text>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({

})

export default About;