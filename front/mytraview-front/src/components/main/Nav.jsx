import { MenuOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItems from './MenuItems'

const Nav = () => {

  const [active, setActive] = useState(false)

  const showMenu = () => {
    setActive(!active)
  }
  
  // TO Do : 로그인 중일 때 메인페이지 상 원페이징 되는 네비바, 로그아웃 중일 때 메인페이지 상 원페이징 되는 네비바
  // 로그인 중일 때 메인 외 모든 페이지 상 링크태그 네비바, 로그아웃 중일 때 메인 외 모든 페이지 상 링크태그 네비바

  return (

    <div className='fixed flex items-center justify-between w-full text-white bg-transparent' style={{zIndex: 9999}}>

      <div className='text-2xl font-bold text-center uppercase'>
        <h1>My <span className='block text-3xl'>Traview</span></h1>
      </div>

      <nav>

        <div className='absolute scale-150 right-6 md:hidden top-6'>
          <MenuOutlined onClick={showMenu} className='scale-150 cursor-pointer'/>
        </div>

        <ul className='hidden gap-8 p-6 uppercase md:flex bg-white/10'>
          <li><a href="#s1">Home</a></li>
          <li><a href="#s2">17도</a></li>
          <li><a href="#s3">Best Reviews</a></li>
          <li><a href="#s4">Event Sale</a></li>
          <li><Link to='/SignInPage'>Sign In</Link></li>
          <li><Link to='/SignUpPage'>Sign Up</Link></li>
          <li><Link to='/UserMyPage'>MyPage</Link></li>
        </ul>

        <MenuItems showMenu={showMenu} active={active} />

      </nav>

    </div>

  )
}

export default Nav