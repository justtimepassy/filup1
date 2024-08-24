import React, { useEffect, useState } from 'react'
import supabase from './supabase'

function Load() {

  const [data,setData] = useState(null)

  useEffect(()=>{

    

    const fetchFiles = async()=>{
        await supabase.from('Files').select("*").then((data)=>{
            console.log(data.data)
            setData(data.data)
        })
        
    }

    fetchFiles()

  },[])

  return (
    <div>

        {
            
            data && 

            <ul>
               {
                  data.map(e=>{
                    return <li><a href={e.file_url}>Pdf {e.id}</a></li>
                  })
               }
            </ul>
             

        }
      
    </div>
  )
}

export default Load
