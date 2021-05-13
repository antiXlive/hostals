import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Keyboard,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButtonFilled } from '@components/CustomButton.component';
import CustomTextInput from '@components/CustomTextInput.component';
import DropDown from '@components/DropDown.component';
import Loader from '@components/Loader';

import { fetchUnallotedBeds, fetchUnallotedAlmirahs, fetchUnallotedTables, fetchUnallotedChairs, fetchUnallotedStudents } from '@actions/fetcherAction';
import { createHostel, createRoom, createStudent, createBed, createAlmirah, createTable, createChair, createRoomSlot } from '@actions/creatorAction';

import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const BottomSheetForm = (props) => {

    const [bottom, setBottom] = useState(0);
    const [step, setS] = useState(1);

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;


    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.24);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: step == 1 ? '85%' : '60%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: HEIGHT * 0.06, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: HEIGHT * 0.02 }}>
                            <View style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, backgroundColor: constants.M1, borderRadius: WIDTH }}></View>
                            <View style={{ width: '60%', backgroundColor: step == 1 ? '#00000030' : constants.M1, height: '10%' }}></View>
                            <View style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, backgroundColor: step == 1 ? '#00000030' : constants.M1, borderRadius: WIDTH }}></View>
                            <View style={{ width: '80%', position: 'absolute', height: 20, top: '68%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '3%' }}>
                                <Text style={{ fontSize: WIDTH * 0.035, color: '#00000099' }}>New Slot</Text>
                                <Text style={{ fontSize: WIDTH * 0.035, color: '#00000099' }}>Assign Allottee</Text>
                            </View>
                        </View>
                        <View style={{ height: step == 1 ? '70%' : '57%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {
                                step == 1 ? props.children : (
                                    <>
                                        <CustomTextInput name="studentroll" placeholder="Student Roll No." handleChange={() => { }} empty={() => { }} />
                                        <CustomButtonFilled label="SEARCH" click={() => setS(2)} style={{ marginTop: '-15%', width: WIDTH * 0.45, height: HEIGHT * 0.05 }} />
                                    </>
                                )
                            }
                        </View>
                        <CustomButtonFilled label={step == 1 ? "CREATE" : "ALLOT"} click={() => setS(2)} />
                    </View>
                </View>
            </Modal>
        </>
    )
}



const BottomSheetForm_Add_Hostel = (props) => {

    const dispatch = useDispatch();


    const [name, setN] = useState('');
    const [category, setC] = useState(1);
    const [bottom, setBottom] = useState(0);
    const [error, setError] = useState([{ status: 0, msg: '' }]);

    useEffect(() => {
        let error1 = [...error];
        if (name) {
            if (name.length > 0) {
                error1[0] = { status: 0, msg: '' }
            }
        }
        setError(error1);
    }, [name])

    let keyboardDidShowListener = null; let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        return () => {
            keyboardDidShowListener.remove(); keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.24);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch (name) {
            case "hostelname":
                setN(input);
                if (input.length < 1) {
                    error1[0] = { status: 1, msg: 'Hostel Name is required' }
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleSubmit = () => {
        if (name.length > 1) {
            dispatch(createHostel(name, category, props.token));
        }
        props.closeModal();
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: '55%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: '68%', alignItems: 'center', paddingTop: '15%' }}>
                            <CustomTextInput name="hostelname" placeholder="Hostel Name" handleChange={handleChange} empty={error[0]} />
                            <View style={{ width: '80%', marginTop: '12%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { Keyboard.dismiss(), setC(1) }} style={[category == 1 ? styles.activeHostelButton : null, styles.hostelButton]}>
                                    <Text style={[category == 1 ? { color: '#FFF', fontWeight: 'bold' } : { color: '#000' }, { fontSize: WIDTH * 0.04, letterSpacing: WIDTH * 0.002, opacity: 0.8 }]}>Boys Hostel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { Keyboard.dismiss(), setC(2) }} style={[category == 2 ? styles.activeHostelButton : null, styles.hostelButton]}>
                                    <Text style={[category == 2 ? { color: '#FFF', fontWeight: 'bold' } : { color: '#000' }, { fontSize: WIDTH * 0.04, letterSpacing: WIDTH * 0.002, opacity: 0.8 }]}>Girls Hostel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomButtonFilled label="CREATE" click={handleSubmit} />
                    </View>
                </View>
            </Modal>
        </>
    )
}



const BottomSheetForm_Add_Student = (props) => {

    const dispatch = useDispatch();

    const [name, setN] = useState('');
    const [email, setE] = useState('');
    const [roll, setR] = useState('');
    const [batch, setB] = useState('');
    const [department, setDp] = useState('');
    const [degree, setDg] = useState('');
    const [contact, setC] = useState('');
    const [gender, setG] = useState(1);
    const [bottom, setBottom] = useState(0);
    const [error, setError] = useState([{ status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }]);

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.14);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    useEffect(() => {
        let error1 = [...error];
        if (name) {
            if (name.length > 0) {
                error1[0] = { status: 0, msg: '' }
            }
        }
        if (email) {
            if (email.length > 0) {
                error1[1] = { status: 0, msg: '' }
            }
        }
        if (roll) {
            if (roll.length > 0) {
                error1[2] = { status: 0, msg: '' }
            }
        }
        if (batch) {
            if (batch.length > 0) {
                error1[3] = { status: 0, msg: '' }
            }
        }
        if (department) {
            if (department.length > 0) {
                error1[4] = { status: 0, msg: '' }
            }
        }
        if (degree) {
            if (degree.length > 0) {
                error1[5] = { status: 0, msg: '' }
            }
        }
        if (contact) {
            if (contact.length > 0) {
                error1[6] = { status: 0, msg: '' }
            }
        }
        setError(error1);
    }, [name,email,roll,batch,department,degree,contact])
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch (name) {
            case "name":
                setN(input);
                if (input.length < 1) {
                    error1[0] = { status: 1, msg: 'Name is required' }
                }
                break;
            case "email":
                setE(input);
                if (input.length < 1) {
                    error1[1] = { status: 1, msg: 'Email is required' }
                }
                break;
            case "roll":
                setR(input);
                if (input.length < 1) {
                    error1[2] = { status: 1, msg: 'Roll No. is required' }
                }
                break;
            case "batch":
                setB(input);
                if (input.length < 1) {
                    error1[3] = { status: 1, msg: 'Batch is required' }
                }
                break;
            case "department":
                setDp(input);
                if (input.length < 1) {
                    error1[4] = { status: 1, msg: 'Department is required' }
                }
                break;
            case "degree":
                setDg(input);
                if (input.length < 1) {
                    error1[5] = { status: 1, msg: 'Degree is required' }
                }
                break;
            case "contact":
                setC(input);
                if (input.length < 1) {
                    error1[6] = { status: 1, msg: 'Contact Number is required' }
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleSubmit = () => {
        Keyboard.dismiss();
        if (name.length > 0 && email.length > 0 && roll.length > 0 && batch.length > 0 && department.length > 0 && degree.length > 0 && contact.length > 0) {
            const data = {
                name: name,
                email: email,
                roll: roll,
                department: department,
                batch: batch,
                degree: degree,
                gender: gender,
                contact: contact,
            }
            if (name.length > 1 && email.length > 1 && roll.length > 1 && department.length > 1 && batch.length > 1 && degree.length > 1 && contact.length > 1) {
                dispatch(createStudent(data, props.token));
            }
            props.closeModal();
        }
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: '95%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ minHeight: '65%', alignItems: 'center', paddingTop: '8%'}}>
                            <CustomTextInput name="name" placeholder="Student Name" handleChange={handleChange} empty={error[0]} style={{maxHeight:45}} />
                            <CustomTextInput name="email" placeholder="Student Email" handleChange={handleChange} empty={error[1]} style={{maxHeight:45}} />
                            <CustomTextInput name="roll" placeholder="Roll No." handleChange={handleChange} empty={error[2]} style={{maxHeight:45}} />
                            <CustomTextInput name="batch" placeholder="Batch Year" handleChange={handleChange} empty={error[3]} style={{maxHeight:45}} />
                            <CustomTextInput name="department" placeholder="Department" handleChange={handleChange} empty={error[4]} style={{maxHeight:45}} />
                            <CustomTextInput name="degree" placeholder="Degree" handleChange={handleChange} empty={error[5]} style={{maxHeight:45}} />
                            <CustomTextInput name="contact" placeholder="Contact No." handleChange={handleChange} empty={error[6]} style={{maxHeight:45}} />
                            <View style={{ width: '80%', marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {Keyboard.dismiss(),setG(1)}} style={[gender == 1 ? styles.activeHostelButton : null, styles.hostelButton]}>
                                    <Text style={[gender == 1 ? { color: '#FFF', fontWeight: 'bold' } : { color: '#000' }, { fontSize: WIDTH * 0.04, letterSpacing: WIDTH * 0.002, opacity: 0.8 }]}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Keyboard.dismiss(),setG(2)}} style={[gender == 2 ? styles.activeHostelButton : null, styles.hostelButton]}>
                                    <Text style={[gender == 2 ? { color: '#FFF', fontWeight: 'bold' } : { color: '#000' }, { fontSize: WIDTH * 0.04, letterSpacing: WIDTH * 0.002, opacity: 0.8 }]}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomButtonFilled label="CREATE" click={handleSubmit} style={{ position: 'absolute', bottom: HEIGHT * 0.05 }} />
                    </View>
                </View>
            </Modal>
        </>
    )
}



const BottomSheetForm_Add_Room = (props) => {

    const dispatch = useDispatch();

    const [room, setR] = useState('');
    const [bottom, setBottom] = useState(0);
    const [error, setError] = useState([{ status: 0, msg: '' }]);



    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.24);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    useEffect(() => {
        let error1 = [...error];
        if (room) {
            if (room.length > 0) {
                error1[0] = { status: 0, msg: '' }
            }
        }
        setError(error1);
    }, [room])
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch (name) {
            case "room":
                setR(input);
                if (input.length < 1) {
                    error1[0] = { status: 1, msg: 'Room Number is required' }
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleSubmit = () => {
        if (room.length > 1) {
            dispatch(createRoom(room, props.name, props.id, props.token));
        }
        props.closeModal();
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: '45%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: '62%', alignItems: 'center', paddingTop: '15%' }}>
                            <CustomTextInput name="room" placeholder="Room No." handleChange={handleChange} empty={error[0]} />
                        </View>
                        <CustomButtonFilled label="CREATE" click={handleSubmit} />
                    </View>
                </View>
            </Modal>
        </>
    )
}


const BottomSheetForm_Add_Room_Belongings = (props) => {

    const dispatch = useDispatch();

    const [bed, setBed] = useState(null);
    const [almirah, setAlmirah] = useState(null);
    const [almirah_key, setAlmirahKey] = useState(null);
    const [table, setTable] = useState(null);
    const [table_key, setTableKey] = useState(null);
    const [chair, setChair] = useState(null);
    const [error, setError] = useState([{ status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }, { status: 0, msg: '' }]);
    const [bottom, setBottom] = useState(0);





    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.15);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    useEffect(() => {
        let error1 = [...error];
        if (bed) {
            if (bed.length > 0) {
                error1[0] = { status: 0, msg: '' }
            }
        }
        if (almirah) {
            if (almirah.length > 0) {
                error1[1] = { status: 0, msg: '' }
            }
        }
        if (almirah_key) {
            if (almirah_key.length > 0) {
                error1[2] = { status: 0, msg: '' }
            }
        }
        if (table) {
            if (table.length > 0) {
                error1[3] = { status: 0, msg: '' }
            }
        }
        if (table_key) {
            if (table_key.length > 0) {
                error1[4] = { status: 0, msg: '' }
            }
        }
        if (chair) {
            if (chair.length > 0) {
                error1[5] = { status: 0, msg: '' }
            }
        }
        setError(error1);
    }, [bed,almirah,almirah_key,table,table_key,chair])
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch (name) {
            case "bed":
                setBed(input);
                if (input.length < 1) {
                    error1[0] = { status: 1, msg: 'Bed Number is required' }
                }
                break;
            case "almirah":
                setAlmirah(input);
                if (input.length < 1) {
                    error1[1] = { status: 1, msg: 'Almirah Number is required' }
                }
                break;
            case "almirah_key":
                console.log(input.length);
                setAlmirahKey(input);
                if (input.length < 1) {
                    error1[2] = { status: 1, msg: 'Almirah Key Number is required' }
                }
                break;
            case "table":
                setTable(input);
                if (input.length < 1) {
                    error1[3] = { status: 1, msg: 'Table Number is required' }
                }
                break;
            case "table_key":
                setTableKey(input);
                if (input.length < 1) {
                    error1[4] = { status: 1, msg: 'Table Key Number is required' }
                }
                break;
            case "chair":
                setChair(input);
                if (input.length < 1) {
                    error1[5] = { status: 1, msg: 'Chair Number is required' }
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleSubmit = () => {
        let data;
        switch (props.label) {
            case "Add Bed":
                data = {
                    number: bed,
                };
                if (bed.length > 1) {
                    dispatch(createBed(data, props.token));

                }
                break;
            case "Add Almirah":
                data = {
                    number: almirah,
                    key: almirah_key,
                };
                if (almirah.length > 1 && almirah_key.length > 1) {
                    dispatch(createAlmirah(data, props.token));

                }
                break;
            case "Add Table":
                data = {
                    number: table,
                    key: table_key,
                };
                if (table.length > 1 && table_key.length > 1) {
                    dispatch(createTable(data, props.token));

                }
                break;
            case "Add Chair":
                data = {
                    number: chair,
                };
                if (chair.length > 1) {
                    dispatch(createChair(data, props.token));

                }
                break;
            default:
                return;
        }
        props.closeModal();
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: props.label == 'Add Almirah' || props.label == 'Add Table' ? '55%' : '45%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: '68%', alignItems: 'center', paddingTop: '15%' }}>
                            {
                                props.label == 'Add Bed' ? (
                                    <CustomTextInput name="bed" placeholder="Bed No." handleChange={handleChange} empty={error[0]} />
                                ) : props.label == 'Add Almirah' ? (
                                    <>
                                        <CustomTextInput name="almirah" placeholder="Almirah No." handleChange={handleChange} empty={error[1]} />
                                        <CustomTextInput name="almirah_key" placeholder="Almirah Key No." handleChange={handleChange} empty={error[2]} />
                                    </>
                                ) : props.label == 'Add Table' ? (
                                    <>
                                        <CustomTextInput name="table" placeholder="Table No." handleChange={handleChange} empty={error[3]} />
                                        <CustomTextInput name="table_key" placeholder="Table Key No." handleChange={handleChange} empty={error[4]} />
                                    </>
                                ) : props.label == 'Add Chair' ? (
                                    <>
                                        <CustomTextInput name="chair" placeholder="Chair No." handleChange={handleChange} empty={error[5]} />
                                    </>
                                ) : null
                            }
                        </View>
                        <CustomButtonFilled label="CREATE" click={handleSubmit} style={{ position: 'absolute', bottom: HEIGHT * 0.06 }} />
                    </View>
                </View>
            </Modal>
        </>
    )
}
const BottomSheetForm_Handle_Allotment = (props) => {

    const dispatch = useDispatch();

    const [data, setD] = useState(null);
    const [student, setStudent] = useState(null);
    const [open, setOpen] = useState(false);
    const [bottom, setBottom] = useState(0);
    const LOADER = useSelector((state) => state.common.loader);

    useEffect(() => {
        dispatch(fetchUnallotedStudents());
    }, []);

    const unAllotedStudents = useSelector((state) => state.fetcher.unAllotedStudents);

    if (unAllotedStudents && unAllotedStudents.length > 0 && !data) {
        let data = [];
        unAllotedStudents.map((item) => {
            data.push({ label: item.name + '  |  ' + item.roll, value: item._id });
        })
        setD(data);
    }

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.22);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    const handleSubmit = () => {
        if (student) {
            props.allot(student, props.token);
        }
    }
    const handleOpen = (status) => {
        setOpen(status);
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                {
                    LOADER ? (
                        <Loader />
                    ) : null
                }
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: open ? '80%' : '50%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: open ? '78%' : '65%', alignItems: 'center', paddingTop: open ? '12%' : '20%' }}>
                            {
                                data && data.length > 0 ? (
                                    <DropDown
                                        data={data}
                                        handleOpen={handleOpen}
                                        placeholder='Select Student' searchable={true} searchablePlaceholder='Search a Student by Roll or Name'
                                        onChangeItem={item => setStudent(item.value)}
                                    />
                                ) : (
                                    <View style={{ width: '90%', height: '80%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: WIDTH * 0.1, opacity: 0.6, marginBottom: 20 }}>Sorry!</Text>
                                        <Text style={{ fontSize: WIDTH * 0.044, opacity: 0.6, textAlign: 'center' }}>All students have been alloted their room slot.</Text>
                                    </View>
                                )
                            }
                        </View>
                        <View style={{ width: WIDTH, height: HEIGHT * 0.07 }}>
                            <CustomButtonFilled label="ALLOT" click={handleSubmit} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}



const BottomSheetForm_Room_Slot = (props) => {

    const dispatch = useDispatch();

    const [dropdown1, setDP1] = useState(false);
    const [dropdown2, setDP2] = useState(false);
    const [dropdown3, setDP3] = useState(false);
    const [dropdown4, setDP4] = useState(false);
    const [bedsData, setBedsData] = useState(null);
    const [tablesData, setTablesData] = useState(null);
    const [chairsData, setChairsData] = useState(null);
    const [almirahsData, setAlmirahsData] = useState(null);
    const [bed, setBed] = useState(null);
    const [table, setTable] = useState(null);
    const [chair, setChair] = useState(null);
    const [almirah, setAlmirah] = useState(null);
    const [bottom, setBottom] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUnallotedBeds());
        dispatch(fetchUnallotedAlmirahs());
        dispatch(fetchUnallotedTables());
        dispatch(fetchUnallotedChairs());
    }, []);

    const unAllotedBeds = useSelector((state) => state.fetcher.unAllotedBeds);
    const unAllotedAlmirahs = useSelector((state) => state.fetcher.unAllotedAlmirahs);
    const unAllotedTables = useSelector((state) => state.fetcher.unAllotedTables);
    const unAllotedChairs = useSelector((state) => state.fetcher.unAllotedChairs);
    const LOADER = useSelector((state) => state.common.loader);

    if (unAllotedBeds && unAllotedBeds.length > 0 && !bedsData) {
        let data = [];
        unAllotedBeds.map((item) => {
            data.push({ label: item.number, value: item._id });
        })
        setBedsData(data);
    }
    if (unAllotedAlmirahs && unAllotedAlmirahs.length > 0 && !almirahsData) {
        let data = [];
        unAllotedAlmirahs.map((item) => {
            data.push({ label: item.number + ' | ' + item.key, value: item._id });
        })
        setAlmirahsData(data);
    }
    if (unAllotedTables && unAllotedTables.length > 0 && !tablesData) {
        let data = [];
        unAllotedTables.map((item) => {
            data.push({ label: item.number + ' | ' + item.key, value: item._id });
        })
        setTablesData(data);
    }
    if (unAllotedChairs && unAllotedChairs.length > 0 && !chairsData) {
        let data = [];
        unAllotedChairs.map((item) => {
            data.push({ label: item.number, value: item._id });
        })
        setChairsData(data);
    }

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.22);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    const handleOpen = (status) => {
        setOpen(status);
    }
    const handleSubmit = () => {
        let data = {
            number: props.room.slots + 1,
            hostelName: props.room.hostelName,
            roomName: props.room.name,
            hostel: props.room.hostel,
            room: props.room._id,
            almirah: almirah,
            bed: bed,
            chair: chair,
            table: table,
        }
        if (almirah && bed && chair && table && props.room) {
            dispatch(createRoomSlot(data, props.token));
        }
        props.closeModal();
    }
    const handleToggle = (dropdown) => {
        switch (dropdown) {
            case '1':
                setDP1(true);
                setDP2(false);
                setDP3(false);
                setDP4(false);
                break;
            case '2':
                setDP1(false);
                setDP2(true);
                setDP3(false);
                setDP4(false);
                break;
            case '3':
                setDP1(false);
                setDP2(false);
                setDP3(true);
                setDP4(false);
                break;
            case '4':
                setDP1(false);
                setDP2(false);
                setDP3(false);
                setDP4(true);
                break;
            default:
                return;
        }
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    {
                        LOADER ? (
                            <Loader />
                        ) : null
                    }
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: open ? '90%' : '70%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: open ? '80%' : '72%', alignItems: 'center', paddingTop: '15%', zIndex: 100, marginBottom: 15 }}>
                            {
                                unAllotedBeds && unAllotedBeds.length > 0 && unAllotedTables && unAllotedTables.length > 0 && unAllotedChairs && unAllotedChairs.length > 0 && unAllotedAlmirahs && unAllotedAlmirahs.length > 0 ? (
                                    <>
                                        <DropDown
                                            data={bedsData} isVisible={dropdown1}
                                            handleOpen={handleOpen}
                                            onOpen={() => handleToggle('1')}
                                            placeholder='Select Bed' searchable={true} searchablePlaceholder='Search a Bed by Number'
                                            onChangeItem={item => { setDP1(false), setBed(item.value) }}
                                        />
                                        <DropDown
                                            data={tablesData} isVisible={dropdown2}
                                            onOpen={() => handleToggle('2')}
                                            handleOpen={handleOpen}
                                            placeholder='Select Table' searchable={true} searchablePlaceholder='Search a Table by Number'
                                            onChangeItem={item => { setDP2(false), setTable(item.value) }}
                                        />
                                        <DropDown
                                            data={chairsData} isVisible={dropdown3}
                                            onOpen={() => handleToggle('3')}
                                            handleOpen={handleOpen}
                                            placeholder='Select Chair' searchable={true} searchablePlaceholder='Search a Chair by Number'
                                            onChangeItem={item => { setDP3(false), setChair(item.value) }}
                                        />
                                        <DropDown
                                            data={almirahsData} isVisible={dropdown4}
                                            onOpen={() => handleToggle('4')}
                                            handleOpen={handleOpen}
                                            placeholder='Select Almirah' searchable={true} searchablePlaceholder='Search a Almirah by Number'
                                            onChangeItem={item => { setDP4(false), setAlmirah(item.value) }}
                                        />
                                    </>
                                ) : (
                                    <View style={{ width: '90%', height: '80%', alignItems: 'center', paddingTop: '10%' }}>
                                        <Text style={{ fontSize: WIDTH * 0.1, opacity: 0.6, marginBottom: 20 }}>Sorry!</Text>
                                        <Text style={{ fontSize: WIDTH * 0.044, opacity: 0.6, textAlign: 'center' }}>Not enough room belongings to create a new slot</Text>
                                    </View>
                                )
                            }
                        </View>
                        <View style={{ width: WIDTH, height: '11%' }}>
                            <CustomButtonFilled label="CREATE" click={handleSubmit} style={{}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}




const BottomSheetForm_New_Complain = (props) => {


    const [complain, setC] = useState('');
    const [bottom, setBottom] = useState(0);
    const [error, setError] = useState([{ status: 0, msg: '' }]);




    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow() {
        setBottom(HEIGHT * 0.24);
    }
    function _keyboardDidHide() {
        setBottom(0);
    }
    useEffect(() => {
        let error1 = [...error];
        if (complain) {
            if (complain.length > 0) {
                error1[0] = { status: 0, msg: '' }
            }
        }
        setError(error1);
    }, [complain])
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch (name) {
            case "complain":
                setC(input);
                if (input.length < 1) {
                    error1[0] = { status: 1, msg: "Complain can't be less than 1 characters" }
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleSubmit = () => {
        if (complain.length > 10) {
            props.handleSubmit(complain);
        }
        props.closeModal();
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ height: HEIGHT, backgroundColor: '#00000055' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ height: '60%' }} onPress={props.closeModal}></TouchableOpacity>
                    <View style={{ height: '55%', position: 'absolute', bottom: bottom, width: WIDTH, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: '4%' }}>
                        <View style={{ height: HEIGHT * 0.05, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ width: '90%', fontSize: WIDTH * 0.055, opacity: 0.7 }}>{props.label}</Text>
                            <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal} />
                        </View>
                        <View style={{ height: '68%', alignItems: 'center', paddingTop: '15%' }}>
                            <CustomTextInput name="complain" placeholder="Write your complain here" handleChange={handleChange} empty={() => { }} length={500} multiline={true} style={{ minHeight: HEIGHT * 0.2, textAlignVertical: 'top' }} />
                        </View>
                        <CustomButtonFilled label="LODGE" click={handleSubmit} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = new StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: '#00000050',
        zIndex: 100
    },
    hostelButton: {
        alignItems: 'center', justifyContent: 'center', width: WIDTH * 0.32, height: WIDTH * 0.1, borderWidth: 1, borderRadius: WIDTH * 0.012, borderColor: constants.M1
    },
    activeHostelButton: {
        backgroundColor: constants.M1,
        color: '#FFF',
    }
})

export {
    BottomSheetForm,
    BottomSheetForm_Add_Hostel,
    BottomSheetForm_Add_Student,
    BottomSheetForm_Add_Room,
    BottomSheetForm_Add_Room_Belongings,
    BottomSheetForm_Handle_Allotment,
    BottomSheetForm_Room_Slot,
    BottomSheetForm_New_Complain
}