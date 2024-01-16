import { DataProvider } from './contexts/DataContexts.jsx';

import { Home } from './pages/Home.jsx'

export const App = () => {

    return (
        <DataProvider>
            <Home/>
        </DataProvider>
    )
}