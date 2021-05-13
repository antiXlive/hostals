import axiosInstance from '../../helpers/axios';
import { fetchHostel, fetchRoomByHostel, fetchStudents, fetchBeds, fetchAlmirahs, fetchTables, fetchChairs, fetchRoomSlots, fetchComplains, fetchComplainsResolved } from '@actions/fetcherAction';
import { setNotification } from '@actions/commonAction';


export const deleteHostel = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/hostel', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteRoom = (data, token) => {
    console.log(data);
    return async (dispatch) => {
        await axiosInstance.delete('/room', {
            headers: {
                "Authorization": token
            },
            data: data,
        }
        )
            .then(async (res) => {
                if (res.data.err) {
                    dispatch(setNotification({ msg: res.data.err, type: 'error' }))
                } else {
                    dispatch(setNotification({ msg: res.data.msg, type: 'success' }))
                    dispatch(fetchRoomByHostel(data.hid));
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteStudent = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/student', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteBed = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/bed', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteAlmirah = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/almirah', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteTable = (data, token) => {
    console.log('token ', token);
    return async (dispatch) => {
        await axiosInstance.delete('/table', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteChair = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/chair', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}


export const retainSlot = (id, student, room, token) => {
    return async (dispatch) => {
        let data = {
            id: id,
            sid: student,
        }
        await axiosInstance.post('/roomSlot/retain', data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}
export const resolveComplain = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.post('/complaints/resolve', data,
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
                    dispatch(fetchComplains());
                    dispatch(fetchComplainsResolved());
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
export const deleteRoomSlot = (data, token) => {
    return async (dispatch) => {
        await axiosInstance.delete('/roomSlot/delete', {
            headers: {
                "Authorization": token
            },
            data: data,
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
            .catch((err) => {
                console.log(err);
            })
    }
}