import './LandingPage.css';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logo from '../../../src/logo.png';

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
            <img src={logo} alt="NowJersey Logo" className="landing-logo" />
                <h1 className="landing-title">Welcome to NowJersey</h1>
                <NavLink to='/items' className="landing-button">Jersey?</NavLink>
                <button onClick={handleLogin} className="landing-button">Log In</button>
                <button onClick={handleSignUp} className="landing-button">Sign Up</button>
            </div>
        </div>
    );
};

export default LandingPage;
