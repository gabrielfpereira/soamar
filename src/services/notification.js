import { database, app } from "./firebase";
import { getDatabase, ref, set, push, child, query, orderByChild, onValue, remove, update } from "firebase/database";
import { v4 as uuidv4} from 'uuid'


const db = getDatabase()
const now = new Date()

export const service = {
    save: (item) => {
        const uuid = uuidv4()
        set(ref(db, `notifications/${uuid}`), {
            ...item,
            id: uuid,
            createdAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`
        })
    },
    getAll: () => {
        const array = []
        onValue(ref(db, 'notifications'), (snapshot) => {
            const data = snapshot.val()

            if( data != null) {
                Object.values(data).map( (item) => {
                    array.push(item)
                })
            }
        })
        return array
    },
    delete: (uuid) => {
        remove(ref(db, `notifications/${uuid}`))
    },
    update: (uuid, data) => {
        update(ref(db, `notifications/${uuid}`),{
            data
        })
    }
}