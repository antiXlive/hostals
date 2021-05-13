import axiosInstance from '../../helpers/axios';
import { fetchHostel, fetchRoomByHostel, fetchStudents, fetchBeds, fetchAlmirahs, fetchTables, fetchChairs, fetchRoomSlots, fetchStudentComplains, fetchStudentComplainsResolved } from '@actions/fetcherAction';
import { setNotification } from '@actions/commonAction';


export const createHostel = (name, category, token) => {
    return async (dispatch) => {
        const data = {
            name: name,
            category: category
        }
        await axiosInstance.post('/hostel/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchHostel());
                }
            })
            .catch((err) => { })
    }
}
export const createRoom = (name, hostelName, hostel, token) => {
    return async (dispatch) => {
        const data = {
            name: name,
            hostelName: hostelName,
            hostel: hostel
        }
        await axiosInstance.post('/room/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchRoomByHostel(hostel));
                }
            })
            .catch((err) => { })
    }
}
export const createStudent = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/student/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchStudents());
                }
            })
            .catch((err) => { })
    }
}
export const createBed = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/bed/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchBeds());
                }
            })
            .catch((err) => { })
    }
}
export const createAlmirah = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/almirah/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchAlmirahs());
                }
            })
            .catch((err) => { console.log(err); })
    }
}
export const createTable = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/table/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchTables());
                }
            })
            .catch((err) => { })
    }
}
export const createChair = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/chair/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchChairs());
                }
            })
            .catch((err) => { })
    }
}



export const allotRoomSlot = (id, student, room, token) => {
    return async (dispatch) => {
        let data = {
            id: id,
            sid: student,
        }
        await axiosInstance.post('/roomSlot/allot', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchRoomSlots(room));
                }
            })
            .catch((err) => { console.log(err); })
    }
}

export const createRoomSlot = (data, token) => {
    console.log(data);
    return async (dispatch) => {
        await axiosInstance.post('/roomSlot/create', data,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchRoomSlots(data.room));
                }
            })
            .catch((err) => { })
    }
}

export const lodgeComplaint = (data) => {
    return async (dispatch) => {
        await axiosInstance.post('/complaints/create', data)
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchStudentComplains(data.student));
                    dispatch(fetchStudentComplainsResolved(data.student));
                }
            })
            .catch((err) => { })
    }
}