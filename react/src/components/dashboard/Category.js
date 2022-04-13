import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { rolesCategories } from './rolesCategories'

const Category = () => {
  const params = useParams()
  const nav = useNavigate()
  const categories = rolesCategories.find(e=>e.role === params.role)
  useEffect(() => {
    if(!categories) nav("/")
  }, [])
  return !categories ? null : (
    <div>
      YOU ARE A {
        categories.role
      }
      <br />
      YOU HAVE THESE CATEGS: <br />
      <ul>
        {
          categories.categories.map((e,i)=>(
            <li key={i}>{e.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Category