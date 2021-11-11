import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios';

function App() {
 
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [ListOfFriends, setListOfFriends] = useState([]);

  //Funcion para guardar los datos del formulario desde el frontend al backend
  const addFriend = () => {
    Axios.post("https://pogit-mernapp.herokuapp.com/addFriend", { 
      name : name, 
      age : age,
      description : description 
    }).then((response) => {
      alert('Datos registrados! Success! =D');
      setListOfFriends([...ListOfFriends, { _id: response.data._id, name : name, age : age, description : description }]);
    }).catch(() => {
      alert('No se registraron los datos! Fail! =(')
    });
  };

  //Funcion para actualizar datos del formulario desde el frontend al backend
    const updateFriend = (id) => {

    const newAge = prompt("Ingresar nueva edad: ");
    const newDescription = prompt("Ingresar nueva descripcion: ");

    Axios.put("https://pogit-mernapp.herokuapp.com/update", { newAge: newAge, newDescription: newDescription, id: id}).then(() =>{
      alert('Datos actualizados! Success! =D');
      setListOfFriends(ListOfFriends.map((val) =>{
        return val._id === id 
        ? { _id: id, name: val.name, age: newAge, description: newDescription }
        : val;
      }));
    }).catch(() => {
      alert('No se actualizaron los datos! Fail! =(');
    });
  };

  //Funcion para borrar datos desde el frontend al backend
  const deleteFriend = (id) => {
    Axios.delete(`https://pogit-mernapp.herokuapp.com/delete/${id}`).then(() => {
      alert('Datos eliminados! Sucess! =D');
      setListOfFriends(ListOfFriends.filter((val) => {
        return val._id !== id;
      }));
    }).catch(() => {
      alert('No se eliminaron los datos! Fail! =(');
    });
  };



  //Funcion para cargar los datos desde el backend al frontend
  //useEffect es una funcion que se ejecuta al cargar la App
  useEffect(() => {
    Axios.get("https://pogit-mernapp.herokuapp.com/read")
    .then((response) => {
      setListOfFriends(response.data);
    }).catch(() => {
      console.log("No Response");
    });
  }, []);

return (
    <div className="App">
      <div className="inputs">
      REGISTRO DE AMIGOS
        <input 
          type = "text" 
          placeholder = "Nombre..."
          onChange = {(event) => { setName(event.target.value) }}
        />
        <input 
          type="number" 
          placeholder="Edad..."
          onChange = {(event) => { setAge(event.target.value) }}
        />

        <input 
          type="text" 
          placeholder="Descripcion..."
          onChange = {(event) => { setDescription(event.target.value) }}
        />

        <button onClick = { addFriend }>Agregar</button>
      </div>
      <p align="center">LISTADO DE AMIGOS </p>
      <div className="ListOfFriends">
        { ListOfFriends.map((val) => {
          return (
                  <div className="FriendContainer">
                    <div className="Friend">
                      <h3>Nombre: {val.name}</h3>
                      <h3>Edad: {val.age}</h3>
                      <h3>Descripcion: {val.description}</h3>
                    </div>
                    <button 
                      id="updateBtn"
                      onClick = {() => { updateFriend(val._id) }}
                    ><b>M</b></button>
                    <button 
                      id="removeBtn"
                      onClick = {() => { deleteFriend(val._id) }}
                    ><b>E</b></button>
                  </div>
                  );
        })}
      </div>

    </div>
  );
}

export default App;

