import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEventBox } from '../'
import { localizer, getMessagesES } from '../../helpers'



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
			<Calendar
                culture='es'
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc(100vh - 80px)'}}
                messages={ getMessagesES() }
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
			/>
		</>
	)
}
