import React from 'react'
import ViewStores from '../ViewStore/ViewStores'
import ViewUsers from '../ViewUser/ViewUsers'


function Home() {
  return (
    <div><ViewUsers/>
    <h4 style={{margin: 15}}>Đơn hàng cần giải quyết</h4>
    </div>
  )
}

export default Home