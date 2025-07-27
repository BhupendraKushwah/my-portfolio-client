import React from 'react'
import { isUserSessionExists, removeAuthenticationToken } from '@/utils/authentication.util';
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Header = () => {
    const { loading } = useSelector(state => state.auth);
    const isSuperAdmin = isUserSessionExists();

    const handleLogout = () => {
        removeAuthenticationToken();
        window.location.href='/'
    }

    return (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
            <header className="header">
                <div className="d-flex align-items-center">
                    {loading ? (
                        <div className="d-flex align-items-center gap-2">
                            <Skeleton circle width={48} height={48} />
                            <Skeleton width={150} height={20} />
                        </div>
                    ) : (
                        <>
                            <div className="header-logo">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_6_319)">
                                        <path
                                            d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                            fill="currentColor"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <p className="m-0 fw-bold">Bhupendra Kushwah</p>
                        </>
                    )}
                </div>

                <div className="header-items">
                    {loading ? (
                        <div className="d-flex align-items-center gap-4 nav-list">
                            {Array(4).fill().map((_, index) => (
                                <Skeleton key={index} width={60} height={20} />
                            ))}
                            <Skeleton circle width={40} height={40} />
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-4">
                            {isSuperAdmin ? (
                                <div className="d-flex align-items-center gap-4 nav-list">
                                    <Link className="nav-link position-relative" to="/dashboard">Home</Link>
                                    <Link className="nav-link position-relative" to="/about">About</Link>
                                    <Link className="nav-link position-relative" to="/project">Projects</Link>
                                    <Link className="nav-link position-relative" to="/contact">Contact</Link>
                                    <Link className="nav-link position-relative" onClick={handleLogout}>Logout</Link>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-4 nav-list">
                                    <ScrollLink
                                        className="nav-link position-relative"
                                        to="hero"
                                        spy={true}
                                        smooth={true}
                                        activeClass='active'
                                        duration={200}
                                        offset={-120}
                                    >
                                        Home
                                    </ScrollLink>
                                    <ScrollLink
                                        className="nav-link position-relative"
                                        to="about"
                                        spy={true}
                                        smooth={true}
                                        activeClass='active'
                                        duration={200}
                                        offset={-120}
                                    >
                                        About
                                    </ScrollLink>
                                    <ScrollLink
                                        className="nav-link position-relative"
                                        to="projects"
                                        spy={true}
                                        smooth={true}
                                        activeClass='active'
                                        duration={200}
                                        offset={-120}
                                    >
                                        Projects
                                    </ScrollLink>
                                    <ScrollLink
                                        className="nav-link position-relative"
                                        to="contact"
                                        spy={true}
                                        smooth={true}
                                        activeClass='active'
                                        duration={200}
                                        offset={-120}
                                    >
                                        Contact
                                    </ScrollLink>
                                </div>
                            )}
                            {/* <div
                                className="d-flex pointer align-items-center justify-content-center overflow-hidden py-2 rounded-circle gap-2 fs-6 fw-bold px-2 custom-bg"
                            >
                                <div className="text-white" data-icon="Sun" data-size="20px" data-weight="regular">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                                    </svg>
                                </div>
                            </div> */}
                        </div>
                    )}
                </div>
                <div className="respo-header-items">
                    {isSuperAdmin && (
                        <div className="d-flex align-items-center gap-4 nav-list" onClick={handleLogout}>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </div>)}
                </div>
            </header>
        </SkeletonTheme>
    )
}

export default Header;