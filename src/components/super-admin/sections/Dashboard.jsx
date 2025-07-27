import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '@/components/common/CustomInput';
import CustomFileInput from '@/components/common/CustomFileInput'
import { login } from '@/redux/slice/auth.slice.js';
import api from '@/axios.config';
import { getImage } from '@/utils/common.util';

const Dashboard = () => {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const { x, linkedIn, github, instagram } = user?.socialLinks || '';
    reset({
      name: user?.name || '',
      jobTitle: user?.jobTitle || '',
      brief: user?.brief || '',
      github,
      x,
      linkedIn,
      instagram
    })
  }, [user])

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();

      // Append regular fields
      formData.append('name', value.name);
      formData.append('jobTitle', value.jobTitle);
      formData.append('brief', value.brief);
      formData.append('github', value.github);
      formData.append('x', value.x);
      formData.append('linkedIn', value.linkedIn);
      formData.append('instagram', value.instagram);

      // Append file fields
      if (value.resume) {
        formData.append('resume', value.resume);
      }

      if (value.profilePicture) {
        formData.append('profilePicture', value.profilePicture);
      }

      const { status, data } = await api.post('/super-admin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status == 200) {
        await dispatch(login(data?.user))
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card shadow-sm bg-card p-3">
        <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
          {/* Full Name */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="name"
              type="text"
              placeholder="Full Name"
              rules={{ required: 'Full name is required' }}
              errors={errors.name}
            />
          </div>

          {/* Job Title */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              rules={{ required: 'Job title is required' }}
              errors={errors.jobTitle}
            />
          </div>

          {/* brief (textarea) */}
          <div className="form-input">
            <textarea name="brief" id="brief" placeholder='Description' className='form-control'
              {...register('brief', {
                required: 'Intro is required'
              })}
            ></textarea>
            {errors.brief && <span className="text-danger fs-7">{errors.brief.message}</span>}
          </div>

          {/* GitHub */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="github"
              type="url"
              placeholder="GitHub Link"
              rules={{ required: 'GitHub link is required' }}
              errors={errors.github}
            />
          </div>

          {/* X / Twitter */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="x"
              type="url"
              placeholder="X Link"
              rules={{ required: 'X link is required' }}
              errors={errors.x}
            />
          </div>

          {/* LinkedIn */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="linkedIn"
              type="url"
              placeholder="LinkedIn Link"
              rules={{ required: 'LinkedIn link is required' }}
              errors={errors.linkedIn}
            />
          </div>

          {/* Instagram */}
          <div className="col-md-6">
            <CustomInput
              control={control}
              name="instagram"
              type="url"
              placeholder="Instagram Link"
              rules={{ required: 'Instagram link is required' }}
              errors={errors.instagram}
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-3 col-md-6">
            {user?.resume && <a href={getImage(user?.resume, 'raw')} target="_blank" rel="noopener noreferrer">Resume</a>}
            <CustomFileInput
              name="resume"
              control={control}
              label="Resume"
              rules={{ required: user?.resume ? false : 'Resume is required' }}
              multiple={false}
              darkMode={true}
              className=""
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="col-md-6">
            {user?.image?.main && <a href={getImage(user?.image?.main)} target="_blank" rel="noopener noreferrer">Profile</a>}
            <CustomFileInput
              control={control}
              name="profilePicture"
              label="Profile"
              placeholder="Upload your profile picture"
            />
          </div>

          {/* Submit */}
          <div className="col-12 text-end">
            <button
              type="submit"
              className="btn btn-primary rounded-3"
              style={{
                minWidth: '120px',
                height: '44px',
                padding: '0 24px',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
