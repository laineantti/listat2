import React, {useState} from "react"
import {v4 as uuidv4} from "uuid"

function App() {
    // lista koko ja sisältö
    var arraySize = 10, random = require('random-name'), randomAge = require('random-age')
    
    // 2 listaa
    const [list1, setList1] = useState(Array(arraySize).fill(null)
    .map((i) => ({id: i, uuid: uuidv4(), firstname: random.first(), lastname: random.last(), age: randomAge()})))
    const [list2, setList2] = useState(Array(arraySize).fill(null)
    .map((i) => ({id: i, uuid: uuidv4(), firstname: random.first(), lastname: random.last(), age: randomAge()})))
    list1.forEach((person, i) => (person.id = i + 1))
    list2.forEach((person, i) => (person.id = i + 1))

    // personId, personUuid, firstname, lastname, age, listId
    const [selected, setSelected] = useState([""])

    const printList = (list, listId) => {
        return (
            <div style={{ float: "left" }}>
                <b>list{listId}</b>
                {(list.length <= 0) ? ( <p>This list has no persons</p> ) : (
                    <ul>
                        {list.map((person) => {
                            return (
                                <li key={person.uuid}>
                                    <button id={person.id} uuid={person.uuid} value={person.firstname + " " + person.lastname + " " + person.age}
                                        onClick={(event) => {
                                            setSelected([person.id, person.uuid, person.firstname, listId])
                                        }}> {person.firstname + " " + person.lastname + " " + person.age} {(selected[1] === person.uuid)?("✔️"):("")}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

    const swapPersons = (list, id1, id2) => {
        [list[id1], list[id2]] = [list[id2], list[id1]]
        return list
    }

    const editLists = (direction) => {
        // list1 -> oikealle
        if (direction === 1 && selected[3] === 1) {
            let list1_only_person = list1.filter((person) => person.uuid === selected[1])
            let list1_without_person = list1.filter((person) => person.uuid !== selected[1])
            let list2_added_person = list2.concat(list1_only_person)
            setList1(list1_without_person)
            setList2(list2_added_person)
        }
        // list1 <- vasemmalle
        if (direction === 0 && selected[3] === 1) {
            let list1_without_person = list1.filter((person) => person.uuid !== selected[1])
            setList1(list1_without_person)
        }
        // list2 -> oikealle
        if (direction === 1 && selected[3] === 2) {
            let list2_without_person = list2.filter((person) => person.uuid !== selected[1])
            setList2(list2_without_person)
        }
        // list2 <- vasemmalle
        if (direction === 0 && selected[3] === 2) {
            let list2_only_person = list2.filter((person) => person.uuid === selected[1])
            let list2_without_person = list2.filter((person) => person.uuid !== selected[1])
            let list1_added_person = list1.concat(list2_only_person)
            setList1(list1_added_person)
            setList2(list2_without_person)
        }
        // list1 ^ ylös
        if (direction === 2 && selected[3] === 1 && selected[0] > 1) {
            setList1(swapPersons(list1, selected[0] - 1, selected[0] - 2))
        }
        // list1 v alas
        if (direction === 3 && selected[3] === 1 && selected[0] < list1.length) {
            setList1(swapPersons(list1, selected[0], selected[0] - 1))
        }
        // list2 ^ ylös
        if (direction === 2 && selected[3] === 2 && selected[0] > 1) {
            setList2(swapPersons(list2, selected[0] - 1, selected[0] - 2))
        }
        // list2 v alas
        if (direction === 3 && selected[3] === 2 && selected[0] < list2.length) {
            setList2(swapPersons(list2, selected[0], selected[0] - 1))
        }
        setSelected([""])
    }

    return (
        <div style={{padding: "10px"}}>
            {printList(list1, 1)}
            <div style={{float: "left"}}><ul>
                <li><button onClick={() => {editLists(2)}}>🡩</button></li>
                <li><button onClick={() => {editLists(1)}}>🡪</button></li>
                <li><button onClick={() => {editLists(0)}}>🡨</button></li>
                <li><button onClick={() => {editLists(3)}}>🡫</button></li>
            </ul></div>
            {printList(list2, 2)}
        </div>
    )
}

export default App