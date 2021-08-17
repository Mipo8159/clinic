import ParticleInput from '../components/ParticleInput';
import { useState } from 'react';
import { isEmpty, isValid } from '../utils/validate';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatchContext } from '../context/Store';

const SignUp = () => {
  const initialState = {
    clinicName: '',
    email: '',
    mobile: '',
    address: '',
    identifier: '',
    password: '',
    cf_password: '',
  };
  const [userData, setUserData] = useState(initialState);
  const {
    clinicName,
    email,
    mobile,
    address,
    identifier,
    password,
    cf_password,
  } = userData;
  const [errors, setErrors] = useState<any>({});

  const dispatch = useDispatchContext();
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    delete errors[name];
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const empty = isEmpty(userData);
    if (empty) return setErrors(empty);

    const valid = isValid(userData);
    if (valid) return setErrors(valid);

    if (!valid || !empty) {
      try {
        await Axios.post('/auth/register', { ...userData });
        const res = await Axios.post('auth/login', { email, password });
        dispatch('LOGIN', res.data);
        router.push('/clinic/admin-panel');
      } catch (err) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='form__order'>
          <form className='name__form' onSubmit={onSubmit}>
            {/* clinic name */}
            <ParticleInput
              classname='mb-4'
              label='კლინიკის დასახელება'
              error={errors.clinicName}
              type='text'
              id='clinic_name'
              placeholder='კლინიკის დასახელება'
              name='clinicName'
              value={clinicName}
              onChange={onChange}
            />

            {/* clinic email */}
            <ParticleInput
              classname='mb-4'
              label='ელფოსტა'
              error={errors.email}
              type='email'
              id='clinic_email'
              placeholder='კლინიკის ელფოსტა'
              name='email'
              value={email}
              onChange={onChange}
            />

            {/* clinic address */}
            <ParticleInput
              classname='mb-4'
              label='მისამართ'
              error={errors.address}
              type='text'
              id='clinic_address'
              placeholder='კლინიკის მისამართი'
              name='address'
              value={address}
              onChange={onChange}
            />

            {/* clinic mobile */}
            <ParticleInput
              classname='mb-4'
              label='მობილური ტელეფონი'
              error={errors.mobile}
              type='text'
              id='clinic_mobile'
              placeholder='კლინიკის კლინიკის დასახელება'
              name='mobile'
              value={mobile}
              onChange={onChange}
            />

            {/* clinic identifier */}
            <ParticleInput
              classname='mb-4'
              label='საიდენთიფიკაციო ნომერი'
              error={errors.identifier}
              type='text'
              id='clinic_identifier'
              placeholder='კლინიკის საიდენთიფიკაციო ნომერი'
              name='identifier'
              value={identifier}
              onChange={onChange}
            />

            {/* clinic password */}
            <ParticleInput
              classname='mb-4'
              label='პაროლი'
              error={errors.password}
              type='password'
              id='clinic_password'
              placeholder='პაროლი'
              name='password'
              value={password}
              onChange={onChange}
            />

            {/* clinic repeat password */}
            <ParticleInput
              classname='mb-4'
              label='გაიმეორეთ პაროლი'
              error={errors.cf_password}
              type='password'
              id='clinic_cf_mobile'
              placeholder='გაიმეორეთ პაროლი'
              name='cf_password'
              value={cf_password}
              onChange={onChange}
            />

            <button aria-label='register' className='sign__up__btn'>
              რეგისტრაცია
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
