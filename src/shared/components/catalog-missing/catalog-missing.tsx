import { FC } from "react";
import { Container } from "@mui/material";
import { SearchOff as SearchOffIcon } from "@mui/icons-material";

import ContentNotFound from "shared/components/content-not-found";
import {
  CatalogEntityKind,
  catalogEntityMissingLabel,
} from "shared/helpers";

interface ICatalogMissing {
  kind: CatalogEntityKind;
}

const CatalogMissing: FC<ICatalogMissing> = ({ kind }) => {
  return (
    <Container>
      <ContentNotFound
        text={catalogEntityMissingLabel(kind)}
        icon={<SearchOffIcon color="disabled" sx={{ fontSize: 96 }} />}
      />
    </Container>
  );
};

export default CatalogMissing;
