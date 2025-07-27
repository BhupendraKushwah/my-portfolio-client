import React, { useState, useEffect } from 'react'
import Button from '../common/Button';
import { useSelector } from 'react-redux';
import { getImage } from '@/utils/common.util';
import { Link as ScrollLink } from 'react-scroll';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import api from '@/axios.config';
import toasty from '@/utils/toast.util.jsx';

const Hero = () => {
    const { user, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'auto'
        }
    })

    const downloadResume = async () => {
        let t = toasty.loading('Downloading.....')
         const { data } = await api.get('/common/download-resume', {
            responseType: 'blob', // 👈 This is mandatory
        });

        const blob = new Blob([data], { type: 'application/pdf' });
        toasty.dismiss(t)
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "Bhupendra-Kushwah.pdf"
        document.body.appendChild(a);
        a.click();
    };

    return (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
            <div className="py-3 d-flex flex-column gap-3 d-sm-block d-md-flex w-100">
                <div className="row align-items-center justify-content-between g-4 flex-column-reverse flex-md-row">
                    <div className="col-12 col-md-6">
                        <div className="position-relative">
                            <h1 className="stroke-text d-none d-lg-block"
                                style={{
                                    fontSize: "2.5rem",
                                    color: 'transparent',
                                    letterSpacing: "0.2em",
                                    position: "absolute",
                                    top: "-30%",
                                    left: "-5%",
                                    zIndex: 0,
                                    userSelect: "none",
                                    WebkitTextStroke: '.3px #949dcb38',
                                }}
                            >
                                B <br /> H<br />U<br />P<br />E<br />N<br />D<br />R<br />A
                            </h1>
                            <div className="text-container text-content position-relative z-1">
                                {loading ? (
                                    <>
                                        <Skeleton width={100} height={20} />
                                        <Skeleton width={300} height={40} />
                                        <Skeleton width={200} height={30} />
                                        <Skeleton width={250} height={25} />
                                    </>
                                ) : (
                                    <>
                                        <p className="h6 mb-1">Hello, I'm</p>
                                        <h1 className="display-4 mb-2">{user?.name || 'Name'}</h1>
                                        <p className="h4 fw-bold mb-3">And I'm a <span className="text-primary">{user?.jobTitle || 'Job Title'}</span></p>
                                        <h2 className="mb-2">{user?.brief || 'Brief description'}</h2>
                                    </>
                                )}
                            </div>
                            <div className="list-unstyled d-flex justify-content-around justify-content-md-start text-primary rounded-2 mb-3 p-2 gap-4">
                                {loading ? (
                                    Array(4).fill().map((_, index) => (
                                        <Skeleton key={index} circle width={40} height={40} />
                                    ))
                                ) : (
                                    ["github", "linkedin", "x-twitter", "instagram"].map((platform) => (
                                        <a
                                            key={platform}
                                            href={platform === 'linkedin' ? user?.socialLinks?.linkedIn : platform === 'x-twitter' ? user?.socialLinks?.x : user?.socialLinks?.[platform] || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border border-primary py-1 px-2 transition duration-300 rounded border"
                                        >
                                            <i className={`fa-brands fa-${platform}`}></i>
                                        </a>
                                    ))
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                {loading ? (
                                    <>
                                        <Skeleton width={120} height={40} />
                                        <Skeleton width={120} height={40} />
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={downloadResume}>
                                            <span className="text-white text-decoration-none">Download CV</span>
                                        </Button>
                                        <ScrollLink
                                            className="text-white btn btn-outline-primary rounded-2"
                                            to="contact"
                                            spy={true}
                                            smooth={true}
                                            duration={200}
                                        >
                                            Contact Me
                                        </ScrollLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <div className="my-image h-100 text-center">
                            {loading ? (
                                <Skeleton height={300} width="100%" />
                            ) : (
                                <img
                                    className="img-fluid rounded-3 shadow-sm w-100 h-100"
                                    src={user?.image?.main ? getImage(user?.image?.main) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6-ActAKrj5ecVCl3sXa1y-_6so1TVwCnEK6cXaHe52PZ0zUAHf1Xz7QyNeh7kg2xtm1bckkqqvShRvO7abMCeB7F80yM6AekY92eiuZcs-xgDvf6-p-Y3mJY8NvyEC-vH1HVfvv10KJlKOmCP1faxgJxKg48w_6K9nrRCq9KjCJIzwXOvclqzK5LHr6lnon6Y1FO7ADvqy-8Jt4PskI-isKys-_NkVbNQTLwek_A-bAedE96AWHHUhQAHklnN5mRO2Ggs0Gcmrf22'}
                                    alt="Profile"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default Hero;