import Swal from "sweetalert2"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {
    const { startDeletingEvent } = useCalendarStore()
    const { activeEvent } = useCalendarStore()
    const { user } = useAuthStore()

    const handleDelete = () => {

        // const isMyEvent = activeEvent.user._id ? activeEvent.user._id : activeEvent.user.uid

        // if(isMyEvent != user.uid){
        //     Swal.fire(
        //         'Oops...',
        //         'No puedes eliminar un evento que no es tuyo',
        //         'error'
        //     )
        //     return
        // }
        
        startDeletingEvent()
    }



    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i 
                className="fas fa-trash-alt"
            ></i>
        </button>
    )
}
