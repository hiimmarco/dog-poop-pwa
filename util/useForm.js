import { useEffect, useState } from 'next';

const useForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { handleChange };
};

export default useForm;
