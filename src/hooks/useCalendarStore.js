import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import calendarApi from '../api/calendarApi'
import { convertDate } from '../helpers'
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
	const dispatch = useDispatch()

	const { events, activeEvent } = useSelector(state => state.calendar)
	const { user } = useSelector(state => state.auth)

	const setActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent))
	}

	const startSavingEvent = async calendarEvent => {
		//todo llegar la backend para guardar el evento

		if (calendarEvent.id) {
			//update
			//todo llegar la backend para actualizar el evento
			try {
				await calendarApi.put(
					`/events/${calendarEvent.id}`,
					calendarEvent
					)
				dispatch(onUpdateEvent(
					{ 
						...calendarEvent, 
						user 
					}
				))
			Swal.fire('Se actualizo correctamente el evento', 'Todo 👌', 'success')

			} catch (error) {
				console.log(error);
				Swal.fire(
					'Error al guardar',
					error.response.data.msg,
					'error'
				)
			}
		} else {
			//create
			//todo llegar la backend para crear el evento
			const { data } = await calendarApi.post('/events', calendarEvent)
			dispatch(
				onAddNewEvent({
					...calendarEvent,
					id: data.event.id,
					user
				})
			)
			Swal.fire('Se creo el evento correctamente', 'Todo 👌', 'success')
		}
	}

    const startDeletingEvent = async () => {
        if(!activeEvent) return
		try {
			const { data } = await calendarApi.delete(
				`/events/${activeEvent.id}`
			)
			console.log(data);
			dispatch(onDeleteEvent())
			Swal.fire('Evento borrado',
			'El evento se ha borrado exitosamente',
			'success'
			)
		} catch (error) {
			console.log(error);
			Swal.fire('Oooopps..',
			'No tiene privilegio para borrar ese evento',
			'error'
			)
		}

    }

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events')
			const events = convertDate(data.events)
			dispatch(onLoadEvents(events))
		} catch (error) {
			console.log(error);
			console.log('Error cargando eventos');
		}
	}

	return {
		events,
		activeEvent,
		setActiveEvent,
		startSavingEvent,
        startDeletingEvent,
		startLoadingEvents
	}
}
