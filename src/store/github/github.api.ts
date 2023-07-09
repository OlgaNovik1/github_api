import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRepo, IUser, ServerResponse } from '../../models/models';
import { response } from 'express';


export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        searchUsers: build.query<IUser[], string>({   //то что приходит в ответ и то что передаем параметром
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    per_page: 10,
                }
            }),
            transformResponse: (response: ServerResponse) => response.items  //в ответе от сервера будут только массив пользователей
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`,
            })
        }),
    })
})


export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;