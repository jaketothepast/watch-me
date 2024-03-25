import { useState } from 'react'
import './App.css'
import SiteInput from './components/SiteInput'
import SiteDisplay from './components/SiteDisplay';

type SiteType = any[];

function App() {
  const [sites, setSites] = useState<SiteType>([]);

  function deleteSite(site: String) {
    setSites(sites.filter(s => s !== site));
  }

  return (
    <div className="App">
      <header>
        <p>Hello Vite + React!</p>
      </header>

      <ul>
      {sites.map((site: string) => {
        return <SiteDisplay key={site} deleteSite={() => deleteSite(site)} site={site} />;
      })}
      </ul>

      <SiteInput saveSite={ (site: string) => {
        const update = new Set([...sites, site]);
        setSites(Array.from(update));
      } }/>
    </div>
  )
}

export default App
