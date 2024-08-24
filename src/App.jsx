import { useState } from 'react';
import './App.css';
import supabase from './supabase';
import Load from './Load';

function App() {
  const [file, setFile] = useState(null);

  
 
  const upload = async() => {
    if(file){
   
      const filename = Math.round(Math.random()*1000000000)
      console.log(filename)
      
      const { data, error } = await supabase
        .storage
        .from('pdfs')
        .upload(filename+'.pdf', file, {
          cacheControl: '3600',
          upsert: false
        })
      
      if(error){
        console.log(error)
      }
      else{
        

        const path = 'https://hwnkucfptcbnpbmbmtec.supabase.co/storage/v1/object/public/pdfs/'+filename+'.pdf'

        await supabase.from('Files').insert({file_url : path}).then(()=>console.log('Done'))

      }


    }
  };

  return (
    <>
      {/* <div>
        <h1>Upload Notes</h1>
        <input
          type="file"
          accept=".pdf"
          onChange={e=>setFile(e.target.files[0])}
        />
        <button onClick={upload}>Upload</button>

        
      </div> */}

      <Load></Load>
    </>
  );
}

export default App;
