import { useEffect, useState } from "react";
import houseLogo from "../assets/house.jpeg";
import aptoLogo from "../assets/apto.jpeg";
import Rooms from "./rooms";


function Espacios() {
  const [espacios, setEspacios] = useState([]);
  const [espacioActual, setEspacioActual] = useState({});



  const url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  useEffect(() => {
    if(navigator.onLine){
      fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setEspacios(res);
        localStorage.setItem("espacios", JSON.stringify(res));
        console.log(JSON.parse(localStorage.getItem("espacios")));
      })
      //Sometimes the navigator online is true although the serviceworker is offline so this checks for that case
      .catch((e)=>{
        setEspacios(JSON.parse(localStorage.getItem("espacios")));
      });

    }else{
      setEspacios(JSON.parse(localStorage.getItem("espacios")));
    }
    
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
    {espacios!=null? espacios.map((espacio)=>{
        return(
            <div className="cardEspacio">
            <button className="butEspacio" key={espacio.id} onClick={(e)=>{selectEspacio(espacio.id)}}>
                <img className="logo" src={espacio.type==="house"? houseLogo: aptoLogo } alt="casa"></img>
                <h4>{espacio.name}</h4>
                <p>{espacio.address}</p>
            </button>
            </div>
        );
    }): "Sorry the app has no connectivity right now"}
    </div>
    <Rooms id={espacioActual}/>
    </div>
  );
}

export default Espacios;