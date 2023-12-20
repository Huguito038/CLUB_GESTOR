import { Route,Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './Componentes/LoginPage/LoginPage';
import Home from './Componentes/Home/Home';
import RegisterPage from './Componentes/RegisterPage/RegisterPage';
import ProtectedRoutes from './Componentes/ProtectedRoutes';
import { useLocation} from 'react-router-dom';
import Barra from './Componentes/Barra/Barra';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { NewPlayer } from './Componentes/NewPlayer/NewPlayer';
import { AllPlayers } from './Componentes/AllPlayers/AllPlayers';
import { Jugador } from './Componentes/Jugador/jugador';
import { Comision } from './Componentes/Comision/Comision';
import Ajustes from './Componentes/Ajustes/Ajustes';
import Qrreader from './Componentes/QrReader/qrreader';

function App() {
  const {pathname} = useLocation()
  const auth = useSelector(state=>state.isAuthenticated)
  return (
    <div className='App'>
      {pathname !== "/" && auth && <Barra />}
       <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route path='/home' element={<Home></Home>}/>
            <Route path='/newPlayer' element={<NewPlayer></NewPlayer>}/>
            <Route path='/allPlayers' element={<AllPlayers></AllPlayers>}/>
            <Route path='/perfil/:id' element={<Jugador></Jugador>}/>
            <Route path='/comisionD' element={<Comision></Comision>}/>
            <Route path='/ajustes' element={<Ajustes></Ajustes>}></Route>
          </Route>
       </Routes>
    </div>
 )
}

export default App;
