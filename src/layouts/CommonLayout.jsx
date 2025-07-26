import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { getAuthenticationToken } from '@/utils/authentication.util';
import Header from '../components/layout/Header';
import { ToastContainer } from 'react-toastify';

const isAuthenticated = getAuthenticationToken();

const CommonLayout = ({ isProtected = false }) => {

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="position-relative">
      <Header />
      <main className="main-container w-100">
        <ToastContainer
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          position="bottom-right"
          newestOnTop
          closeOnClick
          theme="light"
          toastStyle={{ zIndex: 9999 }} // ✅ Inline override
        />
        <Suspense fallback={<div className="d-flex align-items-center justify-content-center">Loading...</div>}>
          <div className="main">
            <Outlet />
          </div>
        </Suspense>
      </main>
    </div>
  );
};


export default CommonLayout;