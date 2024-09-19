import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_ALBUMS } from '../query/Query';
import NavBar from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Album {
    id: string;
    title: string;
}

interface AlbumsProps {
    userId: string;
}

const AlbumPage: React.FC<AlbumsProps> = ({ userId }) => {
    const { data, loading, error } = useQuery<{ albums: Album[] }, { userId: string }>(GET_USER_ALBUMS, {
        variables: { userId },
    });

    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching albums: {error.message}</p>;

    const filteredAlbums = data?.albums.filter((album) =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavBar />
            <h2>Albums</h2>
            <input
                type="text"
                placeholder="Search Albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredAlbums?.length ? (
                    filteredAlbums.map((album) => (
                        <li key={album.id}>{album.title}</li>
                    ))
                ) : (
                    <p>No albums found.</p>
                )}
            </ul>
        </div>
    );
};

export default AlbumPage;
