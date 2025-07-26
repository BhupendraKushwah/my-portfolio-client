
import React from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
} from 'react-hook-form';

import CustomInput from '@/components/common/CustomInput';
import CustomSelectField from '@/components/common/CustomSelect';
import CustomFileInput from '@/components/common/CustomFileInput'
import api from '@/axios.config';
import { login } from '@/redux/slice/auth.slice.js';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getImage } from '@/utils/common.util';

const categoryOptions = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Database', label: 'Database' },
  { value: 'App Development', label: 'App Dev' },
];

const defaultExperience = { company: '', role: '', year: '' };
const defaultEducation = { institution: '', degree: '', year: '' };
const defaultTechStack = { category: '', tech: '' };


const AboutMe = () => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aboutMePhoto: null,
      description: '',
      techStack: [defaultTechStack],
      experiences: [defaultExperience],
      education: [defaultEducation],
    },
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const { fields: techFields, append: addTech, remove: removeTech } =
    useFieldArray({ control, name: 'techStack' });

  const { fields: expFields, append: addExp, remove: removeExp } =
    useFieldArray({ control, name: 'experiences' });

  const { fields: eduFields, append: addEdu, remove: removeEdu } =
    useFieldArray({ control, name: 'education' });

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();

      formData.append('description', value.description);
      formData.append('education', JSON.stringify(value.education));
      formData.append('experiences', JSON.stringify(value.experiences));
      formData.append('techStack', JSON.stringify(value.techStack));

      if (value.aboutMePhoto) {
        formData.append('aboutMePhoto', value.aboutMePhoto);
      }
      const { status, data } = await api.post('/super-admin/about', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status == 200) {
        await dispatch(login(data?.user))
      }
    } catch (error) {
      console.log(error);

    }
  }

   useEffect(() => {
     reset({
       description: user?.description || '',
       techStack: user?.techStack || '',
       experiences: user?.experiences || '',
       education: user?.education || '',
     })
   }, [user])

  // ─── UI ──────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container py-4">
      {/* ============= ABOUT‑ME CARD ============= */}
      <div className="card shadow-sm bg-card mb-4">
        <div className="card-header fw-semibold">About Me</div>
        <div className="card-body">
          <div className="mb-3">
            {user?.image?.about && <a href={getImage(user?.image?.about)} target="_blank"getImage rel="noopener noreferrer">Profile</a>}
            <CustomFileInput
              name="aboutMePhoto"
              placeholder="Upload a profile photo"
              control={control}
              errors={errors.aboutMePhoto}
              className="col-12"
            />
          </div>
          <div className="form-input">
            <textarea name="description" id="description" placeholder='Description' className='form-control'
              {...register('description', {
                required: 'Description is required'
              })}
            ></textarea>
            {errors.description && <span className="text-danger fs-7">{errors.description.message}</span>}
          </div>
        </div>
      </div>

      {/* ============= TECH STACK CARD(S) ============= */}
      <div className="card shadow-sm bg-card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Tech Stack</span>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => addTech(defaultTechStack)}
          >
            Add
          </button>
        </div>

        <div className="card-body">
          {techFields.map((item, idx) => (
            <div key={item.id} className="row g-3 pb-3">
              <div className="col-12 col-md-5">
                <Controller
                  name={`techStack.${idx}.category`}
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <CustomSelectField
                      {...field}
                      control={control}
                      options={categoryOptions}
                      placeholder="Select category *"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-5">
                <CustomInput
                  name={`techStack.${idx}.tech`}
                  placeholder="Tech (e.g. React, Node)"
                  rules={{ required: 'Tech is required' }}
                  control={control}
                  errors={errors?.techStack?.[idx]?.tech}
                  className="col-10 col-md-6"
                />
              </div>

              <div className="col-2 col-md-1 text-end">
                {techFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTech(idx)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= EXPERIENCE CARD(S) ============= */}
      <div className="card shadow-sm bg-card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Experience</span>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => addExp(defaultExperience)}
          >
            Add
          </button>
        </div>

        <div className="card-body">
          {expFields.map((item, idx) => (
            <div key={item.id} className="row g-3 align-items-end pb-1">
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`experiences.${idx}.company`}
                  placeholder="Company *"
                  rules={{ required: 'Company is required' }}
                  control={control}
                  errors={errors?.experiences?.[idx]?.company}
                  className="col-12 col-md-4"
                />
              </div>
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`experiences.${idx}.role`}
                  placeholder="Role *"
                  rules={{ required: 'Role is required' }}
                  control={control}
                  errors={errors?.experiences?.[idx]?.role}
                  className="col-12 col-md-4"
                />
              </div>
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`experiences.${idx}.year`}
                  placeholder="Year *"
                  rules={{ required: 'Year is required' }}
                  control={control}
                  errors={errors?.experiences?.[idx]?.year}
                  className="col-8 col-md-3"
                />
              </div>
              <div className="col-4 col-md-1 text-end">
                {expFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExp(idx)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= EDUCATION CARD(S) ============= */}
      <div className="card shadow-sm bg-card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Education</span>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => addEdu(defaultEducation)}
          >
            Add
          </button>
        </div>

        <div className="card-body">
          {eduFields.map((item, idx) => (
            <div key={item.id} className="row g-3 align-items-end mb-3 border-bottom pb-3">
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`education.${idx}.institution`}
                  placeholder="Institution *"
                  rules={{ required: 'Institution is required' }}
                  control={control}
                  errors={errors?.education?.[idx]?.institution}
                  className="col-12 col-md-4"
                />
              </div>
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`education.${idx}.degree`}
                  placeholder="Degree *"
                  rules={{ required: 'Degree is required' }}
                  control={control}
                  errors={errors?.education?.[idx]?.degree}
                  className="col-12 col-md-4"
                />
              </div>
              <div className="mb-2 col-12 col-lg-4">
                <CustomInput
                  name={`education.${idx}.year`}
                  placeholder="Year *"
                  rules={{ required: 'Year is required' }}
                  control={control}
                  errors={errors?.education?.[idx]?.year}
                  className="col-8 col-md-3"
                />
              </div>

              <div className="col-4 col-md-1 text-end">
                {eduFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEdu(idx)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= SUBMIT ============= */}
      <div className="text-end">
        <button type="submit" className="btn btn-primary px-5 rounded-3">
          Save
        </button>
      </div>
    </form>
  );
};

export default AboutMe;
