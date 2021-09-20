import Head from 'next/head';
import dynamic from 'next/dynamic'
import { Fragment, useState , useEffect, useCallback } from 'react';
import Cita from '../components/Cita';
import Formulario from '../components/Formulario';

const LocalStorage = dynamic(() => import('../components/LocalStorageHandler'),{ssr:false})


export default function Home() {


      
      const [ citas, guardarCitas] = useState([]) // citas= [{meeting1},{meeting2}]



      //const LocalStorage = dynamic(() => import('../components/LocalStorageHandler'),{ssr:false})
      
      // useEffect(() => {

      //  if(!localStorage.getItem('citas')){ 
      //     localStorage.setItem('citas', JSON.stringify([]))         
      //    }


      //  if( JSON.parse(localStorage.getItem('citas')).length > 0){
            
      //        const citasInLocalStorage  = JSON.parse(localStorage.getItem('citas'))
             
      //        guardarCitas([...citasInLocalStorage])
          

      //  }




      //  },[])




      

      //funcion que lea la cita  y agregue la nueva
      const crearCita = (cita) => {
        console.log(cita)
        guardarCitas([
          ...citas,cita
        ])

      }
      

      // Funcion que elimina una cita por su ID
      const eliminarCita = id => {
          const nuevasCitas = citas.filter( cita => cita.id !== id );
          guardarCitas(nuevasCitas)
      }

      
    //Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (



    <Fragment>

      <Head>
        <title>Administración de Pacientes</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
        <link href="https://fonts.googleapis.com/css?family=Staatliches" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"/>
      </Head>
      <div >
        <h1>Administrador de Pets</h1>
        <div className="container">
          <div className="row " >
            <div className="one-half column">
              <Formulario    
                crearCita={crearCita}
              />
            </div>      
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map( cita => 
                <Cita
                  key= {cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
                
              )}
              {console.log('me ejecute')}
              <LocalStorage type={'set'} keys={"citas"} value={citas}/>
            </div>      
          </div>
        </div>
      </div>
    </Fragment>
  )
}
