import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import authAtom from '../stores/authAtom'


const UserUpdateMyPage = () => {
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [pw,setPw] = useState("")
    const [role,setRole] = useState("")
    const [email,setEmail] = useAtom(authAtom)
    const [user, setUser] = useState("");

    const onRoleHandler = () => {
        setRole("COMN")
      }
    
      const onRoleHandler2 = () => {
        setRole("SPEC")
      }

    const handleModify = () => {
    
    if(email === "" || pw === "" || name === "") {
        alert("내용 중 공백란이 존재합니다. 다시 확인하시기 바랍니다.")
    } else {
        
        let headers = new Headers({
            "Content-Type": "application/json",
        })

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        if(accessToken && accessToken !== null){
            headers.append("Authorization", "Bearer " + accessToken);
        }

        const req = {
            phone : phone,
            pw : pw,
            role: role,
            name : name
        }
        console.log("수정 정보: "+req);
        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(req)
        };
        
        fetch(`http://localhost:8100/users`, options)
            .then( (res) => res.json() )
            .then( (res) => {
                console.log(res);
                alert("수정이 완료 되었습니다.")
                window.location.href = "/"
            })
            .catch(error => console.error('본인만 수정할 수 있습니다.', error));
        console.log("handleModify clicked button")
        
        }
    }
    const handleEraser = () => {
        
        if(window.confirm("정말로 탈퇴하시겠어요?ㅠㅠ")){
        
        let headers = new Headers({
            "Content-Type": "application/json",
        })

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        if(accessToken && accessToken !== null){
            headers.append("Authorization", "Bearer " + accessToken);
        }
        
        const options = {
            method: 'DELETE',
            headers: headers,
        };

        fetch(`http://localhost:8100/users`, options)
            .then((response) => {
                alert("회원 탈퇴가 정상적으로 완료 되었습니다. 다음에 또 방문해주세요~");
                sessionStorage.removeItem("ACCESS_TOKEN");
                window.location.href = "/" 
            } 
            )
            .catch(response => response.resMessage);
        console.log("handledelete clicked button")
        }else{
            alert("다시 한 번 생각해보세요ㅠㅠ")
        }
       
    }

    useEffect(() => {

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        
        fetch('http://localhost:8100/users/find',{

        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + accessToken
        }
        
      })
        .then( (res) => res.json() )
        .then( (res) => {setUser(res);
         console.log(res)}
        )
        .catch(error => console.error('본인만 수정가능합니다.', error));
    console.log("handleModify clicked button")  
    },[])

  return (
    <div className="opacity-80">
    <div className='max-w-2xl px-6 py-10 m-auto bg-gray-300 rounded-md bg-opacity-20'>
        </div>
        <div>
            <div className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center">
                비밀번호
                <textarea type="text" name="pw" onChange={(e) => {setPw(e.target.value)}} className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center" />
            </div>
        </div>
        <div>
            <div className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center">
                이름
                <textarea type="text" name="name"  placeholder={user.name} onChange={(e) => {setName(e.target.value)}} className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center" />
            </div>
        </div>
        <div>
            <div className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center">
                핸드폰
                <textarea type="text" name="phone"  placeholder={user.phone} onChange={(e) => {setPhone(e.target.value)}} className="items-center w-full h-[400px] text-gray-700 bg-gray-100 rounded-md resize-none mb-9 text-center" />
            </div>
        </div>
        <div><input type="radio" id="common"  name="role" value="common" onClick={onRoleHandler}/>
            <label htmlFor="common">common</label></div>
          <div><input type="radio" id="special" name="role" value="special" onClick={onRoleHandler2}/>
            <label htmlFor="special">special</label>
          </div>
            <button type='delete' onClick={handleEraser} className='float-right px-5 py-2 font-bold text-gray-800 border-2 rounded-lg hover:bg-sky-300'>탈퇴하기</button>
            <button type='modify' onClick={handleModify} className='float-right px-5 py-2 font-bold text-gray-800 border-2 rounded-lg hover:bg-sky-300'>회원정보 수정</button>

    </div>
    )
  }
export default UserUpdateMyPage