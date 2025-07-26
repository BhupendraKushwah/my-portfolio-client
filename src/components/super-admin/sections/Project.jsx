import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/common/CustomInput'
import CustomFileInput from '@/components/common/CustomFileInput'
import CustomSelectField from '@/components/common/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/axios.config'
import { getImage } from '@/utils/common.util';
import { fetchProjects } from '@/redux/slice/project.slice';

const Project = () => {
  const [view, setView] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.auth)
  const { projects } = useSelector((state) => state.project)
  const dispatch = useDispatch();

  const options = user?.techStack
    ?.map(stack => stack.tech.split(',').map(tech => tech.trim()))
    ?.flat()
    ?.map(ele => ({ label: ele, value: ele }));

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();

      formData.append('title', value.title);
      formData.append('description', value.description);
      formData.append('url', value.url);
      formData.append('technologies', JSON.stringify(value.technologies));
      formData.append('image', value.image);
      const { status, data } = await api.post('/super-admin/project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status == 200) {

      }
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch])

  return (
    <div className="card shadow-sm bg-card px-2 py-3  mb-4">
      <div className="text-end mb-3">
        <button
          className="btn btn-outline-primary rounded-3"
          onClick={() => setView((prev) => !prev)}
        >
          {!view ? 'View' : 'Back'}
        </button>
      </div>
      {view ?
        <div className="row">
          {projects.length && projects?.map((project, index) => (
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
        : <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="mb-3 col-md-6 col-12">
            <CustomInput
              name="title"
              placeholder="Enter project title *"
              rules={{ required: 'Project Title is required' }}
              control={control}
              errors={errors.title}
            />
          </div>
          <div className="mb-3 col-md-6 col-12">
            <CustomSelectField
              name="technologies"
              placeholder="technologies"
              isMulti={true}
              control={control}
              options={options || []}
              errors={errors.technologies}
            />
          </div>
          <div className="mb-3 col-12">
            <CustomInput
              name="description"
              placeholder="Write a detailed project description *"
              rules={{ required: 'Project Description is required' }}
              control={control}
              errors={errors.description}
            />
          </div>
          <div className="mb-3 col-12">
            <CustomInput
              name="url"
              type='url'
              placeholder="Enter project URL"
              control={control}
              errors={errors.url}
            />
          </div>
          <div className="mb-3 col-12">
            <CustomFileInput
              name="image"
              control={control}
              label="Image"
              rules={{ required: 'Image is required' }}
              multiple={false}
              darkMode={true}
              className=""
            />
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary rounded-3"
              style={{ minWidth: '84px', maxWidth: '480px', height: '40px', padding: '0 16px' }}
            >
              Save
            </button>
          </div>
        </form>
      }

    </div>
  );
};

export default Project;