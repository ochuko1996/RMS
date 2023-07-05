import React from 'react'
import {semester, level, period} from '../../constants/filters'
import { useGetDepartmentQuery } from '../../store/features/departmentSlice'
// import useFetch from '../../hooks/useFetch'

function Filter() {
    
// const DEPARTMENT_URL = '/department'

  const {
    data: departments,
    isLoading
  } = useGetDepartmentQuery()
  return (
    <div className="filter flex justify-between">
              <label htmlFor="department">
                Department: &nbsp;
                <select name="department" >
                  {
                    departments.map(dept=>{ 
                    return <option key={dept._id} value={dept.departmentName}>{dept.departmentName}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="department">
                Semester: &nbsp;
                <select name="semester" >
                  {
                    semester.map(semester=>{ 
                    return <option key={semester.id} value={semester.semester}>{semester.semester}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="level">
                Level: &nbsp;
                <select name="level" >
                  {
                    level.map(level=>{ 
                    return <option key={level.id} value={level.level}>{level.level}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="level">
                Period: &nbsp;
                <select name="level" >
                  {
                    period.map(period=>{ 
                    return <option value={period.period}>{period.period}</option>
                    })
                  }
                </select>
              </label>
              
        </div>
  )
}

export default Filter