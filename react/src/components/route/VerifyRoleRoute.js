import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import {ProtectedRoute} from "./ProtectedRoute"

export const  VerifyRoleRoute= ({Component}) => {
    const nav = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('kind') !== role) {
            nav("/")
        }
    }, [])
  return  <ProtectedRoute Component={ Component } />
}
