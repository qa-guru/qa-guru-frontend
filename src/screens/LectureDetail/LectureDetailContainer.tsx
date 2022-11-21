import React, {FC, useEffect} from 'react';
import LectureDetail from "./LectureDetail";
import {useParams} from "react-router-dom";
import {useLectureById} from "../../api/graphql/lecture/lectureById";
import Spinner from "../../shared/ui/Spinner/Spinner";


export const LectureDetailContainer:FC = () => {
    const { lessonId } = useParams();
    const {data, loading } = useLectureById({
    variables:{id:lessonId}
    })
    useEffect(()=>{
        console.log(data)
    },[data])
    if(loading && !data) return <Spinner />
    return <LectureDetail data={data!}/>
}
export default LectureDetailContainer;