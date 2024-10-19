import React from 'react'
import {GithubOutlined} from '@ant-design/icons'

function Header() {
  return (
    <header className='py-4 px-10 bg-[#001529] border-white border-b-[2px]'>
      <div className='flex items-center space-x-6 p-2'>
      <GithubOutlined  className='scale-[3] text-white'/>
        <h2 className='text-white text-2xl font-bold'>Admin</h2>
      </div>
    </header>
  )
}

export default Header
