
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';


import style from './index.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { mapToBE } from '@/globalFunction/mapToBE';
import Layout from '@/components/layouts/layout';
import { NextPageWithLayout } from './_app';

const inter = Inter({ subsets: ['latin'] });


const Home: NextPageWithLayout = () => {
  
  const router = useRouter();
  const [adminNumber, setAdminNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAdminNumberChange = (e: any) => {
    setAdminNumber(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginBtnClick = () => {
    // const url = 'http://localhost:8080/api/v1/hq/login';
    const url = mapToBE('/api/v1/hq/login');
    const data = {
      "adminNumber" : adminNumber,
      "password": password,
    };

    axios
    (
      url,
      {
        method: 'post',
        data: data
      }
    )
    .then((res) => {
      console.log("res: ", res);
      console.log("res.data.accessToken: ", res.data.accessToken);
      console.log("res.data.refreshToken: ", res.data.refreshToken);
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
      <Head>
        <title>Admin login</title>
        <meta name="description" content="login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.background}>

      <div className={style.overlay}>

      <div className={style.loginBoxWrapper}>

        <div className={style.loginImg}>
          <Image
            src="/images/user.png"
            alt="arrowLeft"
            className={style.img}
            width={83}
            height={83}
          />
        </div>

          <div className={style.idWrapper}>
              <input
                type="text"
                value={adminNumber}
                onChange={handleAdminNumberChange}
                placeholder="직원번호"
              />
          </div>

          <div className={style.passwordWrapper}>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
              />
          </div>
          
          <div onClick={handleLoginBtnClick} className={style.loginBtn}>
            <div className={style.btn}>로그인</div>
          </div>

        </div>
            </div>

            <div className={style.backgroundImg}>
            <Image
              src="/images/ssgStore.png"
              alt="메인 배경 이미지"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            </div>
            
          </div>

    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
        <Layout>
          {page}
        </Layout>    
    </>
  )
}

export default Home
