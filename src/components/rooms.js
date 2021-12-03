import { useEffect, useState } from "react";
import houseLogo from "../assets/house.jpeg";

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
  }

  const url =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        selectRooms(res);
      });
  }, [params]);

  function selectRoomActual(name) {
    for(let i=0; i<rooms.length;i++){
        if(rooms[i].name===name){
            setRoomActual(rooms[i]);
        }
    }

  }

  return (
    <div className="row rooms">
      <div className="col-6 roomsCards">
        {rooms.map((room) => {
          return (
            <div className="cardEspacio">
              <button key={room.id} onClick={(e)=>selectRoomActual(room.name)}>
                <img src={houseLogo} alt="casa"></img>
                <h4>{room.name}</h4>
              </button>
            </div>
          );
        })}
      </div>
      <div className="col-6 tablaDetalle">
        <table>
          <thead>
            <th>#</th>
            <th>ID</th>
            <th>Device</th>
            <th>Value</th>
          </thead>
          <tbody>
          {roomActual["devices"].map((device)=>{return(
            <tr>
              <td>1</td>
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
  );
}

export default Rooms;
