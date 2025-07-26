import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getImage } from '@/utils/common.util';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const { user } = useSelector(state => state.auth)
  console.log(user);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return (
          <div className="row">
            {user?.techStack.map(({ category, tech }, index) => (
              <div key={index} className="col-12 col-md-4 mb-3">
                <div className="d-flex flex-column gap-2 border rounded-2 p-2 h-100 shadow-sm hover-shadow-sm transition">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      {category == 'Frontend' ?
                        <path
                          d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"
                        ></path>
                        : category == 'Backend' ?
                          <path
                            d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"
                          ></path>
                          : category == 'Frontend' ?
                            <path
                              d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"
                            ></path>
                            : <path
                              d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM80,84A12,12,0,1,1,68,72,12,12,0,0,1,80,84Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,120,84Z"
                            ></path>
                      }
                    </svg>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <h6 className="fw-bold fs-6 mb-0 text-white">{category}</h6>
                    <p className="fs-7 mb-0">{tech}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="d-flex flex-column gap-3">
            {user?.experiences.map(({ company, role, year }, index) => (
              <div key={index} className="row gx-3 align-items-start">
                <div className="col-auto d-flex flex-column align-items-center" style={{ gap: '0.25rem' }}>
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56Z" />
                    </svg>
                  </div>
                  <div style={{ width: '0.5px', backgroundColor: '#314d68', flexGrow: 1, height: '2.5rem' }} />
                </div>
                <div className="col ps-2">
                  <p className="text-white fw-medium mb-1 fs-7">{role} at {company}</p>
                  <p className="mb-0 fs-7" style={{ color: '#90adcb' }}>{year}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="d-flex flex-column gap-3">
            {user?.education.map(({ institution, degree, year }, index) => (
              <div key={index} className="row gx-3 align-items-start">
                <div className="col-auto d-flex flex-column align-items-center" style={{ gap: '0.25rem' }}>
                  <div className="text-white bg-secondary rounded-circle p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Z" />
                    </svg>
                  </div>
                  <div style={{ width: '0.5px', backgroundColor: '#314d68', flexGrow: 1, height: '2.5rem' }} />
                </div>
                <div className="col ps-2">
                  <p className="text-white fw-medium mb-1 fs-7">{degree} - {institution}</p>
                  <p className="mb-0 fs-7" style={{ color: '#90adcb' }}>{year}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <section className="rounded-2 bg-card p-3 p-sm-4">
      <div className="row align-items-start">
        {/* Left: Profile Image */}
        <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
          <img
            className="rounded-3 img-fluid w-100"
            style={{ maxWidth: '300px', objectFit: 'cover' }}
            src={user?.image?.about ? getImage(user?.image?.about) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKkyPRCcJ3R5hjn8LbBgHr1Vtcc-HKvydcLIei4lj8x4CRaeLEp8B84VKc2ckyL5SwLiv5mviUgCF9An5OGRTHaaa35OyMsFHVMTwOZ7wJun60SIway-LxZ4U2AbkpENUmyHFHAM9qZiw0l_dvFgs7C_rBFujEQeGYuHJG7Q6cbFsMl_Y0togE27Dww-vwzvnzJ3IgKSMAaIpRxjfQVn0Ok3mC_O9TW7ljv22Fgo_jIrD3Wnos_7JirmkrPkD9pGsrSpG0rm1gMml4'}
            alt="profile"
          />
        </div>

        {/* Right: About Content */}
        <div className="col-12 col-md-8">
          <h2 className="fw-bold fs-2">About Me</h2>
          <p className="fs-7">
            {user?.description}
          </p>

          {/* Tabs */}
          <ul className="list-unstyled d-flex justify-content-around border-secondary border-bottom border-1 justify-content-md-start mb-3 pb-2 gap-4 flex-wrap">
            <li>
              <p
                className={`about-link position-relative m-0 ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </p>
            </li>
            <li>
              <p
                className={`about-link position-relative m-0 ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </p>
            </li>
            <li>
              <p
                className={`about-link position-relative m-0 ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </p>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="rounded shadow-sm">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
