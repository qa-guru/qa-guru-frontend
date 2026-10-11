import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Alert,
  Button,
  Chip,
  Container,
  CssBaseline,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import { userIdVar, userRolesVar } from "cache";
import { UserRole, useHomeWorkQuery } from "api/graphql/generated/graphql";
import StatusSelect from "features/kanban-mentor/views/status-select/status-select";
import HomeworkAdvisoryDraft from "features/kanban-mentor/views/homework-advisory-draft";
import StudentHomework from "features/kanban-student/containers/homework";
import MentorHomework from "features/kanban-mentor/containers/homework";
import MentorQueue from "features/kanban-mentor/containers/homeworks";
import Comments from "shared/features/comments";
import CommentsPagination from "shared/features/comments-pagination";
import { STATES } from "shared/constants";
import { createCustomTheme, initialSettings } from "theme";

const parameters = new URLSearchParams(window.location.search);
const mentor = parameters.get("role") !== "student";
userIdVar(mentor ? "mentor-1" : "student-1");
userRolesVar([mentor ? UserRole.Mentor : UserRole.Student]);

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache(),
});
const theme = createCustomTheme(initialSettings);

const HomeworkFixture = () => {
  const [homeworkId, setHomeworkId] = useState("hw1");
  const { data, loading } = useHomeWorkQuery({
    variables: { homeWorkId: homeworkId },
    fetchPolicy: "network-only",
  });
  const homework = data?.homeWork;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Alert severity="info">
          Изолированная browser fixture: синтетические данные, API только под
          Playwright. Это не live backend и не учебное исполнение.
        </Alert>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h2">Возврат ДЗ с обратной связью</Typography>
            <Typography data-testid="fixture-role">
              {mentor ? "Синтетический MENTOR-only" : "Синтетический STUDENT"}
            </Typography>
            {parameters.has("switch") && (
              <Button
                onClick={() =>
                  setHomeworkId(homeworkId === "hw1" ? "hw2" : "hw1")
                }
              >
                Переключить ДЗ
              </Button>
            )}
            <Typography data-testid="homework-title" variant="h3">
              {loading ? "Загрузка…" : homework?.lecture?.subject}
            </Typography>
            {homework &&
              (mentor ? (
                <StatusSelect
                  currentStatus={homework.status}
                  homeworkId={homeworkId}
                />
              ) : (
                <Chip
                  data-testid="student-status"
                  label={
                    STATES.find((state) => state.value === homework.status)
                      ?.text
                  }
                />
              ))}
          </Stack>
        </Paper>
        <Paper id="scroll-container" sx={{ p: 3 }}>
          <Comments homeworkId={homeworkId}>
            <CommentsPagination />
          </Comments>
        </Paper>
      </Stack>
    </Container>
  );
};

const HomeworkCycleFixture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = mentor ? "/kanban-mentor" : "/kanban-student";
  const currentHomework = location.pathname.endsWith("/hw2") ? "hw2" : "hw1";

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Alert severity="info">
          Mock-browser evidence: production-компоненты LMS, синтетические данные
          и полностью mocked GraphQL/REST. Не live backend.
        </Alert>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">
              {mentor ? "Очередь ментора" : "Повторная сдача ученика"}
            </Typography>
            {mentor && (
              <Button onClick={() => navigate("/kanban-mentor")}>
                Очередь ментора
              </Button>
            )}
            {parameters.has("switch") && (
              <Button
                onClick={() =>
                  navigate(
                    `${basePath}/${currentHomework === "hw1" ? "hw2" : "hw1"}`
                  )
                }
              >
                Переключить ДЗ
              </Button>
            )}
          </Stack>
        </Paper>
        <Routes>
          <Route
            path="/kanban-student/:lectureId"
            element={<StudentHomework />}
          />
          <Route
            path="/kanban-mentor/:lectureId"
            element={<MentorHomework />}
          />
          <Route path="/kanban-mentor" element={<MentorQueue />} />
        </Routes>
      </Stack>
    </Container>
  );
};

const AdvisoryFixture = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Stack spacing={3}>
      <Alert severity="info">
        Mock-browser evidence: приватный advisory draft и история записей.
        Синтетические данные, GraphQL под Playwright. Не live backend.
      </Alert>
      <Paper sx={{ p: 3 }}>
        {mentor ? (
          <HomeworkAdvisoryDraft homeworkId="hw1" />
        ) : (
          <Typography data-testid="advisory-absent">
            student: приватный блок не рендерится
          </Typography>
        )}
      </Paper>
    </Stack>
  </Container>
);

const cycle = parameters.get("mode") === "cycle";
const advisory = parameters.get("mode") === "advisory";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        maxSnack={1}
      >
        <MemoryRouter
          initialEntries={[
            cycle ? `/kanban-${mentor ? "mentor" : "student"}/hw1` : "/",
          ]}
        >
          <ModalProvider>
            {advisory ? (
              <AdvisoryFixture />
            ) : cycle ? (
              <HomeworkCycleFixture />
            ) : (
              <HomeworkFixture />
            )}
          </ModalProvider>
        </MemoryRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>
);
