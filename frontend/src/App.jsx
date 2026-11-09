import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { useEffect } from "react"
import { me } from "./api/auth"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "./redux/userSlice"
import Home from "./pages/Home"
import Agents from "./pages/Agents"
import Integration from "./pages/Integration"
import CreateAgent from "./pages/CreateAgent"
import { setAgents, setAgentsLoading } from "./redux/agentSlice"
import { fetchAgents } from "./api/agent"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await me();
        dispatch(setUserData(data))

      } catch (error) {
        console.log(error);

      }
    }

    fetch()
  }, [])

  const fetchAllAgents = async () => {
    dispatch(setAgentsLoading(true))
    try {
      const data = await fetchAgents();
      dispatch(setAgents(data.agents))
      dispatch(setAgentsLoading(false))
      console.log(data)

    } catch (error) {
      console.log(error)
      dispatch(setAgentsLoading(false))
    }
  }
  useEffect(() => {
    fetchAllAgents()
  }, [])

  const { userData } = useSelector(state => state.user)


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={userData ? <Navigate to={"/"} /> : <Login />}></Route>
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/login"} />}></Route>
        <Route path="/agent" element={userData ? <Agents /> : <Navigate to={"/login"} />}></Route>
        <Route path="/integration" element={userData ? <Integration /> : <Navigate to={"/login"} />}></Route>
        <Route path="/agent/new" element={userData ? <CreateAgent /> : <Navigate to={"/login"} />}></Route>


      </Routes>
    </BrowserRouter >





  )
}

export default App
