import { useState, useEffect } from "react";
import background from './image.jpg';
import portal from './rickportal.png';
import './App.css';
import Axios from "axios";

function App() {
  const [PageLoading, setPageLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [singleCharacters, setSingleCharacter] = useState();
  const [charactersNext, setcharactersNext] = useState("");
  const [charactersPrev, setcharactersPrev] = useState("");
  const [charactersCurPage, setcharactersCurPage] = useState(0);
  const [maxPages, setMaxPages] = useState();

  var getChars = (url, type) => {
    // setPageLoading(false)
    Axios.get(url).then((response) => {
      setCharacters(response.data.results);
      setcharactersNext(response.data.info.next);
      setcharactersPrev(response.data.info.prev);
      if (type === "next" || type === undefined ){
        setcharactersCurPage(charactersCurPage + 1);
      }else{
        setcharactersCurPage(charactersCurPage - 1);
      }
      setMaxPages(response.data.info.pages);
    }).then(() => {

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

  var close_modal = () => {
    document.querySelector("main").classList.remove("blur");
    document.querySelector("aside").classList.remove("blur");
    setSingleCharacter("")
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
          <h2>Characters</h2>
          {PageLoading && 
          <div className="character-grid" >
            {characters && characters.map((data) => {
              return (
                  <div className="single-character" key={data.id} >    
                  <img onClick={() => { getSingleChars(data.url) }} src={data.image} alt={data.name} />
                  </div>
              )
            })}
          </div>
          }
          {!PageLoading && <div>Loading</div>}
          <div className="pagination" >
            <button className={`btn`} onClick={() => { getChars(charactersPrev, "prev")} } >Prev page</button>
            <p>Page: {charactersCurPage} / {maxPages}</p>
            <button className="btn" onClick={() => {getChars(charactersNext, "next")} } >Next page</button>
          </div>
        </main>
        {singleCharacters &&
          <div className="single-character-info-wrapper" >
            <div className="single-character-info">
              <img src={singleCharacters.image} />
            <div className="single-character-info-content">
              <i class="bi bi-x-circle close" onClick={() => { close_modal() }}></i>
                  <h3 className="name" >Name: {singleCharacters.name}</h3>
                  <p>Gender: {singleCharacters.gender}</p>
                  <p>Species: {singleCharacters.species}</p>
                   {singleCharacters.type && <p>Type: {singleCharacters.type}</p> }
                  <p>Status: {singleCharacters.status}</p>
                  <p>Location: {singleCharacters.location.name}</p>
                  <p>Episodes:</p>
                    <ul className="eps">
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

