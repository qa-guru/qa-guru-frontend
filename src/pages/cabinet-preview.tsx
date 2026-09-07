import { FC, useState } from "react";
import { Container } from "@mui/material";

import { ARTIFACT_TYPES } from "features/cabinet/constants";
import { OwnerView } from "features/cabinet/types";
import { vitrineSlice } from "features/cabinet/visibility";
import Cabinet from "features/cabinet/views/cabinet";

const closedTypes = Object.fromEntries(
  ARTIFACT_TYPES.map((type) => [type, false])
) as OwnerView["visibility"]["types"];

const FIXTURE: OwnerView = {
  handle: "alice",
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

const CabinetPreviewPage: FC = () => {
  const [owner, setOwner] = useState<OwnerView>(FIXTURE);

  return (
    <Container>
      <Cabinet
        loading={false}
        saving={false}
        error={null}
        owner={owner}
        preview={vitrineSlice(owner)}
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
      />
    </Container>
  );
};

export default CabinetPreviewPage;
