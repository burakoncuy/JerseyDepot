import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import './HomePage.css'


export default function HomePage() {
  const sessionUser = useSelector(state => state.session.user)



  return (
    <>
      <div id='homePageBanner'>
        <div>
          <img
            id='homePageBannerImage'
            src="https://media.istockphoto.com/id/637332860/photo/multi-sports-proud-players-collage-on-grand-arena.jpg?s=1024x1024&w=is&k=20&c=g26Mxplo-KjOPZjgUOp0QKmPn5RBIkAcWx0vSCel6XM="
          />
        </div>
      </div>

      <div className='homePageImgBoxes'>

          <div className='homePageModal homePageSubsectionLink1'>
            <OpenModalButton
              buttonText='Sign up today'
              modalComponent={<SignupFormModal />}
            />


        
         
            <OpenModalButton
              buttonText='Log in to your account'
              modalComponent={<LoginFormModal />}
            />
          </div>
        </div>

 
    </>
  )

}
