import {Route, Routes} from 'react-router-dom';
import Appbar from './containers/AppBar/AppBar';
import Home from './containers/components/Home/Home';
import About from './containers/components/About/About';
import Contacts from './containers/components/Contacts/Contacts';
import Divisions from './containers/components/Divisions/Divisions';
import Admin from './containers/components/Admin/Admin';

const App = () => (
  <>
    <header>
      <Appbar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about/:about" element={<About/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/divisions" element={<Divisions/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </main>
  </>
);

export default App;
