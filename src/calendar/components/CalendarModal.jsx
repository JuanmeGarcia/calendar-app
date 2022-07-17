import { addHours } from 'date-fns'
import { useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns/esm';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks'
registerLocale('es', es)


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal, openDateModal } = useUiStore()
    const [formValue, setFormValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const [formSubmmited, setFormSubmmited] = useState(false)


    const titleClass = useMemo(()=>{
        if(!formSubmmited) return ''

        return formValue.title.length > 0
            ? 'is-valid' 
            : 'is-invalid'
        
    }, [formValue.title, formSubmmited])


    const onChangeValue = (event) => {
        const { name, value } = event.target

        setFormValue(prevFormValue =>(
            {
                ...prevFormValue,
                [name]:  value
            }
        ))
    }

    const onDateChange = (event, changing) => {
        setFormValue(prevFormValue =>({
            ...prevFormValue,
            [changing]: event
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault()

        setFormSubmmited(true)

        const difference = differenceInSeconds(formValue.end, formValue.start)

        if(difference <= 0){
            Swal.fire('Debes poner una fecha de finalizacion posterior a la de inicio', 'Revisar las fechas ingresadas', 'error')
            return
        }
        if(isNaN(difference)){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return
        }

        if(formValue.title.length <=0 ){
            Swal.fire('Debes escribir un titulo para tu fecha', 'Revisar el titulo', 'error')
            return
        }

        onCloseModal()
        Swal.fire('Se creo el evento correctamente', 'Todo 👌', 'success')
    }


	return (
		<div>
			<button onClick={openDateModal}>Open Modal</button>
			<Modal
				isOpen={isDateModalOpen}
				onRequestClose={closeDateModal}
				style={customStyles}
				className="modal"
				overlayClassName="modal-fondo"
				closeTimeoutMS={200}
			>
				<h1> Nuevo evento </h1>
				<hr />
				<form className="container"
                    onSubmit={onSubmit}
                >
					<div className="form-group mb-2">
						<label>Fecha y hora inicio</label>
                        <DatePicker 
                            locale="es"
                            selected={formValue.start} 
                            onChange={(event) => onDateChange(event, 'start')}
                            className="form-control"
                            dateFormat="Pp"
                            showTimeSelect
                            timeCaption='Hora'
                        />
					</div>

					<div className="form-group mb-2">
						<label>Fecha y hora fin</label>
                        <DatePicker 
                            minDate={formValue.start}
                            locale="es"
                            selected={formValue.end} 
                            onChange={(event) => onDateChange(event, 'end')}
                            className="form-control"
                            dateFormat="Pp"
                            showTimeSelect
                            timeCaption='Hora'
                        />
					</div>

					<hr />
					<div className="form-group mb-2">
						<label>Titulo y notas</label>
						<input
							type="text"
							className={`form-control ${titleClass}`}
							placeholder="Título del evento"
							name="title"
							autoComplete="off"
                            value={formValue.title}
                            onChange={onChangeValue}
						/>
						<small id="emailHelp" className="form-text text-muted">
							Una descripción corta
						</small>
					</div>

					<div className="form-group mb-2">
						<textarea
							type="text"
							className="form-control"
							placeholder="Notas"
							rows="5"
							name="notes"
                            value={formValue.notes}
                            onChange={onChangeValue}
						></textarea>
						<small id="emailHelp" className="form-text text-muted">
							Información adicional
						</small>
					</div>

					<button
						type="submit"
						className="btn btn-outline-primary btn-block"
					>
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</form>
			</Modal>
		</div>
	)
}
