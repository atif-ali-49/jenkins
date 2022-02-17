import React from 'react';
import './Resource.scss';
import ResourcesData from './ResourceData'
function Resource(props:any) {
    return (
        <div className="container main-div">
  <div className="timeline">
    <ul>
        {
    ResourcesData.map((data)=>
    
      <li className="border" key={data.id}>
          <a href="{{url('/donwload_linkpdf')}}" target="_blank" title="Click">
        <div className="timeline-content">
         <h3 className="date">20th may, 2010</h3>
          <h1>{data.title} {(data.type)}</h1>
          <p className="text-center"><img src={data.img}  alt="" className="img-fluid"></img> English.</p>
          
        </div>
        </a>
      </li>
      
    )}
    </ul>
  </div>
</div>
    );
}

export default Resource;