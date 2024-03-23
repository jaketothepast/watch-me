import { useState } from 'react'
import './App.css'
import SiteInput from './components/SiteInput'

type SiteType = any[];

function App() {
  const [sites, setSites] = useState<SiteType>([]);

  return (
    <div className="App">
      <header>
        <p>Hello Vite + React!</p>
      </header>

      <ul>
      {sites.map((site: string) => <li>{site}</li>)}
      </ul>

      <SiteInput saveSite={ (site: string) => {
        const update = new Set([...sites, site]);
        setSites(Array.from(update));
      } }/>
    </div>
  )
}

export default App
