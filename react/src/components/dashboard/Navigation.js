import React from 'react'
import { Link } from 'react-router-dom'
import { menuList } from './menuList'

export default function Navigation({toggle}) {
  return (
    <div className={`navigation${toggle ? " active" : ""}`}>
    <ul>
      {menuList.map((e, i) => (
        <li key={i}>
          <Link to={e.link}>
            <span className="icon">
              {e.ion ? (
                <ion-icon name={`${e.ion}-outline`} />
              ) : (
                <i className={e.className} />
              )}
            </span>
            <span className="title">{e.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}
