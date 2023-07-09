import React, { FC, useState } from 'react'
import { IRepo } from '../models/models'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

interface RepoCardProps {
    repo: IRepo
}


const RepoCard: FC<RepoCardProps> = ({ repo }) => {
    const { favorites } = useAppSelector(state => state.githubReducer)
    const { addToFavorites, deleteInFavorites } = useActions();

    const [isFavorites, setIsFavorites] = useState(favorites.includes(repo.html_url))

    const addToFaforite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToFavorites(repo.html_url)
        setIsFavorites(true)
    }

    const deleteFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        deleteInFavorites(repo.html_url)
        setIsFavorites(false)

    }

    return (
        <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold'>{repo.full_name}</h2>
                <p>
                    Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers: <span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='text-sm font-thin'>{repo?.description}</p>
                {!isFavorites && <button
                    onClick={(e) => addToFaforite(e)}
                    className='py-2 mr-2 px-4 mt-2 bg-yellow-400 rounded hover:shadow-md transition-all'>
                    ADD TO FAVORITES
                </button>}
                {isFavorites && <button
                    onClick={(e) => deleteFavorite(e)}
                    className='py-2 px-4 mt-2 bg-teal-400 rounded hover:shadow-md transition-all'>
                    DELETE
                </button>}
            </a>

        </div>
    )
}

export default RepoCard