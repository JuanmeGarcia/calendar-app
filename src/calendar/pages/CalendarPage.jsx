import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEventBox, CalendarModal } from '../'
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import '../../style/style.css'
import { useUiStore } from '../../hooks'



const events = [{
    title: 'Cumpleanios de la jefa',
    notes: 'hay que comprar el paster',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Juanme'
    }
}]



export const CalendarPage = () => {

    const { openDateModal } = useUiStore()

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
        )

    const onDoubleClick = (event) => {
        openDateModal()
    }

    const onSelect = (event) => {
        console.log("on select", event);
    }

    const onViewChange = (event) => {
        localStorage.setItem('lastView', event)
    }

    const eventStyleGetter = (...args) => {

        const style = {
            backgroundColor: '#347cf7',
            borderRadius: '0px',
            color: 'white',
            width: '100%',
        }

        return {style}
    }


    return (
		<>
			<Navbar />
            <CalendarModal />
			<Calendar
                culture='es'
				localizer={localizer}
				events={events}
                defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc(100vh - 80px)'}}
                messages={ getMessagesES() }
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
			/>
		</>
	)
}
