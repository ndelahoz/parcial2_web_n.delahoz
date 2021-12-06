import { useEffect, useState } from "react";
import roomLogo from "../assets/room.webp";
import kitchenLogo from "../assets/kitchen.jpeg";

function Rooms(params) {
  const [rooms, setRooms] = useState([]);
  const [roomActual, setRoomActual] = useState({"devices":[]});

  function selectRooms(data) {
    let id = params.id;
    
      
      let aux = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].homeId == id) {
          aux.push(data[i]);
        }
      }
      setRooms(aux);
      localStorage.setItem(id,JSON.stringify(aux));
   
 

  }

  const url =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  useEffect(() => {
    if(navigator.onLine){
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        selectRooms(res);
  
      })
      //Sometimes the navigator online is true although the serviceworker is offline so this checks for that case
      .catch((e)=>{
        setRooms(JSON.parse(localStorage.getItem(params.id)));
      });

      
    }else{
      setRooms(JSON.parse(localStorage.getItem(params.id)));
    }
  }, [params]);

  function selectRoomActual(name) {
    for(let i=0; i<rooms.length;i++){
        if(rooms[i].name===name){
            setRoomActual(rooms[i]);
        }
    }

  }

  return (
    <div>
      <h1> My rooms</h1>
    <div className="row rooms">
      
      <div className="col-6 roomsCards">
        {rooms!=null? rooms.map((room) => {
          return (
            <div className="cardEspacio">
              <button className="butRoom" key={room.id} onClick={(e)=>selectRoomActual(room.name)}>
                <h4>{room.name}</h4>
                <img className="logo" src={room.type==="room"? roomLogo: kitchenLogo} alt={room.type}></img>
              </button>
            </div>
          );
        }): "The information of the rooms is not currently loaded."}
      </div>
      <div className="col-6 tablaDetalle">
        <table>
          <thead>
              <tr>
            <td>#</td>
            <td>ID</td>
            <td>Device</td>
            <td>Value</td>
            </tr>
          </thead>
          <tbody>
          {roomActual["devices"].map((device, index)=>{return(
            <tr>
              <td>{index+1}</td>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device["desired"].value}</td>
            </tr>

          )})
          }
          </tbody>
          
        </table>
      </div>
    </div>
    </div>
  );
}

export default Rooms;
