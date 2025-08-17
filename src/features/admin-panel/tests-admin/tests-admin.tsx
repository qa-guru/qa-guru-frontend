import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Fab,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

import {
  useTestTestGroupsQuery,
  useDeleteTestGroupMutation,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

const TestsAdmin: FC = () => {
  const navigate = useNavigate();

  const { data: testsData, loading, error, refetch } = useTestTestGroupsQuery();
  const [deleteTestGroup] = useDeleteTestGroupMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const handleCreateTest = () => {
    navigate("/tests/create");
  };

  const handleEditTest = (testId: string) => {
    navigate(`/tests/edit/${testId}`);
  };

  const handleDeleteTest = async (testId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот тест?")) {
      try {
        await deleteTestGroup({
          variables: { id: testId },
        });
      } catch (error) {
        console.error("Ошибка при удалении теста:", error);
      }
    }
  };

  if (loading) return <AppSpinner />;
  if (error) return <NoDataErrorMessage />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Тесты</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={() => navigate("/test-attempts")}
          >
            Результаты тестирования
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateTest}
          >
            Создать тест
          </Button>
        </Box>
      </Box>

      {testsData?.testTestGroups && testsData.testTestGroups.length > 0 ? (
        <Grid container spacing={3}>
          {testsData.testTestGroups.map((test) => (
            <Grid item xs={12} md={6} lg={4} key={test?.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      {test?.testName}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditTest(test?.id!)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteTest(test?.id!)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Проходной балл:
                    </Typography>
                    <Chip
                      label={`${test?.successThreshold}%`}
                      size="small"
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    ID: {test?.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Тестов пока нет
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Создайте первый тест для начала работы
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateTest}
            >
              Создать первый тест
            </Button>
          </CardContent>
        </Card>
      )}

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleCreateTest}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default TestsAdmin;
