import Templates from '@/app/(data)/Templates'
import React, { useEffect } from 'react'
import TemplateCard from './TemplateCard'

function TemplateSection({searchInput}) {
  
  
  return (
    <div className='p-6 md:p-10  grid grid-cols-2 md:grid-col-3 lg:grid-cols-4'>
        {Templates.filter((item, index)=>item.name.toLowerCase().includes(searchInput)).map((item, index)=>{
            return <TemplateCard key={index} item={item}/>
            
        })}
    </div>
  )
}

export default TemplateSection