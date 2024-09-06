import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ChallengeDetail from "./pages/ChallengeDetail"
import ChallengeForm from "./pages/ChallengeForm"
import { ChallengeProvider } from "./components/ChallengeContext"
import CreateChallenge from "./pages/CreateChallenge"
import LoginForm from "./pages/Login"
import SignUpForm from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return <>
    <ChallengeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path="/create-challenge" element={<CreateChallenge />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
          <Route path="/edit-challenge" element={<ChallengeForm />} />
          </Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/signup' element={<SignUpForm />}></Route>
        </Routes>
      </BrowserRouter>
    </ChallengeProvider>
  </>
}

export default App
