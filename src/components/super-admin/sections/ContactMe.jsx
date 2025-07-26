import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/common/CustomInput';
import { login } from '@/redux/slice/auth.slice.js';
import  api from '@/axios.config.js';

const ContactMe = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onSubmit = async (value) => {
    try {
      const { status, data } = await api.post('/super-admin/contact', value);
      if (status == 200) {
        await dispatch(login(data?.user))
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    reset({
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    })
  }, [user])
  return (
    <div className="container py-4">
      <div className="card bg-card shadow-sm">
        <div className="card-header fw-semibold">About Me</div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
            {/* Email */}
            <CustomInput
              name="email"
              type="email"
              placeholder="Enter your email address"
              label="Email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: 'Enter a valid email',
                },
              }}
              control={control}
              errors={errors.email}
              className="col-12 col-md-6"
            />

            {/* Phone */}
            <CustomInput
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              label="Phone Number"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Enter a valid phone number',
                },
              }}
              control={control}
              errors={errors.phone}
              className="col-12 col-md-6"
            />

            {/* Address (textarea) */}
            <CustomInput
              name="address"
              placeholder="Enter your physical address"
              label="Address"
              as="textarea"
              rows={4}
              rules={{ required: 'Address is required' }}
              control={control}
              errors={errors.address}
              className="col-12"
            />

            {/* Submit Button */}
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
                Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
