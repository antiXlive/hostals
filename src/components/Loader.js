import React from 'react';

import {
    View,
    ActivityIndicator,
} from 'react-native'

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Loader = () => {


    return (
        <View style={{ width: WIDTH, height: HEIGHT, position: 'absolute', backgroundColor: '#00000020', zIndex: 100, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#4A4A4A' />
        </View>
    )
}
export default Loader;