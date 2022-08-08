import { Layout, Menu, Button,Row,Col} from 'antd';
import './App.css';
import Lecteurs from './pages/Lecteurs';
import {BrowserRouter as Router , Routes, Route, NavLink } from "react-router-dom";
import AddFormLecteur from './components/AddFormLecteur';
import EditFormLecteur from './components/EditFormLecteur';
import Livres from './pages/Livres';
import AddFormLivre from './components/AddFormLivre';
import EditFormLivre from './components/EditFormLivre';
import Prets from './pages/Prets';
import AddFormPret from './components/AddFormPret';
import LecteurInfo from './pages/LecteurInfo';
import LivreInfo from './pages/LivreInfo';
import PretInfo from './pages/PretInfo';
import Home from './pages/Home';

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout className="layout">
      <Header>
        <Row>
          <Col span={22}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={"lecteurs"}
            >
              <Menu.Item key={"lecteurs"}>
                <NavLink to={"/lecteurs"}>
                  Lecteurs
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"livres"}>
                <NavLink to={"/livres"}>
                  Livres
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"prets"}>
                <NavLink to={"/prets"}>
                  Prets
                </NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2}>
            <Button >Deconnexion</Button>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div className="site-layout-content">
          <Routes>
            {/* Lecteurs */}
            <Route path='/' exact element={<Home/>}/>
            <Route path='/lecteurs' element={<Lecteurs/>}/>
            <Route path='/lecteurs/add' element={<AddFormLecteur/>}/>
            <Route path='/lecteurs/edit/:id' element={<EditFormLecteur/>}/>
            <Route path='/lecteurs/info/:id' element={<LecteurInfo/>}/>
            {/* Livres */}
            <Route path='/livres' element={<Livres/>}/>
            <Route path='/livres/add' element={<AddFormLivre/>}/>
            <Route path='/livres/edit/:id' element={<EditFormLivre/>}/>
            <Route path='/livres/info/:id' element={<LivreInfo/>}/>
            {/* Prets */}
            <Route path='/prets' element={<Prets/>}/>
            <Route path='/prets/add' element={<AddFormPret/>}/>
            <Route path='/prets/info/:id' element={<PretInfo/>}/>
          </Routes>
        </div>
      </Content>
    </Layout>
  </Router>
);

export default App;