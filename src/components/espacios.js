import { useEffect, useState } from "react";
import houseLogo from "../assets/house.jpeg";
import Rooms from "./rooms";


function Espacios() {
  const [espacios, setEspacios] = useState([]);
  const [espacioActual, setEspacioActual] = useState({});



  const url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEspacios(res);
      });
  },[]);

  function selectEspacio(id) {
    for(let i=0; i<espacios.length;i++){
        if(espacios[i].id===id){
            setEspacioActual(id);
        }
    }

  }
  return (
    <div>
    <h1>My spaces</h1>
    <div className="espacios">
    {espacios.map((espacio)=>{
        return(
            <div className="cardEspacio">
            <button key={espacio.id} onClick={(e)=>{selectEspacio(espacio.id)}}>
                <img src={houseLogo} alt="casa"></img>
                <h4>{espacio.name}</h4>
                <p>{espacio.address}</p>
            </button>
            </div>
        );
    })}
    </div>
    <Rooms id={espacioActual}/>
    </div>
  );
}

export default Espacios;