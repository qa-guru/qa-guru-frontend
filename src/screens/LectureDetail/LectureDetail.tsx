import React from "react";
import {Box, Container, Divider, List, ListItem, Stack, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {LectureByIdQuery} from "../../generated/graphql";
import * as DOMPurify from 'dompurify';

type Props = {
    data:LectureByIdQuery & {content:string};
}
export const LectureDetail:React.FC<Props> = ({data}) =>{
const {lecture} = data;
const content = DOMPurify.sanitize(data.content)
    return (
        <Container maxWidth={"xl"}>
        <Stack spacing={2}>
            <Typography variant="h2">{lecture?.subject}</Typography>
            <Typography variant="h6">{lecture?.description}</Typography>
            <Box width={500} height={500} ><div dangerouslySetInnerHTML={{ __html:content}} /></Box>
            <Divider/>
            <Typography variant="h6">Домашнее задание</Typography>
            <List>
                {lecture?.lectureHomeWorks?.map((work)=>(
                    <ListItem>
                        <Stack>
                            <Box>
                                {work?.subject}
                            </Box>
                            <Box>
                                {work?.description}
                            </Box>
                        </Stack>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Ваш ответ</Typography>
            <TextField
                multiline
                rows={5}
                placeholder="поле для ответа"
                variant="filled"
            />
            <LoadingButton variant="contained">Отправить</LoadingButton>
        </Stack>
        </Container>
    )
}
export default LectureDetail;