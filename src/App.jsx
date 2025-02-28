import axios from 'axios'
// import { Typography } from "@mui/material";
import ResponsiveAppBar from "./components/Header"
const App = () => {
    const newAPI =async () =>{
        try {
            const url = await fetch("http://loclhost:3000/signup")
            console.log("data..", url)
        } catch (error) {
            
        }
    }
    return (
      <button onClick={newAPI}>Click Me</button>
    )
}
export default App