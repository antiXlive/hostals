import axiosInstance from '../../helpers/axios';

import { setStudent } from '@actions/authAction.js';
import { setLoader } from '@actions/commonAction.js';
import { setNotification } from '@actions/commonAction';



export const fetchHostel = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/hostel')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_HOSTEL", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
                dispatch(setLoader(false));
            })
    }
}
export const fetchRoom = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/room')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_ROOM", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchStudents = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/student')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_STUDENT", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchBeds = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/bed')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_BEDS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchAlmirahs = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/almirah')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_ALMIRAHS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchTables = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/table')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_TABLES", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchChairs = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/chair')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_CHAIRS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}

export const fetchRoomByHostel = (hostel) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: "SAVE_HOSTEL_ROOM", payload: [] });
        await axiosInstance.get('/room/hostel', {
            params: {
                hostel: hostel
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_HOSTEL_ROOM", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}



export const fetchRoomStudents = (room) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: "SAVE_ROOM_STUDENTS", payload: [] });
        const data = {
            room: room,
        }
        await axiosInstance.get('/student/room', {
            params: {
                room: room
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_ROOM_STUDENTS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}




// ----------------------------------------------------- U N A L L O T E D -----------------------------------------------------
export const fetchUnallotedBeds = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: "SAVE_UNALLOTED_BEDS", payload: [] });
        await axiosInstance.get('/bed/unalloted')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_UNALLOTED_BEDS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchUnallotedAlmirahs = () => {
    return async (dispatch) => {
        dispatch({ type: "SAVE_UNALLOTED_ALMIRAHS", payload: [] });
        await axiosInstance.get('/almirah/unalloted')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_UNALLOTED_ALMIRAHS", payload: x });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
export const fetchUnallotedTables = () => {
    return async (dispatch) => {
        dispatch({ type: "SAVE_UNALLOTED_TABLES", payload: [] });
        await axiosInstance.get('/table/unalloted')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_UNALLOTED_TABLES", payload: x });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
export const fetchUnallotedChairs = () => {
    return async (dispatch) => {
        dispatch({ type: "SAVE_UNALLOTED_CHAIRS", payload: [] });
        await axiosInstance.get('/chair/unalloted')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_UNALLOTED_CHAIRS", payload: x });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
export const fetchUnallotedStudents = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: "SAVE_UNALLOTED_STUDENTS", payload: [] });
        await axiosInstance.get('/student/unalloted')
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_UNALLOTED_STUDENTS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
// ----------------------------------------------------- U N A L L O T E D -----------------------------------------------------



export const fetchRoomSlots = (room) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/roomSlot/room', {
            params: {
                rid: room
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_ROOM_SLOTS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}


export const fetchStudentComplains = (sid) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/complaints/student', {
            params: {
                sid: sid
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_STUDENT_COMPLAINS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchStudentComplainsResolved = (sid) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/complaints/student', {
            params: {
                sid: sid,
                resolved: 1
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_STUDENT_COMPLAINS_RESOLVED", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchComplains = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/complaints', {
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_COMPLAINS", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}
export const fetchComplainsResolved = () => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/complaints', {
            params: {
                resolved: 1
            }
        })
            .then(async (res) => {
                const x = res.data;
                dispatch({ type: "SAVE_COMPLAINS_RESOLVED", payload: x });
                dispatch(setLoader(false));
            })
            .catch((err) => {
                dispatch(setLoader(false));
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}


export const fetchStudentDetails = (id1, slot) => {
    return async (dispatch) => {
        dispatch(setLoader(true));
        await axiosInstance.get('/student', {
            params: {
                id: id1
            }
        })
            .then(async (res) => {
                const student = res.data;
                console.log(slot);
                dispatch(setStudent(student));
            })
            .catch((err) => {
                dispatch(setNotification({ msg: 'No Internet!!', type: 'error' }));
            })
    }
}

