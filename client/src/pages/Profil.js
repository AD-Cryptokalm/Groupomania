import NavBarIcon from '../components/NavBarIcon';
import '../styles/profilPage.css'
import UpdateProfil from '../components/Profil/UpdateProfil';
import { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Log from "../components/Log/Auth";

export default function Profil() {
    const uid = useContext(UidContext);

    return (
        <>
        {uid ? 
        <div className='update-profil'>
            <NavBarIcon/>
            <UpdateProfil/>
        </div>
        : <Log signin={true} signup={false} />}
        </>
        
    );
};