import "./styles/theme.css";
import "./styles/global.css";
import { LuckyNumber } from "./components/LuckyNumber";

import { Header } from "./components/Header";
// import { Main } from "./components/Main";
// import { Footer } from "./components/Footer";


export default function App() {

  return (
    //React Fragment
    <>
    <Header />
      <LuckyNumber />
      
      {/* <Main/>
      <div className='spacer'></div>
      <Footer/>   */}
  </>
  );
}


