import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {CapitalUsers, Organization, OrganizationAdd, RegionUsers, More} from '../pages'

function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Organization/>}/>
      <Route path='/:id' element={<More/>}/>
      <Route path='/add' element={<OrganizationAdd/>}/>
      <Route path='/:id/edit' element={<OrganizationAdd/>}/>
      <Route path='/capital-users' element={<CapitalUsers/>}/>
      <Route path='/capital-users/:id' element={<More/>}/>
      <Route path='/capital-users/add' element={<OrganizationAdd/>}/>
      <Route path='/capital-users/:id/edit' element={<OrganizationAdd/>}/>
      <Route path='/region-users' element={<RegionUsers/>}/>
    </Routes>
  )
}

export default CustomRoutes
