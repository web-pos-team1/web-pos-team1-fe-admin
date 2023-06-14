import router from 'next/router';
import style from './MainHeader.module.css';
import Image from 'next/image'

export default function MainHeader() {

    return (
        <header className={style.header}>
            <ul>
                <li>
                    <Image
                    src="/images/mainLogo.png"
                    alt="arrowLeft"
                    className={style.img}
                    width={30}
                    height={30}
                    />
                </li>

                <li>
                    신세계
                </li>

                <li>
                    <span>로그아웃</span>
                </li>
            </ul>
        </header>
)
}
