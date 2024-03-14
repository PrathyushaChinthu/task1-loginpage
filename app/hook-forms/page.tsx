'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
//import styles from './page.module.css';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
const signupSchema = z
  .object({
    firstName: z.string().min(3, 'firstName is required').max(15),
    lastName: z.string().min(3, 'lastName is required').max(15),
    email: z.string().email('Email must be a valid email address'),
    password: z.string().min(8, 'password should be atleast 8 chars').max(12),
  })
  .required();
export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Half - Image */}
      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            backgroundImage:
              'url(https://as2.ftcdn.net/v2/jpg/01/19/11/55/1000_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            height: '100%',
          }}
        />
      </Grid>

      {/* Right Half - Login Form */}
      <Grid item xs={12} sm={4}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='right'
          height='100%'
          width='100%'
          p={2}
          sx={{
            border: '2px solid grey',
          }}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography sx={{ mb: 1 }} variant='h3'>
            Welcome
          </Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-around'
            sx={{ mb: 2 }}
          >
            <Typography>Already have an account?</Typography>
            <Link href='/loginPage'>Sign in</Link>
          </Box>
          <TextField
            sx={{ mb: 1 }}
            {...register('firstName')}
            color='primary'
            type='string'
            name='firstName'
            fullWidth
            placeholder='John'
            label='First name'
            helperText={errors?.firstName?.message as any}
            error={Boolean(errors?.firstName?.message)}
          />
          <FormLabel required>Last Name</FormLabel>
          <TextField
            sx={{ mb: 1 }}
            {...register('lastName')}
            color='primary'
            type='string'
            name='lastName'
            fullWidth
            placeholder='Williams'
          />
          <FormHelperText sx={{ mt: 1 }}>
            {errors?.lastName?.message as any}
          </FormHelperText>
          <FormLabel required>Email</FormLabel>
          <TextField
            sx={{ mb: 1 }}
            {...register('email')}
            color='primary'
            type='email'
            name='email'
            fullWidth
            placeholder='abc@gmail.com'
          />
          <FormHelperText sx={{ mt: 1 }}>
            {errors?.email?.message as any}
          </FormHelperText>
          <FormLabel required>Password</FormLabel>
          <TextField
            color='primary'
            {...register('password')}
            type='password'
            name='password'
            fullWidth
            placeholder='......'
          />
          <FormHelperText sx={{ mt: 1 }}>
            {errors?.password?.message as any}
          </FormHelperText>
          <Button
            type='submit'
            style={{ backgroundColor: '#378CE7', flex: '1' }}
            sx={{ mt: 2 }}
            color='primary'
            variant='contained'
          >
            Create account
          </Button>
          <Box sx={{ color: 'red' }}></Box>
        </Box>
      </Grid>
    </Grid>
  );
}
