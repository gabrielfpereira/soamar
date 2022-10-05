import { database, app } from "./firebase";
import { getDatabase, ref, set, push, child, query, orderByChild, onValue, remove, update } from "firebase/database";
import { v4 as uuidv4} from 'uuid'


const db = getDatabase()
const now = new Date()


export const service = {
    getAll: () => {
        const array = []
        onValue(ref(db, 'contagem'), (snapshot) => {
            const data = snapshot.val()

            if( data != null) {
                Object.values(data).map( (item) => {
                    array.push(item)
                })
            }
        })
        return array
    },
}