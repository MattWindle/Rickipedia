import { useState, useEffect } from "react";
import background from './image.jpg';
import portal from './rickportal.png';
import './App.css';
import Axios from "axios";

function App() {

  const [characters, setCharacters] = useState([]);
  const [singleCharacters, setSingleCharacter] = useState();
  const [charactersNext, setcharactersNext] = useState("");
  const [charactersPrev, setcharactersPrev] = useState("");
  const [charactersCurPage, setcharactersCurPage] = useState(0);

  var getChars = (url) => {
    Axios.get(url).then((response) => {
      setCharacters(response.data.results);
      setcharactersNext(response.data.info.next);
      setcharactersPrev(response.data.info.prev);
      setcharactersCurPage(charactersCurPage + 1);
    });
  }
  var getSingleChars = (url) => {
    Axios.get(url).then((response) => {
      setSingleCharacter(response.data);
    }).then(() => {
      document.querySelector("main").classList.add("blur");
      document.querySelector("aside").classList.add("blur");
    });
  }  
  var getEp = (url) => {
    Axios.get(url).then((response) => {
      console.log(response);
    })
  }  

  useEffect(() => {
    getChars("https://rickandmortyapi.com/api/character");
  }, []);

  

  return (
    <div className="App">
      <div className="container">
        <aside style={{ backgroundImage: 'url(' + background + ')' }}>
          <div className="aside-content">
            <h1>Search for characters, episodes and locations</h1>
            <form action="">
              <input type="text" placeholder="Rick Sanchez" />
            </form>
          </div>
          <img className="portal" src={portal} alt="" />
        </aside>
        <main>
          <h2>Characters - {charactersCurPage} </h2>
          <div className="character-grid" >
            {characters && characters.map((data) => {
              return (
                  <div className="single-character" key={data.id} >    
                    <img onClick={() => { getSingleChars(data.url) }} src={data.image} /> 
                  </div>
              )
            })}
          </div>
          {charactersNext && <button onClick={() => {getChars(charactersNext)} } >Next page</button>}
          {charactersPrev && <button onClick={() => { getChars(charactersPrev)} } >Prev page</button>}
        </main>
        {singleCharacters &&
          <div className="single-character-info-wrapper" >
            <div className="single-character-info">
              <img src={singleCharacters.image} />
            <div className="single-character-info-content">
                  <h3 className="name" >Name: {singleCharacters.name}</h3>
                  <p>Gender: {singleCharacters.gender}</p>
                  <p>Species: {singleCharacters.species}</p>
                  <p>Type: {singleCharacters.type}</p>
                  <p>Status: {singleCharacters.status}</p>
                  <p>Location: {singleCharacters.location.name}</p>
                  <p>Episodes:</p>
                <ul>
                  {singleCharacters.episode.map((data) => {
                    var res = data.substring(32);
                    var new_data = res.replace("/", " ");
                    return (
                      <li key={data} onClick={() => { getEp(data)}}>{new_data}</li>
                    )
                  })}
              </ul>
                </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

