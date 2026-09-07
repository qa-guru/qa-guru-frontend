/** Same keys as provisioning `ArtifactType` (P4). Per-object ACL is not here. */
export const ARTIFACT_TYPES = [
  "github",
  "jenkins",
  "testops",
  "selenoid",
  "jira",
  "confluence",
  "allure",
  "lms_track",
  "lms_certificate",
  "lms_homework",
] as const;

export type ArtifactTypeKey = (typeof ARTIFACT_TYPES)[number];

export const ARTIFACT_LABELS: Record<ArtifactTypeKey, string> = {
  github: "GitHub",
  jenkins: "Jenkins",
  testops: "TestOps",
  selenoid: "Selenoid",
  jira: "Jira",
  confluence: "Confluence",
  allure: "Allure",
  lms_track: "Треки",
  lms_certificate: "Сертификаты",
  lms_homework: "Принятые ДЗ",
};

export const CABINET_PATH = "/cabinet";

export const FORBIDDEN_KEYS = [
  "password",
  "email",
  "token",
  "secret",
  "authorization",
  "cookie",
  "apikey",
  "api_key",
  "access_token",
  "refresh_token",
  "phone",
  "telephone",
] as const;
