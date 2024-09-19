import { gql } from "urql";

export const GET_USER = gql`
    query GetUser($id: ID!) {
    user(id: $id) {
    id
    name
    username
    phone
    email
    website
  }
}
`;

export const GET_USER_POSTS = gql`
  query {
   user(id: 1) {
    posts {
      data {
        id
        title
        body
      }
    }
  }
}
`

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
    query GetComments($postId: ID!) {
        comments(postId: $postId) {
            id
            body
            userId
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

export const GET_ALBUMS = gql`
    query {
        albums {
            data {
                id
                title
                userId
            }
        }
    }
`;

export const GET_PHOTOS_BY_ALBUM = gql`
    query GetPhotosByAlbum($albumId: ID!) {
        photos(albumId: $albumId) {
            data {
                id
                title
                url
                thumbnailUrl
            }
        }
    }
`;
