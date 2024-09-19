import { useQuery } from "@apollo/client";
import { GET_COMMENTS, GET_TODO, GET_USER_POST_BY_ID } from "../query/Query";

export const useComment =(id: string) => {
    const { data, loading, error } = useQuery(GET_COMMENTS, {
        variables: {id},
    });
    return { data, loading, error }
}