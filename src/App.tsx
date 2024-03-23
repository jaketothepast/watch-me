import './App.css'
import SiteInput from './components/SiteInput'

function App() {
  return (
    <div className="App">
      <header>
        <p>Hello Vite + React!</p>
      </header>
      <SiteInput saveSite={ (site) => console.log(site) }/>
    </div>
  )
}

export default App
