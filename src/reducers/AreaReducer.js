

const reducer = (state, action) => {
    const editAreaName = (array, id, value) => {
        return array[id].name = value
    }
    const editAreaCapacity = (array, id, value) => {
        return array[id].capacity = value
    }
    const toggleBox = (array, id, value) => {
        return array[id].active = !value
    }
    switch(action.type) {
        case 'DATA_LOAD':
            return action.value
        case 'VENUE_NAME':
            return {...state, name: action.value}
        case 'EVENT_NAME':
            return {...state, event: {...state.event, title: action.value}}
        case 'EVENT_DESC':
            return {...state, event: {...state.event, description: action.value}}
        case 'AREA_NAME':
            const nameEdits = editAreaName(state.areas, action.id, action.value)
            return {...state, nameEdits}
        case 'AREA_CAPACITY':
            const capacityEdits = editAreaCapacity(state.areas, action.id, action.value)
            return {...state, capacityEdits}
        case 'TOGGLE_ACTIVE':
            const toggleEdited = toggleBox(state.areas, action.id, action.value)
            return {...state, toggleEdited}
        default: return state
    }
}

export default reducer