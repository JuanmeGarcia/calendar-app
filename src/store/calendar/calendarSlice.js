import { createSlice } from '@reduxjs/toolkit'

// const temporalEvent = [
// 	{
//         _id: new Date().getTime(),
// 		title: 'Cumpleanios de la jefa',
// 		notes: 'hay que comprar el paster',
// 		start: new Date(),
// 		end: addHours(new Date(), 2),
// 		bgColor: '#fafafa',
// 		user: {
// 			_id: '123',
// 			name: 'Juanme',
// 		},
// 	},
// ]

const initialState = {
	events: [],
	activeEvent: null,
	isLoadingEvents: true
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload)
			state.activeEvent = null
		},
		onUpdateEvent: (state, {payload}) => {
			state.events = state.events.map(event => (
				payload.id === event.id 
					? payload
					: event
			))
		},
		onDeleteEvent: (state, ) => {
			state.events = state.events
				.filter(event =>(
					event.id !== state.activeEvent.id
				))
			state.activeEvent = null
		},
		onLoadEvents: (state, { payload }) => {
			state.isLoadingEvents = false
			// state.events = payload
			payload.forEach(event =>{
				const exist = state.events.some(dbEvent =>(
					dbEvent.id === event.id
				))

				if(!exist){
					state.events.push(event)
				}
			})
		},
		onLogoutCleanUp: (state) => {
			state.activeEvent = null
			state.events = []
			state.isLoadingEvents = true
		}
    },
})

export const {
    onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCleanUp,
} = calendarSlice.actions
