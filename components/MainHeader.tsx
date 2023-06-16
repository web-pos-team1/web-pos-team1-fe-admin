import router from 'next/router';
import style from './MainHeader.module.css';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function MainHeader(props: {
    role: string,
    name: string
}) {
    const [role, setRole] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [indicateName, setIndecateName] = useState<string>('');
    useEffect(() => {
        console.log("props.role: ", props.role);
        console.log("props.name: ", props.name);
        if (props.role === undefined || props.name === undefined) {
            return;
        }
        let tempName = '';
        let role = '';
        if (props.role === 'hq') {
            role = '본사관리자'
        } else {
            role = '점장'
        }
        tempName = props.name + '(' + role + ")" + "님";
        console.log("tempName: ", tempName);
        setIndecateName(props.name + '(' + role + ")" + "님");
    }, [props.name])

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

                <li className={style.ssg}>
                    신세계
                </li>
                <li className={style.name}>
                    {indicateName}
                </li>
                
                <li>
                    <span>로그아웃</span>
                </li>
            </ul>
        </header>
)
}
