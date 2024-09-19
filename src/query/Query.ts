import { gql } from "urql";

export const GET_USER = gql`
    query{
        user(id: 1){
            id
            name
            email
            phone
            website
            company
            }    
    }    
`;

export const GET_USER_POST_BY_ID = gql`
    query GetUserPosts($id: ID!) {
        user(id: $id){
            post {
                data{
                    id
                    title
                    body
                }
            }
        }
    }
`;

export const GET_COMMENTS = gql`
    query GET_USER_POSTS($id: ID!){
    comment (id: $id){
        name
        body
        }
    }
`;

export const GET_TODO = gql`
    query GET_TODO($todoId: ID!) {
    todo(id: $todoId){
        id
        user {
            id
            name
            }
        title
        completed
        }
    }
`;

export const GET_USER_ALBUMS = gql`
    query GetUserAlbums($userId: ID!) {
        albums(userId: $userId) {
            id
            title
        }
    }
`;

