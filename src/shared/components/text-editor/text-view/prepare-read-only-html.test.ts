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

function iframeRutube(id: string): string {
  return `<iframe width="1224" height="410" src="https://rutube.ru/play/embed/${id}/?p=token" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>`;
}

function iframeYoutube(id: string): string {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
}

function iframeYoutubeNocookie(id: string): string {
  return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
}

function videoBlock(blockId: string, iframe: string): string {
  return `<div id="ltBlock${blockId}" data-block-id="${blockId}" class="lt-block lt-view lessonVid01 lt-lesson lt-lesson-video"><div class="lt-block-wrapper"><div class="clearfix videoWrapper">${iframe}</div><style>
	.videoWrapper {
		position: relative;
		padding-bottom: 52.25%;
		padding-top: 4%;
		height: 0;
	}
	.videoWrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style></div></div>`;
}

function embedCount(html: string): number {
  return html.split("<video-embed ").length - 1;
}

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

  it("glues a lesson-151 pair in adjacent lt-blocks into one video-embed", () => {
    const html =
      videoBlock("2230418173", iframeRutube("c28db69893ef25c46e0469769ccdefe1")) +
      "/n" +
      videoBlock("2230418175", iframeYoutube("z-7lnp_gfBE"));
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(prepared.includes("/n"), false);
    assert.equal(prepared.includes("<iframe"), false);
    assert.equal(embedCount(prepared), 1);
    assert.match(
      prepared,
      /youtube="https:\/\/www\.youtube\.com\/embed\/z-7lnp_gfBE"/
    );
    assert.match(
      prepared,
      /rutube="https:\/\/rutube\.ru\/play\/embed\/c28db69893ef25c46e0469769ccdefe1\/\?p=token"/
    );
    assert.equal(prepared.includes("ltBlock2230418175"), false);
    assert.equal(prepared.includes("ltBlock2230418173"), true);
  });

  it("does not glue every video in the lecture into one player", () => {
    const html = [
      videoBlock("1", iframeRutube("aaa")),
      videoBlock("2", iframeYoutube("bbb")),
      videoBlock("3", iframeRutube("ccc")),
      videoBlock("4", iframeYoutube("ddd")),
    ].join("/n");
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(embedCount(prepared), 2);
    assert.equal(prepared.includes("<iframe"), false);
    assert.match(prepared, /rutube="https:\/\/rutube\.ru\/play\/embed\/aaa\/\?p=token"/);
    assert.match(prepared, /youtube="https:\/\/www\.youtube\.com\/embed\/bbb"/);
    assert.match(prepared, /rutube="https:\/\/rutube\.ru\/play\/embed\/ccc\/\?p=token"/);
    assert.match(prepared, /youtube="https:\/\/www\.youtube\.com\/embed\/ddd"/);
  });

  it("does not merge two consecutive same-host videos into one player", () => {
    const html = [
      videoBlock("1", iframeYoutube("aaa")),
      videoBlock("2", iframeYoutube("bbb")),
    ].join("/n");
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(embedCount(prepared), 2);
    assert.equal(prepared.includes("rutube="), false);
    assert.match(prepared, /youtube="https:\/\/www\.youtube\.com\/embed\/aaa"/);
    assert.match(prepared, /youtube="https:\/\/www\.youtube\.com\/embed\/bbb"/);
    assert.equal(prepared.includes("ltBlock1"), true);
    assert.equal(prepared.includes("ltBlock2"), true);
  });

  it("wraps lone rutube without a youtube button attr", () => {
    const html = videoBlock("301", iframeRutube("f340c73920e89fc20f7a0c4ac4e2c6ab"));
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(embedCount(prepared), 1);
    assert.equal(prepared.includes("youtube="), false);
    assert.match(
      prepared,
      /rutube="https:\/\/rutube\.ru\/play\/embed\/f340c73920e89fc20f7a0c4ac4e2c6ab\/\?p=token"/
    );
    assert.equal(prepared.includes("<iframe"), false);
  });

  it("wraps youtube-only including youtube-nocookie", () => {
    const html = videoBlock("9", iframeYoutubeNocookie("abcdefghijk"));
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(embedCount(prepared), 1);
    assert.equal(prepared.includes("rutube="), false);
    assert.match(
      prepared,
      /youtube="https:\/\/www\.youtube-nocookie\.com\/embed\/abcdefghijk"/
    );
  });

  it("does not mount a foreign iframe src", () => {
    const html = '<p><iframe src="https://player.vimeo.com/video/123"></iframe></p>';
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(prepared.includes("iframe"), false);
    assert.equal(prepared.includes("video-embed"), false);
    assert.equal(prepared.includes("vimeo"), false);
  });

  it("still strips mime icons and /n when a video pair is in the same html", () => {
    const html =
      FILES_TABLE +
      "/n" +
      videoBlock("1", iframeRutube("aaa")) +
      "/n" +
      videoBlock("2", iframeYoutube("bbb"));
    const prepared = prepareReadOnlyHtml(html);

    assert.equal(prepared.includes("/n"), false);
    assert.equal(prepared.includes("/public/mimetypes/"), false);
    assert.equal(embedCount(prepared), 1);
    assert.match(prepared, /Логи чата\.txt/);
  });
});
