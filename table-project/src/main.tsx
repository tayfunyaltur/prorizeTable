import ReactDOM from 'react-dom/client'
import Users from './pages/users'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='container m-auto mt-4'>
    <Users />
  </div>
)
