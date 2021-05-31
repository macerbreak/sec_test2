
import './App.css'
import React, {useState} from 'react'
import DisplayComponent from "./components/DisplayComponent";
import BtnComponent from "./components/BtnComponent";

function App() {
  let [time, setTime] = useState({ms:0,s:0,m:0,h:0});
  let [interv, setInterv] = useState();
  let [status,setStatus] = useState(0);

  const start = () =>{
    run();
    setStatus(1);
    setInterv(setInterval(run ,10))
  }

  let UpdatedMs=time.ms, UpdatedS=time.s,UpdatedM=time.m,UpdatedH=time.h

  const run = () =>{
    if(UpdatedMs === 100){
      UpdatedS++
      UpdatedMs=0
    }
    if(UpdatedS===60){
      UpdatedM++
      UpdatedS=0
    }
    if(UpdatedM===60){
      UpdatedH++
      UpdatedM=0
    }
    UpdatedMs++
    return setTime({ms:UpdatedMs,s:UpdatedS,m:UpdatedM,h:UpdatedH})
  }
const wait = () =>{
  clearInterval(interv)
  setStatus(2)
}
  const stop = () =>{
    clearInterval(interv)
    setStatus(0)
    setTime({ms:0,s:0,m:0,h:0})
  }

  const reset = ()=>{
    clearInterval(interv)
    setStatus(1)
    setTime({ms:0,s:0,m:0,h:0})
    UpdatedMs=0
    UpdatedS=0
    UpdatedM=0
    UpdatedH=0
    run()
    setInterv(setInterval(run ,10))
  }
  const resume = ()=>start()

  return (
      <div className="main-section">
        <div className="clock-holder">
          <div className="stopwatch">
              <DisplayComponent time={time} />
              <BtnComponent stop={stop}
                            reset={reset}
                            resume = {resume}
                            wait ={wait}
              start={start}
              status={status}/>
          </div>
        </div>
      </div>
  );
}

export default App;
