import {useState} from 'react'
import {Header} from '../../componentes/Header'
import background from "../../assets/background.png";
import ItemList from '../../componentes/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
      const userData = await fetch(`https://api.github.com/users/${user}`)
      const newUser = await userData.json();

      if(newUser.name){
        const {avatar_url, name, bio, login} = newUser;
        setCurrentUser({avatar_url, name, bio, login});

        const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
        const newRepo = await reposData.json();
        
        if(newRepo.length){
          setRepos(newRepo);
        }
      }
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="conteudo">
        <img src={background} className='background'  alt='background app' />
        <div className='info'>
          <div>
            <input name='usuario' 
            value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder='@username'></input>
            <button onClick={handleGetData} >Buscar</button>
          </div>
          {currentUser?.name ? (<>
            <div className='perfil'>
            <img src={currentUser.avatar_url} className='profile' alt='imagem de perfil'/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr/>
          </>
          ): null}
           {repos?.length ? (
            
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
          </div>
          ): null}

        </div>
      </div>
    </div>
  );
}

export default App;
