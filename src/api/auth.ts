import API from "../lib/axios";

export const registerUser = async (email: string, password: string) => {
    return API.post('/auth/register', { email, password })
}

export const loginUser = async (email: string, password: string) => {
    return API.post('/auth/login', { email, password } , {
        withCredentials: true
    })
}

export const getMe = async () => {
    return API.get('/auth/me', {
        withCredentials: true
    })
}

export const logoutUser = async () => {
    return API.post('/auth/logout', {
        withCredentials: true
    })
}

export const userStats = async () => {
    return API.get('/posts/stats', {
        withCredentials: true
    })
}

export const createPost = async (formData: FormData) => {
    return API.post('/posts/create', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    })
}