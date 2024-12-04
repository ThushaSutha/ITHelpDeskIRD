import React from 'react'
import Error from '../../images/403-Error-Forbidden.png';

function UnauthorizedPage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center w-screen  gap-12 py-8 ">
            <img src={Error} className='w-80' />
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-medium text-center">
                You are not authorized
              </h1>
              <p className="text-xl text-center ">
                You tried to access a page you did not have prior
                authorization for.
              </p>
            </div>
          </div>
    
    </>
  )
}

export default UnauthorizedPage