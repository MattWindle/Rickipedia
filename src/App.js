import background from './image.jpg';
import portal from './rickportal.png';
import './App.css';

function App() {
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
        </main>
      </div>
    </div>
  );
}

export default App;

