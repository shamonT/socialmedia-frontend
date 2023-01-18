import { Button, FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'

function EditProfile() {
  return (
    <div><form 
    >
    <FormControl>
      <InputLabel htmlFor="name">Name</InputLabel>
      <Input id="name" value=""  />
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" value="" onChange="" />
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input id="password" type="password" value="" onChange="" />
    </FormControl>
    <Button type="submit" variant="contained" color="primary">
      Update Profile
    </Button>
  </form></div>
  )
}

export default EditProfile