import React from 'react'
import { Link } from 'react-router-dom'

export const CityCard = ({ city }) => {
    return (
        <div style={{ margin: '10px', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={city.image} alt={city.name} style={{ height:'300px' ,width: '300px', borderRadius: '10px' }} />
            <h3>{city.name}</h3>
            <Link to={`/${city.name.toLowerCase()}`} style={{ color: '#ff9800' }}>Explore</Link>
        </div>
    )
}
