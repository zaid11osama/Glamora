import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import CustomerRegister from './pages/CustomerRegister.jsx'
import ArtistRegister from './pages/ArtistRegister.jsx'
import CustomerDashboard from './pages/CustomerDashboard.jsx'
import ArtistDetails from './pages/ArtistDetails.jsx'
import Booking from './pages/Booking.jsx'
import ArtistDashboard from './pages/ArtistDashboard.jsx'
import ArtistProfileEdit from './pages/ArtistProfileEdit.jsx'
import Admin from './pages/Admin.jsx'

const basename = import.meta.env.PROD ? '/Glamora' : ''

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/customer" element={<CustomerRegister />} />
            <Route path="/register/artist" element={<ArtistRegister />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/booking/:artistId" element={<Booking />} />
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/artist/profile/edit" element={<ArtistProfileEdit />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}
