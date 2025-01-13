
import { TextField, Button, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../service/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
    const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values); 
        toast.success('Login successful!');
        navigate('/')
        localStorage.setItem('token', response.data.token)
      } catch (error) {
       console.log(error);
        toast.error(error.response?.data?.message ||" Invalid credentials");
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <Link
            href="#"
            onClick={() => navigate('/register')} // Navigate to signup page
            sx={{ cursor: 'pointer' }}
          >
            Sign up here
          </Link>
        </Typography>
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default Login;
