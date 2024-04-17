import React,{useState} from 'react'
import StudentList from '../molecules/StudentList'
import Filter from '../molecules/Filter'
import MainWrapper from '../molecules/MainWrapper'
function Dashboard() {
  return (
    <MainWrapper>
      <StudentList/>
    </MainWrapper>
  )
}

export default Dashboard