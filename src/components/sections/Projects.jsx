import React, { useEffect } from "react";
import SectionTitle from "@/components/common/sectionTitle";
import { useDispatch, useSelector } from 'react-redux';
import { getImage } from '@/utils/common.util';
import { fetchProjects } from '@/redux/slice/project.slice';


export default function ProjectCards() {
  const { projects } = useSelector((state) => state.project)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch])
  return (
    <section className="py-5 text-white" id="projects">
      <div className="container">
        <SectionTitle background='Project' title='My project' />
        <div className="row">
          {projects.map((project, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="bg-dark rounded-4 p-3 h-100 d-flex flex-column shadow"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  background:
                    "linear-gradient(145deg, #0e0e1c, #16162c)",
                  boxShadow: "0 0 15px rgba(102,0,255,0.15)",
                }}
              >
                {/* Image */}
                <div className="rounded-3 overflow-hidden mb-3">
                  <img
                    src={getImage(project.image)}
                    alt={project.title}
                    className="img-fluid"
                    style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  />
                </div>

                {/* Title */}
                <h5 className="fw-bold mb-2">{project.title}</h5>

                {/* Description */}
                <p className="small text-light-emphasis mb-3" style={{ lineHeight: "1.4em" }}>
                  {project.description.slice(0, 120)}...
                </p>

                {/* Tech Stack */}
                <div className="mt-auto">
                  {project.technologies.map((tag, i) => (
                    <span
                      key={i}
                      className="badge text-bg-primary text-uppercase me-2 mb-2"
                      style={{
                        backgroundColor: "#5b21b6",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        borderRadius: "12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
