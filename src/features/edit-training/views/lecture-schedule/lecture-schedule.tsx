import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import {
  TrainingLectureDto,
  useUpdateTrainingLectureSettingsMutation,
} from "api/graphql/generated/graphql";

interface ILectureSchedule {
  trainingLectures: (TrainingLectureDto | null)[];
  refetch: () => void;
}

const LectureSchedule: FC<ILectureSchedule> = ({
  trainingLectures,
  refetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [editingLectureId, setEditingLectureId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [updateSettings] = useUpdateTrainingLectureSettingsMutation();

  const handleToggleLocking = async (lecture: TrainingLectureDto) => {
    try {
      await updateSettings({
        variables: {
          id: lecture.id!,
          input: {
            lecture: lecture.lecture?.id!,
            locking: !lecture.locking,
          },
        },
        onCompleted: () => {
          enqueueSnackbar(
            `Урок "${lecture.lecture?.subject}" ${
              !lecture.locking ? "заблокирован" : "разблокирован"
            }`,
            { variant: "success" }
          );
          refetch();
        },
        onError: () => {
          enqueueSnackbar("Не удалось изменить настройки урока", {
            variant: "error",
          });
        },
      });
    } catch (error) {
      console.error("Error toggling locking:", error);
    }
  };

  const handleEditDate = (lecture: TrainingLectureDto) => {
    setEditingLectureId(lecture.id!);
    if (lecture.availableFrom) {
      // Backend returns LocalDateTime in format YYYY-MM-DDTHH:mm:ss
      // We need YYYY-MM-DDTHH:mm for datetime-local input
      const localDateTime = lecture.availableFrom.slice(0, 16);
      setSelectedDate(localDateTime);
    } else {
      setSelectedDate("");
    }
  };

  const handleSaveDate = async (lecture: TrainingLectureDto) => {
    try {
      // Convert datetime-local format (YYYY-MM-DDTHH:mm) to LocalDateTime format (YYYY-MM-DDTHH:mm:ss)
      const formattedDate = selectedDate ? `${selectedDate}:00` : null;

      await updateSettings({
        variables: {
          id: lecture.id!,
          input: {
            lecture: lecture.lecture?.id!,
            availableFrom: formattedDate,
          },
        },
        onCompleted: () => {
          enqueueSnackbar("Дата открытия урока обновлена", {
            variant: "success",
          });
          setEditingLectureId(null);
          setSelectedDate("");
          refetch();
        },
        onError: () => {
          enqueueSnackbar("Не удалось обновить дату", { variant: "error" });
        },
      });
    } catch (error) {
      console.error("Error saving date:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingLectureId(null);
    setSelectedDate("");
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Не установлена";
    return dayjs(date).format("DD.MM.YYYY HH:mm");
  };

  const getAvailabilityText = (lecture: TrainingLectureDto) => {
    if (lecture.locking) {
      return "Заблокирован";
    }
    if (!lecture.availableFrom) {
      return "Доступен сразу";
    }
    return lecture.isAvailable
      ? "Доступен"
      : `Доступен с ${formatDate(lecture.availableFrom)}`;
  };

  const getAvailabilityColor = (lecture: TrainingLectureDto) => {
    if (lecture.locking) return "error";
    if (lecture.isAvailable) return "success";
    return "warning";
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <ScheduleIcon fontSize="large" color="primary" />
        <Typography variant="h4">Расписание уроков</Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Здесь вы можете настроить доступность уроков для студентов:
          </Typography>
          <Box component="ul" sx={{ mt: 1 }}>
            <Typography component="li" variant="body2">
              <strong>Дата начала</strong> - урок станет доступен в указанное
              время
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Скрыть урок</strong> - урок будет виден, но недоступен для
              открытия
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Урок</TableCell>
              <TableCell>Дата начала</TableCell>
              <TableCell>Скрыть урок</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingLectures.map((lecture) => (
              <TableRow key={lecture?.id} hover>
                <TableCell>{lecture?.number}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {lecture?.lecture?.subject}
                  </Typography>
                </TableCell>
                <TableCell>
                  {editingLectureId === lecture?.id ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        type="datetime-local"
                        size="small"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        sx={{ minWidth: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleSaveDate(lecture)}
                      >
                        Сохранить
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleCancelEdit}
                      >
                        Отмена
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2">
                        {formatDate(lecture?.availableFrom)}
                      </Typography>
                      <Tooltip title="Изменить дату">
                        <IconButton
                          size="small"
                          onClick={() => handleEditDate(lecture!)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      lecture?.locking
                        ? "Разблокировать урок"
                        : "Заблокировать урок"
                    }
                  >
                    <Switch
                      checked={!!lecture?.locking}
                      onChange={() => handleToggleLocking(lecture!)}
                      color="primary"
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {lecture?.locking ? (
                      <LockIcon color="error" fontSize="small" />
                    ) : lecture?.isAvailable ? (
                      <LockOpenIcon color="success" fontSize="small" />
                    ) : (
                      <ScheduleIcon color="warning" fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={`${getAvailabilityColor(lecture!)}.main`}
                      fontWeight="medium"
                    >
                      {getAvailabilityText(lecture!)}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {trainingLectures.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Нет уроков в курсе. Добавьте уроки для настройки расписания.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LectureSchedule;
