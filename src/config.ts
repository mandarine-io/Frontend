export type ProjectConfig = {
    serviceConfig: ServiceConfig
}

export type ServiceConfig = {
    backendUrl: string
}

export const projectConfig: ProjectConfig = {
    serviceConfig: {
        backendUrl: import.meta.env.VITE_BACKEND_URL,
    },
}
