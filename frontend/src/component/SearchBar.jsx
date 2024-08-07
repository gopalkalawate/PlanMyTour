import React from 'react'


export const SearchBar = ({onSearch}) => {
  return (
    <div style={{ padding: '20px', background: '#0a75ad', color: '#fff' }}>
        <input
        type="text"
        placeholder="Search cities..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '10px', width: '80%', borderRadius: '5px' }}
      />
    </div>
  )
}
