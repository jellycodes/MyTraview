import { MenuOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItems from './MenuItems'

const NavOthersAfter = () => {

  const [active, setActive] = useState(false)

  const showMenu = () => {
    setActive(!active)
  }

  const logOut = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
    sessionStorage.removeItem("ACCESS_TOKEN")
    window.location.href ="/"
    }else{
      alert("취소 되었습니다.")
    }
  }

  // TO Do : 로그인 중일 때 메인페이지 상 원페이징 되는 네비바, 로그아웃 중일 때 메인페이지 상 원페이징 되는 네비바
  // 로그인 중일 때 메인 외 모든 페이지 상 링크태그 네비바, 로그아웃 중일 때 메인 외 모든 페이지 상 링크태그 네비바

  return (

    <div className='fixed flex items-center justify-between w-full text-white bg-transparent' style={{ zIndex: 9999 }}>

      <div className='text-2xl font-bold text-center uppercase'>
        <h1>My <span className='block text-3xl'>Traview</span></h1>
      </div>

      <nav>

        <div className='absolute scale-150 right-6 md:hidden top-6'>
          <MenuOutlined onClick={showMenu} className='scale-150 cursor-pointer' />
        </div>

        <ul className='hidden gap-8 p-6 uppercase md:flex bg-white/10'>
          <li><Link to="/">Home</Link></li>
          <li><button onClick={logOut}>Sign Out</button></li>
          <li><Link to='/SignUpPage'>Sign Up</Link></li>
          <li><Link to='/UserMyPage'>MyPage</Link></li>
        </ul>

        <MenuItems showMenu={showMenu} active={active} />

      </nav>

    </div>

  )
}

export default NavOthersAfter