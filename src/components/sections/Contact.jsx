import React from 'react'
import SectionTitle from '@/components/common/sectionTitle'
import CustomInput from '@/components/common/CustomInput'
import { useForm } from 'react-hook-form'
import api from '@/axios.config.js'
import toasty from '@/utils/toast.util.jsx';
import { useSelector } from 'react-redux';

const Contact = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const { user } = useSelector(state => state.auth)

  const onSubmit = async (value) => {
    try {
      const { status, data } = await api.post('/common/message', value);
      if (status == 200) {

      } else {
        toasty.error('something went wrong !!')
      }
    } catch (error) {

    }
  };

  return (
    <section className="py-5 text-white" id="contact">
      <div className="">
        <SectionTitle background='Contact' title='Contact Me' />
        <div className="row gap-2 w-100">
          <div className="col-lg-4 col-12 card bg-card rounded-1 mx-3">
            <div className="contact-info p-3">
              <div className="contact-name">
                <div className="sm-title">
                  <h3>Email</h3>
                </div>
                <p className='text-secondary'>{user?.email}</p>
              </div>
              <div className="contact-name">
                <div className="sm-title">
                  <h3>Address</h3>
                </div>
                <p className='text-secondary'>{user?.address}</p>
              </div>
              <div className="contact-name">
                <div className="sm-title">
                  <h3>Phone</h3>
                </div>
                <p className='text-secondary'>{user?.phone}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-12 card bg-card rounded-1 mx-3">
            <div className="contact-form p-3">
              <form className='row' onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                  <CustomInput
                    name='name'
                    placeholder='Name *'
                    rules={{ required: 'Name is required' }}
                    control={control}
                    errors={errors.name}
                  />
                </div>
                <div className="col-md-6">
                  <CustomInput
                    name='email'
                    placeholder='Email *'
                    rules={{ required: 'Email is required' }}
                    control={control}
                    errors={errors.email}
                  />
                </div>
                <div className="col-12">
                  <CustomInput
                    name='subject'
                    placeholder='Subject *'
                    rules={{ required: 'Subject is required' }}
                    control={control}
                    errors={errors.subject}

                  />
                </div>
                <div className="col-12">
                  <div className="form-input">
                    <textarea name="message" id="message" placeholder='Your message *' className='form-control'
                      {...register('message', {
                        required: 'Message is required'
                      })}
                    ></textarea>
                    <span className="text-danger fs-7">{errors?.message?.message}</span>
                  </div>
                </div>
                <div className="submit-btn mt-3 d-flex justify-content-end">
                  <button className='rounded-2 btn d-inline-flex align-items-center gap-2 fw-bold btn-light border-0 fs-7' type='submit'>SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
