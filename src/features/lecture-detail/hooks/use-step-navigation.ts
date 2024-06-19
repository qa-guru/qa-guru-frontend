import { Dispatch, SetStateAction, useEffect } from "react";
import { Maybe, TrainingLectureDto } from "api/graphql/generated/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "shared/hooks";

export const useStepNavigation = (
  setActiveStep: (step: number) => void,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();

  const handleNavigation = (step: number, id?: Maybe<string>) => {
    if (id) {
      navigate(`/training/${trainingId}/${id}`);
      setActiveStep(step);
      if (!isDesktop) {
        setOpen(false);
      }
    }
  };

  return { handleNavigation };
};

export const useStepEffect = (
  lectures: Maybe<TrainingLectureDto>[],
  setActiveStep: (step: number) => void
) => {
  const { lectureId } = useParams();

  useEffect(() => {
    const stepIndex = lectures?.findIndex(
      (lecture) => lecture?.lecture?.id === lectureId
    );
    if (stepIndex !== undefined && stepIndex !== -1) {
      setActiveStep(stepIndex);
    }
  }, [lectureId, lectures]);
};
