import { Client, Databases, Account } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID)

const databases = new Databases(client)
// const account = new Account(client)

const collections = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_NOTES_ID,
        dbid: import.meta.env.VITE_DATABASE_ID,
    }
]

export { client, databases, collections }