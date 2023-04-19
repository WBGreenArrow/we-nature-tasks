import { Routes, Route } from 'react-router-dom'
import { DashBoard } from './components/DashBboard'
import { Tasks } from './pages/Tasks'
import { Teams } from './pages/Teams'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />}>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default RoutesProvider
