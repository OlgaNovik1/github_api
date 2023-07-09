import React, { FC } from 'react'
import { IRepo } from '../models/models'

interface RepoCardProps {
    repo: IRepo
}


const RepoCard: FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold'>{repo.full_name}</h2>
                <p>
                    Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers: <span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='text-sm font-thin'>{repo?.description}</p>
            </a>

        </div>
    )
}

export default RepoCard