import React from 'react'
import { useAppSelector } from '../hooks/redux'

const FavoritesPage = () => {
    const { favorites } = useAppSelector(state => state.githubReducer);

    if (favorites.length === 0) return <p className='text-center text-black-600 mt-[85px]'>Репозитории отсутствуют...</p>
    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            <ul className='list-none'>
                {favorites.map(url => (
                    <li key={url}>
                        <a href={url} target="_blank">{url}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FavoritesPage