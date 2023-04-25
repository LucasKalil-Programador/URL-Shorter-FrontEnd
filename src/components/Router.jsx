import { Route, BrowserRouter, Routes } from "react-router-dom";
import ShorterPage from "./MainPage/ShorterPage"
import InfoPage from "./InfoPage/InfoPage"

export default function Router () { 
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route component={ShorterPage}  path="/" element={<ShorterPage></ShorterPage>}/>
            <Route component={InfoPage}  path="/info" element={<InfoPage></InfoPage>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
