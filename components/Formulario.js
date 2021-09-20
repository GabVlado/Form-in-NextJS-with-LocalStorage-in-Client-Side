import { Fragment , useState} from "react"

const Formulario = ({crearCita}) => {

  const initialState = {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  }

  //crear state de citas
  const [cita, actualizarCita] = useState(initialState)

  //Error 
  const [error , actualizarError] = useState(false)

  //Funcion que se ejecuta cada que el usuario escribe en un input 

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })

  }

  //Extraer los valores
  const {mascota,propietario, fecha,hora, sintomas} = cita;

  


  //Cuando el usuario presiona agregar la cita
  const submitCita = e => {
    e.preventDefault()

    //Validar
    if(
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim()  === '' ||
      hora.trim()  === '' ||
      sintomas.trim() === ''
    ){
      actualizarError(true);
      return;
    }

    //Eliminar el mensaje de error
    actualizarError(false)

    //Asignar un ID
    cita.id = new Date().toISOString()


    //Crear la cita
    crearCita(cita)
    

    //Reiniciar el form
    actualizarCita(initialState)



  }

  return (
    <Fragment>
      <h2>Desde Formulario</h2>

      {error ? <p className="alerta-error">Todos los campos son obligatorios </p>:null}


      <form 
        onSubmit={submitCita}
      >

        <label htmlFor="">Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value= {mascota}
        />

        <label htmlFor="">Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width" 
          placeholder="Nombre Dueño de la Mascota"
          onChange= {actualizarState}
          value= {propietario}
        />

        <label htmlFor="">Fecha</label>
        <input 
          type="date"
          name="fecha"
          className="u-full-width"
          onChange= {actualizarState}
          value={fecha}
          
        />

        <label htmlFor="">Hora</label>
        <input 
          type="time"
          name="hora"
          className="u-full-width"
          onChange= {actualizarState}
          value={hora}
        />

        <label htmlFor="">Síntomas</label>
        <textarea 
          name="sintomas" 
          className="u-full-width"
          onChange= {actualizarState}
          value={sintomas}
        >
        </textarea>
          <button 
            type="submit"
            className="u-full-width button-primary  "
          >
            Agregar Citas
          </button>

      </form>
    </Fragment>
  )
}

export default Formulario
