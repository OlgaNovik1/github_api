import React, { useEffect, useState } from 'react'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

const HomePage = () => {
    const [search, setSearch] = useState('');
    const debaunced = useDebounce(search);
    const [dropdown, setDropdown] = useState(false);
    const { isError, isLoading, data } = useSearchUsersQuery(debaunced, {
        skip: debaunced.length < 3,
        refetchOnFocus: true,
    });
    const [getUserRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserReposQuery()

    console.log(repos)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleClick = (username: string) => {
        getUserRepos(username)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debaunced.length > 3 && data?.length! > 0)
    }, [debaunced, data])

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600 mt-[85px]'>Произошла ошибка при загрузке данных...</p>}

            <div className='relative w-[560px]'>
                <input
                    value={search}
                    onChange={(event) => handleChange(event)}
                    type='text'
                    className='border py-2 px-4 w-full h-[42px] mb-2 '
                    placeholder='GitHub userName...'
                />

                {dropdown && <ul className='list-none absolute text-center  top-[50px] w-[560px] overflow-y-scroll  max-h-[300px] px-4 shadow-md bg-white'>
                    {isLoading && <p className='text-center text-black-600 mt-[85px]'>Загрузка данных...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleClick(user.login)}
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}
                <div className='container'>
                    {isReposLoading && <p className='text-center text-black-600 mt-[85px]'>Идет загрузка репозиториев...</p>}
                    {repos?.map(repo => (
                        <RepoCard repo={repo} key={repo.id} />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default HomePage