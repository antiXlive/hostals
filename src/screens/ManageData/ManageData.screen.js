import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StatusBar,
    StyleSheet,
} from 'react-native';
import MCard from '@components/MCard.component';
import a1 from '@assets/a1.png';
import a3 from '@assets/a3.png';
import Bed from '@assets/Bed.png';
import ALmirah from '@assets/Almirah.png';
import Table from '@assets/Table.png';
import Chair from '@assets/Chair.png';




import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ManageData = ({navigation,route}) => {

    const data=[
        {screen:'Manage Hostel',name:'Hostel',icon:a1},
        {screen:'Manage Student',name:'Student',icon:a3},
        {screen:'Manage Almirah',name:'Almirah',icon:ALmirah},
        {screen:'Manage Bed',name:'Bed',icon:Bed},
        {screen:'Manage Chair',name:'Chair',icon:Chair},
        {screen:'Manage Table',name:'Table',icon:Table},
    ]

    const handleClick = (name) => {
        navigation.navigate(name, {headerLabel:name})
    }
    
    
    return(
        <>
        <StatusBar backgroundColor='#F2F1F7' barStyle="dark-content"/>
        <View style={{backgroundColor:'#F2F1F7',width:WIDTH,height:HEIGHT*0.99,paddingTop:HEIGHT*0.15}}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={item => item.name.toString()}
                renderItem={({ item, index }) => (
                    <View style={{height:WIDTH*0.35,width:WIDTH*0.5,alignItems:'center',marginBottom:HEIGHT*0.03,paddingTop:10}}>
                        <MCard click={handleClick} screen={item.screen} name={item.name} icon={item.icon}/>
                    </View>
                )}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default ManageData;