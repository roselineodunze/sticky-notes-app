import { databases, collections } from "./config";
import { ID } from "appwrite"

const db = {};

collections.forEach((collection) => {
    db[collection.name] = {
        create: async (payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbid,
                collection.id,
                id,
                payload
            )
        },

        update: async (id, payload) => {
            console.log("saving")
            return await databases.updateDocument(
                collection.dbid,
                collection.id,
                id,
                payload
            )
        },

        delete: async (id) => {
            return await databases.deleteDocument(
                collection.dbid,
                collection.id,
                id
            )
        },

        get: async (id) => {
            return await databases.getDocument(
                collection.dbid,
                collection.id,
                id
            )
        },

        list: async (queries) => {
            return await databases.listDocuments(
                collection.dbid,
                collection.id,
                queries
            )
        },
    }
})

export { db }