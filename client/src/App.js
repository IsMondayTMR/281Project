import './App.css';
import Header from "./containers/header"
import Routers from "./routers/routers"
import {UserContext} from './context/userContext'
function App() {
  return (
    <div className="App"> 
      <UserContext>
        <Header/>
        <Routers/>
      </UserContext>
    </div>
  );
}

export default App;
