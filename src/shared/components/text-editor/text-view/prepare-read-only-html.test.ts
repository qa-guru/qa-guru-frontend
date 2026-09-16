import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { prepareReadOnlyHtml } from "./prepare-read-only-html";

const FILES_TABLE = `<table class="table files-table">
  <tbody>
    <tr>
      <td><img src="/public/mimetypes/txt-icon-48x48.png"></td>
      <td>4 КБ</td>
      <td><a href="https://fs23.getcourse.ru/fileservice/file/download/a.txt"> Логи чата.txt </a></td>
    </tr>
  </tbody>
</table>`;

describe("prepareReadOnlyHtml", () => {
  it("drops /n between HTML tags so lecture blocks do not show the literal", () => {
    assert.equal(
      prepareReadOnlyHtml(
        '</div>/n<div id="ltBlock2230418162" class="lt-block">'
      ),
      '</div><div id="ltBlock2230418162" class="lt-block">'
    );
  });

  it("turns leftover /n into br, including comments without markup", () => {
    assert.equal(
      prepareReadOnlyHtml("1) foo/n2) bar"),
      "1) foo<br>2) bar"
    );
  });

  it("does not invent breaks when the string has no /n", () => {
    assert.equal(
      prepareReadOnlyHtml("1) foo 2) bar 3) baz"),
      "1) foo 2) bar 3) baz"
    );
  });

  it("removes files-table mime icons and keeps the download link", () => {
    const prepared = prepareReadOnlyHtml(FILES_TABLE);

    assert.equal(prepared.includes("<img"), false);
    assert.equal(prepared.includes("/public/mimetypes/"), false);
    assert.match(
      prepared,
      /<a href="https:\/\/fs23\.getcourse\.ru\/fileservice\/file\/download\/a\.txt"> Логи чата\.txt <\/a>/
    );
  });

  it("keeps lesson images that are not files-table mime icons", () => {
    const lessonImg =
      '<p><img src="https://fs23.getcourse.ru/fileservice/file/download/photo.png"></p>';

    assert.equal(prepareReadOnlyHtml(lessonImg), lessonImg);
  });
});
