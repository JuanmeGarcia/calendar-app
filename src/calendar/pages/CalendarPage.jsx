import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete } from '../'
import { localizer, getMessagesES } from '../../helpers'
import { useEffect, useState } from 'react'
import '../../style/style.css'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
import { useSelector } from 'react-redux'

export const CalendarPage = () => {

	const { user } = useAuthStore()

	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
	const { activeEvent } = useSelector(state => state.calendar)
	const { openDateModal, isDateModalOpen } = useUiStore()

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	)

	const onDoubleClick = event => {
		openDateModal()
	}

	const onSelect = event => {
		setActiveEvent(event)
	}

	const onViewChange = event => {
		localStorage.setItem('lastView', event)
	}

	const eventStyleGetter = (event, start, end, isSelected) => {

		const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

		const style = {
			backgroundColor: isMyEvent ? '#347cf7' : '#465660',
			borderRadius: '0px',
			color: 'white',
			width: '100%',
		}

		return { style }
	}

	useEffect(()=>{
		startLoadingEvents()
	}, [])

	return (
		<>
			<Navbar />
			<CalendarModal />
			<FabAddNew />

			{
				activeEvent && !isDateModalOpen && <FabDelete />
			}
			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc(100vh - 80px)' }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEventBox,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
			/>
		</>
	)
}
