import React, { useState,useEffect } from 'react';
import { SearchBar } from '../component/SearchBar';
import { CityCard } from '../component/CityCard';
import { trendingCities, allCities } from '../data/cities';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [filteredCities, setFilteredCities] = useState(allCities);

    useEffect(() => {
      setFilteredCities(
        allCities.filter(city =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm]);

    return (
        <div style={{ padding: '20px 10px',width:"100%", background: '#f5f5f5' }}>
            <SearchBar onSearch={setSearchTerm} />

            <section>
                <h2 style={{ color: '#0a75ad' }}>Trending Cities</h2>
                <div style={{ display: 'flex', justifyContent: 'center',flexWrap:"wrap" }}>
                    {trendingCities.map(city => 
                        <CityCard key={city.name} city={city} />
                    )}
                </div>
            </section>

            <section>
                <h2 style={{ color: '#0a75ad' }}>Cities to Visit</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                    {filteredCities.map(city => (
                        <CityCard key={city.name} city={city} />
                    ))}
                </div>
            </section>


        </div>
    )
}

export default HomePage