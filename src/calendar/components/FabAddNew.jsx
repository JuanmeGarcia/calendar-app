import { addHours } from "date-fns/esm"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {
    const { openDateModal, isDateModalOpen } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const onAddEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date, 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Juanme'
            }
        })
        openDateModal()

    }



    return (
        <button
            className="btn btn-primary fab"
            onClick={onAddEvent}
        >
            <i 
                className="fas fa fa-plus"
            ></i>
        </button>
    )
}
