import { FC, useState } from "react";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { AuthSession, IdpRole } from "api/rest/idp-roles";
import { ARTIFACT_TYPES } from "features/cabinet/constants";
import { httpErrorText, staffIssueBody } from "features/cabinet/staff-issue";
import { ContourStatus, OwnerView } from "features/cabinet/types";
import { vitrineSlice } from "features/cabinet/visibility";
import Cabinet from "features/cabinet/views/cabinet";

const closedTypes = Object.fromEntries(
  ARTIFACT_TYPES.map((type) => [type, false])
) as OwnerView["visibility"]["types"];

const FIXTURE: OwnerView = {
  handle: "qgp5cli",
  visibility: { profilePublic: false, types: closedTypes },
  github: {
    org: "autotests-cloud",
    slug: "alice-app-tests",
    visibility: "private",
  },
  jenkins: {
    job: "alice-app-tests-freestyle",
    jobUrl: "https://jenkins.qa.guru/job/alice-app-tests-freestyle/",
  },
  testops: { projectId: 42, url: "https://allure.qa.guru/project/42" },
};

function previewSession(role: string | null): AuthSession | undefined {
  if (role !== "staff" && role !== "mentor") {
    return undefined;
  }

  const idpRole: IdpRole = role;

  return {
    username: "teacher",
    role: idpRole,
    groups: [idpRole === "staff" ? "/staff" : "/mentors"],
    auth: "preview",
  };
}

const CabinetPreviewPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [owner, setOwner] = useState<OwnerView>(FIXTURE);
  const [staffIssue, setStaffIssue] = useState<ContourStatus | null>(null);
  const [staffIssueError, setStaffIssueError] = useState<string | null>(null);
  const session = previewSession(searchParams.get("role"));

  return (
    <Container>
      <Cabinet
        loading={false}
        saving={false}
        error={null}
        owner={owner}
        preview={vitrineSlice(owner)}
        session={session}
        onToggleMaster={(profilePublic) => {
          setOwner({
            ...owner,
            visibility: { ...owner.visibility, profilePublic },
          });
        }}
        onToggleType={(type, on) => {
          setOwner({
            ...owner,
            visibility: {
              ...owner.visibility,
              types: { ...owner.visibility.types, [type]: on },
            },
          });
        }}
        onIssueContour={() => undefined}
        issuing={false}
        staffIssue={staffIssue}
        staffIssueError={staffIssueError}
        onStaffIssueContour={(input) => {
          const body = staffIssueBody(input);

          if (!body.email.includes("@")) {
            setStaffIssue(null);
            setStaffIssueError(httpErrorText(400, { message: "email required" }));
            return;
          }

          setStaffIssueError(null);
          setStaffIssue({
            status: "queued",
            handle: body.handle,
            courseId: body.courseId,
            staffIssue: true,
          });
        }}
      />
    </Container>
  );
};

export default CabinetPreviewPage;
