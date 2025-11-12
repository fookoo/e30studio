import { SplitView } from 'e30studio/components'


function App() {

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
    }}>

     <SplitView orientation={'horizontal'} limits={'second'}  min={200}>
       <div>Top</div>
         <SplitView orientation={'vertical'} max={400} min={50}>
           <div>Left Column2</div>
           <div>Right Column</div>
         </SplitView>
     </SplitView>
    </div>
  )
}

export default App
