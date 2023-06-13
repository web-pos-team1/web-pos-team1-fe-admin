import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import style from './index.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })
/**
 * 로그인 페이지
 */
export default function Home() {
  const router = useRouter();
  const [adminNumber, setAdminNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleAdminNumberChange = (e: any) => {
    setAdminNumber(e.target.value);
  }
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  }
  const handleLoginBtnClick = () => {
    // const url = 'http://localhost:8080/api/v1/hq/login';
    const url = '/api/v1/hq/login';
    const data = {
      "adminNumber": adminNumber,
      "password": password
    }
    axios(
      url,
      {
        data: data
      }
    )
    .then((res) => {
      console.log("res: ", res);
      if (res.status == 200) {
        alert("로그인에 성공했습니다.");
        router.push('/hq-sales');
      }
    })
    .catch((err) => {
      console.log("err: ", err);
    })
  }
  return (
    <>
      {/* <Image
        src={'https://image.ajunews.com/content/image/2018/06/23/20180623235036714018.jpg'}
        width={400}
        height={400}
        alt='main store image' 
      /> */}
      <div className={style.loginBoxWrapper}>
        <div className={style.adminNumberWrapper}>
          <div>
            직원번호
          </div>
          <input 
            type='text' 
            value={adminNumber}
            onChange={handleAdminNumberChange}
            placeholder='직원번호를 입력해주시기바랍니다'
          />
        </div>
        <div className={style.passwordWrapper}>
          <div>
            비밀번호
          </div>
          <input 
            type='password' 
            value={password}
            onChange={handlePasswordChange}
            placeholder='비밀번호를 입력해주시기 바랍니다'
          />
        </div>
        <button onClick={handleLoginBtnClick}>
          로그인
        </button>
      </div>
      
    </>
  )
}
