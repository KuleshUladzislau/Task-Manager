import { createApi} from '@reduxjs/toolkit/query/react'
import {GetTodo, Me, ResponseTaskType, ResponseType, TaskChange} from "./apiTypes";
import {axiosBaseQuery} from "./apiBaseQuery";


export const todosApi = createApi({
    reducerPath: 'todosApi',
    tagTypes: ['Todos', 'User'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
    }),
    endpoints: (build) => ({
        getAllTodos: build.query<GetTodo[], void>({
            query: () => ({url: 'todo-lists', method: 'get'}),
            providesTags: ['Todos']
        }),

        createTodo: build.mutation<ResponseType, string>({
            query: (title: string) => ({
                url: 'todo-lists',
                method: 'POST',
                data: {title},

            }),
            invalidatesTags: ['Todos']
        }),

        removeTodo: build.mutation<ResponseType, string>({
            query: (todolistId: string) => ({
                url: `todo-lists/${todolistId}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Todos']
        }),

        changeTodoTitle: build.mutation<ResponseType, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}`,
                method: 'PUT',
                data: {title}
            }),
            invalidatesTags: ['Todos']
        }),

        getTasks: build.query<ResponseTaskType, {todoId:string,pageSize:number,page:number}>({
            query: ({todoId,pageSize=5,page}) => ({
                url: `todo-lists/${todoId}/tasks?count=${pageSize}&page=${page}`,
                method: 'GET',
                keepUnusedData:true,
            }),
            providesTags: ['Todos']

        }),

        changePageTasks: build.query<ResponseTaskType, {todoId:string,pageSize:number,page:number}>({
            query: ({todoId,pageSize=5,page}) => ({
                url: `todo-lists/${todoId}/tasks?count=${pageSize}&page=${page}`,
                method: 'GET',
                params:{
                    _page : page,
                    _count:pageSize
                }

            }),
            providesTags: ['Todos']

        }),

        createTask: build.mutation<ResponseType, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                data: {title}
            }),
            invalidatesTags: ['Todos']
        }),

        removeTask: build.mutation<ResponseType, { todoListId: string, taskId: string }>({
            query: ({todoListId, taskId}) => ({
                url: `/todo-lists/${todoListId}/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']

        }),

        updateTask: build.mutation<ResponseType, { todoListId: string, taskId: string,item:TaskChange}>({
            query: ({todoListId,  taskId,item}) => ({
                url: `/todo-lists/${todoListId}/tasks/${taskId}`,
                method: 'PUT',
                data: {...item}
            }),
            invalidatesTags: ['Todos']
        }),
        reorderTask:build.mutation<ResponseType,{todoListId:string,taskId:string,putAfterItemId:string}>({
            query:({todoListId,taskId,putAfterItemId})=>({
                url:`todo-lists/${todoListId}/tasks/${taskId}/reorder`,
                method:'PUT',
                data:{putAfterItemId}
            }),
            invalidatesTags:['Todos']
        }),

        me: build.query<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/me',
                method: 'get',
            }),
            providesTags: ['User']

        }),

        login: build.mutation<ResponseType, {
            email: string,
            password: string,
            rememberMe: boolean,
            captcha: string | null
        }>({
            query: ({email, password, rememberMe, captcha = null}) => ({
                url: 'auth/login',
                method: 'POST',
                data: {email, password, rememberMe, captcha}
            }),
            invalidatesTags: ['User', 'Todos'],
        }),

        logout: build.mutation<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',

            }),
            invalidatesTags: ['User'],
        }),

        getCaptcha: build.query<{ url: string }, void>({
            query: () => ({
                url: 'security/get-captcha-url',
                method: 'get'
            }),
            providesTags: ['User']
        })

    }),
})


export const {
    useGetAllTodosQuery,
    useGetTasksQuery,
    useRemoveTodoMutation,
    useCreateTodoMutation,
    useCreateTaskMutation,
    useRemoveTaskMutation,
    useChangeTodoTitleMutation,
    useUpdateTaskMutation,
    useLoginMutation,
    useLogoutMutation,
    useMeQuery  ,
    useGetCaptchaQuery,
    useChangePageTasksQuery,
    useReorderTaskMutation
} = todosApi



