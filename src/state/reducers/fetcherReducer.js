const initialState = {
    hostels: [],
    rooms: [],
    students: [],
    beds: [],
    almirahs: [],
    tables: [],
    chairs: [],
    unAllotedBeds: [],
    unAllotedAlmirahs: [],
    unAllotedTables: [],
    unAllotedChairs: [],
    unAllotedStudents: [],
    hostelRooms: [],
    roomStudents: [],
    roomSlots: [],
    studentComplains: [],
    studentComplainsResolved: [],
    complains: [],
    complainsResolved: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "SAVE_HOSTEL":
            return {
                ...state,
                hostels: action.payload
            }
        case "SAVE_ROOM":
            return {
                ...state,
                rooms: action.payload
            }
        case "SAVE_STUDENT":
            return {
                ...state,
                students: action.payload
            }
        case "SAVE_BEDS":
            return {
                ...state,
                beds: action.payload
            }
        case "SAVE_ALMIRAHS":
            return {
                ...state,
                almirahs: action.payload
            }
        case "SAVE_TABLES":
            return {
                ...state,
                tables: action.payload
            }
        case "SAVE_CHAIRS":
            return {
                ...state,
                chairs: action.payload
            }
        case "SAVE_UNALLOTED_BEDS":
            return {
                ...state,
                unAllotedBeds: action.payload
            }
        case "SAVE_UNALLOTED_ALMIRAHS":
            return {
                ...state,
                unAllotedAlmirahs: action.payload
            }
        case "SAVE_UNALLOTED_TABLES":
            return {
                ...state,
                unAllotedTables: action.payload
            }
        case "SAVE_UNALLOTED_CHAIRS":
            return {
                ...state,
                unAllotedChairs: action.payload
            }
        case "SAVE_UNALLOTED_STUDENTS":
            return {
                ...state,
                unAllotedStudents: action.payload
            }
        case "SAVE_HOSTEL_ROOM":
            return {
                ...state,
                hostelRooms: action.payload
            }
        case "SAVE_ROOM_STUDENTS":
            return {
                ...state,
                roomStudents: action.payload
            }
        case "SAVE_ROOM_SLOTS":
            return {
                ...state,
                roomSlots: action.payload
            }
        case "SAVE_STUDENT_COMPLAINS":
            return {
                ...state,
                studentComplains: action.payload
            }
        case "SAVE_STUDENT_COMPLAINS_RESOLVED":
            return {
                ...state,
                studentComplainsResolved: action.payload
            }
        case "SAVE_COMPLAINS":
            return {
                ...state,
                complains: action.payload
            }
        case "SAVE_COMPLAINS_RESOLVED":
            return {
                ...state,
                complainsResolved: action.payload
            }

        default:
            return state
    }
}