import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import GitHubCorner from "./components/GitHubCorner"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import Signup from "./components/authentication/signup/Signup"
import Login from "./components/authentication/login/Login"

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="/register" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
            <GitHubCorner />
        </>
    )
}

export default App
