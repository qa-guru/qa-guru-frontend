import axios, { type AxiosResponse } from "axios";
import { G3_EVIDENCE_URI } from "config";

import { createUrlWithParams } from "shared/utils";

export interface G3EvidenceResponse {
  jobRef: string;
  evidenceJson: string;
  evidenceSig: string;
  detail: string;
}

export default class G3EvidenceService {
  static getEvidence(
    homeWorkId: string,
    jobRef: string
  ): Promise<AxiosResponse<G3EvidenceResponse>> {
    const url = createUrlWithParams(G3_EVIDENCE_URI, { homeWorkId, jobRef });
    return axios({ method: "GET", url });
  }
}
