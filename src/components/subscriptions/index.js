import React,{useState} from 'react'
import Subscribe from './subscribe'
import SubscriptionInfo from './SubscriptionInfo'
import PauseSubcribe from './PauseSubcribe'
import { RTL } from '../RTL/RTL'


export default function index() {
  let languageDirection = undefined
  if (typeof window !== 'undefined') {
      languageDirection = localStorage.getItem('direction')
  }

    const [subInfo,setSubInfo]= useState('default')

    const activeComponent = () => {
      if(subInfo == 'deails'){
        return  <SubscriptionInfo setSubInfo={setSubInfo} />
      }
      if(subInfo == 'default'){
        return  <Subscribe setSubInfo={setSubInfo}/>
      }
      if(subInfo == 'Pause'){
        return  <PauseSubcribe setSubInfo={setSubInfo}/>
      }
    }


  return (<>
   {/* {subInfo ? <SubscriptionInfo setSubInfo={setSubInfo} /> : <Subscribe setSubInfo={setSubInfo}/> }  */}
   <RTL direction={languageDirection}>{activeComponent()}</RTL>
  </>
  )
}
