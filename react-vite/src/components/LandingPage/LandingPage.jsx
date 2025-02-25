import './LandingPage.css';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

const LandingPage = () => { 
    const { setModalContent } = useModal();

    const handleLogin = () => { 
      setModalContent(<LoginFormModal />);
    };

    const handleSignUp = () => { 
        setModalContent(<SignupFormModal />);
    };

    return (
        <div className='landing-container'>
            <div className="landing-content">
                <h1 className="landing-title">Welcome to NowJersey</h1>
                <NavLink to='/items' className="landing-button">Want some Jersey?</NavLink>
                <button onClick={handleLogin} className="landing-button">Log In</button>
                <button onClick={handleSignUp} className="landing-button">Sign Up</button>
            </div>
        </div>
    );
};

export default LandingPage;
