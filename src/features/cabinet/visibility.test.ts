import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { OwnerView } from "./types";
import { stripForbidden, vitrineSlice } from "./visibility";

const aliceClosed: OwnerView = {
  handle: "alice",
  visibility: {
    profilePublic: false,
    types: { github: false, jenkins: false, testops: false },
  },
  github: { org: "autotests-cloud", slug: "alice-app-tests", visibility: "private" },
  jenkins: {
    job: "alice-app-tests-freestyle",
    jobUrl: "https://jenkins.qa.guru/job/alice-app-tests-freestyle/",
  },
  testops: { projectId: 42, url: "https://allure.qa.guru/project/42" },
};

describe("vitrineSlice", () => {
  it("closed master is 404-equivalent even with artifacts", () => {
    assert.equal(vitrineSlice(aliceClosed), null);
  });

  it("profile ∧ type — same flags as GET /api/u/{handle}", () => {
    const owner: OwnerView = {
      ...aliceClosed,
      visibility: {
        profilePublic: true,
        types: { github: true, jenkins: false, testops: false },
      },
    };
    const slice = vitrineSlice(owner);

    assert.ok(slice);
    assert.equal(slice.handle, "alice");
    assert.equal(slice.github?.slug, "alice-app-tests");
    assert.equal(slice.jenkins, undefined);
    assert.equal(slice.testops, undefined);
    assert.equal("visibility" in slice, false);
    assert.equal("email" in slice, false);
  });

  it("strips forbidden keys from preview JSON", () => {
    const owner: OwnerView = {
      handle: "alice",
      visibility: { profilePublic: true, types: { github: true } },
      github: { org: "autotests-cloud", email: "hidden@example.com", slug: "alice-app-tests" },
    };
    const slice = vitrineSlice(owner);

    assert.ok(slice?.github);
    assert.equal("email" in slice.github, false);
    assert.equal(slice.github.slug, "alice-app-tests");
  });
});

describe("stripForbidden", () => {
  it("drops email password token from nested objects", () => {
    const cleaned = stripForbidden({
      slug: "x",
      email: "a@b.c",
      nested: { password: "no", job: "ok" },
    }) as Record<string, unknown>;

    assert.equal(cleaned.slug, "x");
    assert.equal("email" in cleaned, false);
    assert.deepEqual(cleaned.nested, { job: "ok" });
  });
});
