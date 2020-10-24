import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
//variable to hold url
const url = "https://kd-dogs-backend.herokuapp.com"

//state to hold dogs
const [dogs, setDogs] = React.useState([])

//function to get dogs via API
const getDogs = () => {
  fetch(url + "/dog/")
  .then(response => response.json())
  .then(data => {
    setDogs(data)
  })
}

//useEffect to do initial call of getDogs
React.useEffect(()=>{
  getDogs()
}, [])


//empty dog variable
const emptyDog = {
  name: "",
  age: 0,
  img:"",
}
/////////next 3 variables are update route

///selectedDog, this will represent the dog edited
const [selectedDog, setSelectedDog] = React.useState(emptyDog);


//handleUpdate for when you want to update form
const handleUpdate = (dog) => {
  fetch(url +"/dog/" + dog._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog)
  }).then((response) => getDogs())
}
///Set the state when you select a dog to edit
const selectDog = (dog) => {
  setSelectedDog(dog)
}


///function to delete dog
const deleteDog = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "delete",
  }).then((response) => getDogs())
}



///handle create function for creating new dogs
const handleCreate = (newDog) => {
  fetch(url + "/dog/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then(() => {
    getDogs();
  });
};


  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
  <button>Add Dog</button>
</Link>
      <main>
        <Switch>


          <Route exact path="/" render={(rp) => <Display selectDog={selectDog} {...rp} dogs = {dogs} deleteDog={deleteDog} />} />


          <Route
  exact
  path="/create"
  render={(rp) => (
    <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
  )}
/>


          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} /> //label is for the button
            )}
          />


        </Switch>
      </main>
    </div>
  );
}

export default App;
