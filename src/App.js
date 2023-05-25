import './App.css';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import Login from './components/LoginPage/Login';
import RightSideBar from './components/RightSideBar/RightSideBar';

function App() {

  const checkCredentials = () => {
    const id = localStorage.getItem("idInstance");
    const token = localStorage.getItem("api_token");
    if (id === "" || id === null) {
      console.log("Invalid id")
      return false;
    } else if (token === "" || token === null) {
      console.log("Invalid token")
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="App">
      {checkCredentials() ?
        <>
          <LeftSideBar />
          <RightSideBar />
        </>
        : <>
          <Login />
        </>
      }


    </div>
  );
}

export default App;
