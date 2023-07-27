export type Me = {
    id: number
    email: string
    login: string
}
export type Captcha = {
    url: string
}
export type TaskTypeAPI = {
    description: string
    title: string
    status: number
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskChange = {
    title: string
    description: string
    status: number
    priority: any
    startDate: string
    deadline: string
}


export type ResponseTaskType = {
    items: Array<TaskTypeAPI>
    totalCount: number
    error: string | null
}

export type ResponseAddTask = {
    data: { item: ResponseCreateTask }
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export type ResponseCreateTask = TaskTypeAPI & {
    todoListId: string
}

export type GetTodo = {
    addedDate: string
    id: string
    order: number
    title: string
}


export type ResponseType<T = {}> = {
    data: T
    messages: Array<string>
    resultCode: ResultCode
}


export enum ResultCode {
    Success = 0,
    SomethingWrong = 1,
    Captcha = 10
}

export enum Status {
    New = 0,
    Completed = 1
}
