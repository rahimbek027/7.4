import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import CustomRoutes from './routes'

function App() {

  return (
    <div>
      <Header/>
      <div className='flex justify-between'>
        <Navbar/>
        <div className='w-[80%] overflow-y-auto h-[100vh]'>
          <CustomRoutes/>
        </div>
      </div>

    </div>
  )
}

export default App
