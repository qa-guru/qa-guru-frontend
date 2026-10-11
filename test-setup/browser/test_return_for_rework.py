import argparse
import asyncio
import hashlib
import json
import re
import struct
import tempfile
import traceback
import zlib
from email import policy
from email.parser import BytesParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

from playwright.async_api import async_playwright, expect


ATTACHMENT_NAME = "feedback.txt"
ATTACHMENT_BYTES = b"Synthetic mentor feedback: add a wrong-password assertion.\n"
FEEDBACK = "Добавьте проверку неверного пароля и приложите результат теста."
CORRECTED_ANSWER = "Исправлено: неверный пароль проверен — API 401 и текст ошибки формы."
ANSWER_FILE_NAME = "answer-result.txt"
ANSWER_FILE_BYTES = b"Synthetic result: wrong password API 401; UI error text verified.\n"
FRONTEND = Path(__file__).resolve().parents[2]


def image_fixture():
    def chunk(kind, contents):
        return struct.pack("!I", len(contents)) + kind + contents + struct.pack("!I", zlib.crc32(kind + contents))
    header = struct.pack("!2I5B", 1, 1, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(b"\x00\x20\x80\xc0\xff")) + chunk(b"IEND", b"")


def user_dto(role):
    return {
        "__typename": "UserDto",
        "id": "mentor-1" if role == "MENTOR" else "student-1",
        "firstName": "Synthetic",
        "lastName": "Mentor" if role == "MENTOR" else "Student",
        "avatar": None,
        "rating": {"__typename": "RatingUserDto", "rating": 0},
    }


def homework_dto(homework_id, status="IN_REVIEW"):
    return {
        "__typename": "StudentHomeWorkDto",
        "id": homework_id,
        "status": status,
        "lecture": {
            "__typename": "LectureInfoDto",
            "id": "lecture-1",
            "subject": f"Синтетическое ДЗ {homework_id}",
            "description": "Synthetic fixture",
            "contentHomeWork": "Проверьте неверный пароль",
        },
        "training": {"__typename": "TrainingDto", "id": "training-1", "techStack": "JAVA"},
        "student": user_dto("STUDENT"),
        "mentor": user_dto("MENTOR"),
        "answer": "<p>Synthetic answer</p>",
        "filesHomeWork": [],
        "creationDate": "2026-10-03T12:00:00",
        "updateDate": "2026-10-03T12:01:00",
        "startCheckingDate": "2026-10-03T12:01:00",
        "endCheckingDate": None,
        "contourHandle": None,
        "contourCheckVerdict": None,
        "contourCheckComment": None,
        "contourCheckedAt": None,
        "contourEvidence": None,
    }


class MockApi:
    def __init__(self, *, update_failures=0, status_failures=0, send_delay=0, switch=False, image=False,
                 existing=False, returned=False, save_failures=0, submit_failures=0, save_delay=0,
                 submit_delay=0, submit_status="REVIEW", null_save=False, submitted=False,
                 submit_state_failures=0, save_not_found=False, upload_not_found=False):
        self.attachment_name = "feedback.png" if image else ATTACHMENT_NAME
        self.attachment_bytes = image_fixture() if image else ATTACHMENT_BYTES
        self.attachment_type = "image/png" if image else "text/plain"
        self.homeworks = {"hw1": homework_dto("hw1")}
        if switch:
            self.homeworks["hw2"] = homework_dto("hw2")
        if returned:
            for homework in self.homeworks.values():
                homework["status"] = "NOT_APPROVED"
        if submitted:
            for homework in self.homeworks.values():
                homework["status"] = "REVIEW"
                homework["mentor"] = None
                homework["startCheckingDate"] = None
                homework["endCheckingDate"] = None
        self.comments = {}
        self.files = {}
        self.homework_files = {}
        self.saved_answers = {}
        self.save_failures = save_failures
        self.submit_failures = submit_failures
        self.save_delay = save_delay
        self.submit_delay = submit_delay
        self.submit_status = submit_status
        self.null_save = null_save
        self.submit_state_failures = submit_state_failures
        self.save_not_found = save_not_found
        self.upload_not_found = upload_not_found
        self.tolerated = []
        self.calls = []
        self.update_failures = update_failures
        self.status_failures = status_failures
        self.send_delay = send_delay
        if existing or returned:
            self.files[("comment-1", "file-1")] = ATTACHMENT_BYTES
            self.comments["comment-1"] = {"homeworkId": "hw1", "dto": {
                "__typename": "CommentHomeWorkDto", "id": "comment-1",
                "creator": user_dto("MENTOR"), "creationDate": "2026-10-03T12:02:00",
                "content": f'<p>{FEEDBACK}<file-node href="/homework/comment/comment-1/file/file-1" fileName="{ATTACHMENT_NAME}" data-file-size="59"></file-node></p>',
                "userLike": False, "likes": 0, "children": [],
            }}

    def mutations(self):
        return [call for call in self.calls if call["operation"] in (
            "sendComment", "answerComment", "upload", "updateComment", "notApproved",
            "updateHomework", "sendHomeWorkToCheck", "uploadHomeworkFile", "deleteHomeworkFile",
            "deleteCommentFile"
        )]

    def record(self, role, operation, variables):
        call = {"sequence": len(self.calls) + 1, "role": role,
                "operation": operation, "variables": variables, "result": "confirmed"}
        self.calls.append(call)
        return call

    async def graphql(self, route, role):
        request = route.request
        assert request.method == "POST"
        payload = request.post_data_json
        operation = payload["operationName"]
        variables = payload["variables"]
        call = self.record(role, operation, variables)
        if operation == "homeWork":
            data = {operation: self.homeworks[variables["homeWorkId"]]}
        elif operation == "homeworks":
            assert role == "MENTOR"
            filters = variables.get("filter") or {}
            items = [homework for homework in self.homeworks.values()
                     if (not filters.get("status") or homework["status"] == filters["status"])
                     and (not filters.get("mentorId") or homework["mentor"]["id"] == filters["mentorId"])]
            data = {"homeWorks": {"__typename": "StudentHomeWorksDto", "items": items,
                                  "totalElements": str(len(items))}}
        elif operation == "commentsHomeWorkByHomeWork":
            items = [item["dto"] for item in self.comments.values()
                     if item["homeworkId"] == variables["homeWorkId"] and not item.get("parentId")]
            data = {operation: {"__typename": "PageCommentHomeWorkDto",
                                "items": list(reversed(items)), "totalElements": str(len(items))}}
        elif operation == "user":
            data = {operation: {**user_dto(role), "email": "synthetic@example.invalid",
                                "roles": [role], "git": None, "telegram": None,
                                "stackOverflow": None, "linkedin": None,
                                "creationDate": "2026-10-03T12:00:00", "phoneNumber": None}}
        elif operation == "updateHomework":
            assert role == "STUDENT"
            homework_id = variables["id"]
            content = variables["content"]
            assert homework_id in self.homeworks and self.homeworks[homework_id]["student"]["id"] == "student-1"
            assert "blob:" not in content and "/homework/comment/" not in content
            for owner, file_id in re.findall(r"/homework/([^/]+)/file/([^\"\s<]+)", content):
                assert owner == homework_id and (owner, file_id) in self.homework_files
            if self.save_delay:
                await asyncio.sleep(self.save_delay)
            if self.save_failures:
                self.save_failures -= 1
                return await self.failure(route, call, "updateHomeWork", "Synthetic homework save failure")
            if self.save_not_found:
                self.save_not_found = False
                return await self.failure(route, call, "updateHomeWork", "Object not found",
                                          classification="NOT_FOUND")
            if self.null_save:
                self.null_save = False
                call["result"] = "unconfirmed"
                data = {"updateHomeWork": None}
            else:
                self.homeworks[homework_id]["answer"] = content
                self.homeworks[homework_id]["updateDate"] = "2026-10-04T12:04:00"
                self.saved_answers[homework_id] = content
                data = {"updateHomeWork": self.homeworks[homework_id]}
        elif operation == "sendHomeWorkToCheck":
            assert role == "STUDENT"
            homework_id = variables["homeWorkId"]
            assert self.saved_answers.get(homework_id) == self.homeworks[homework_id]["answer"], "submit without a confirmed save"
            if self.submit_delay:
                await asyncio.sleep(self.submit_delay)
            if self.submit_failures:
                self.submit_failures -= 1
                return await self.failure(route, call, operation, "Synthetic homework submit failure")
            if self.submit_state_failures:
                self.submit_state_failures -= 1
                return await self.failure(route, call, operation, "Invalid homework state",
                                          classification="BAD_REQUEST")
            self.homeworks[homework_id]["status"] = self.submit_status
            self.homeworks[homework_id]["updateDate"] = "2026-10-04T12:05:00"
            self.homeworks[homework_id]["endCheckingDate"] = None
            data = {operation: self.homeworks[homework_id]}
        else:
            assert role == "MENTOR", f"unexpected mutation by {role}"
            if operation in ("sendComment", "answerComment"):
                parent_id = variables.get("parentID")
                homework_id = self.comments[parent_id]["homeworkId"] if parent_id else variables["homeWorkId"]
                assert homework_id in self.homeworks
                if self.send_delay:
                    await asyncio.sleep(self.send_delay)
                comment_id = f"comment-{len(self.comments) + 1}"
                dto = {"__typename": "CommentHomeWorkDto", "id": comment_id,
                       "creator": user_dto(role), "creationDate": "2026-10-03T12:02:00",
                       "content": variables["content"], "userLike": False, "likes": 0, "children": []}
                self.comments[comment_id] = {"homeworkId": homework_id, "dto": dto, "parentId": parent_id}
                if parent_id:
                    self.comments[parent_id]["dto"]["children"].append(dto)
                call["commentId"] = comment_id
                data = {operation: dto}
            elif operation == "updateComment":
                assert variables["id"] in self.comments
                if self.update_failures:
                    self.update_failures -= 1
                    return await self.failure(route, call, operation, "Synthetic content sync failure")
                content = variables["content"]
                assert "blob:" not in content, "server content still has a local blob URL"
                for comment_id, file_id in re.findall(r"/homework/comment/([^/\"\s]+)/file/([^\"\s<]+)", content):
                    assert (comment_id, file_id) in self.files
                    assert comment_id == variables["id"]
                self.comments[variables["id"]]["dto"]["content"] = content
                data = {operation: {"__typename": "CommentHomeWorkDto",
                                    "id": variables["id"], "content": content}}
            elif operation == "notApproved":
                homework_id = variables["homeWorkId"]
                comments = [item["dto"] for item in self.comments.values() if item["homeworkId"] == homework_id]
                assert comments and all("blob:" not in item["content"] for item in comments)
                if self.status_failures:
                    self.status_failures -= 1
                    return await self.failure(route, call, operation, "Synthetic status failure")
                self.homeworks[homework_id]["status"] = "NOT_APPROVED"
                self.homeworks[homework_id]["endCheckingDate"] = "2026-10-03T12:03:00"
                data = {operation: self.homeworks[homework_id]}
            else:
                raise AssertionError(f"unexpected GraphQL operation {operation}")
        homework = data.get("updateHomeWork") or data.get("sendHomeWorkToCheck") or data.get("notApproved")
        if homework:
            call["response"] = {key: homework[key] for key in ("id", "answer", "status", "updateDate")}
        await route.fulfill(status=200, content_type="application/json", body=json.dumps({"data": data}))

    async def failure(self, route, call, operation, message, classification="INTERNAL_ERROR"):
        call["result"] = "rejected"
        await route.fulfill(status=200, content_type="application/json", body=json.dumps({
            "data": {operation: None},
            "errors": [{"message": message, "path": [operation],
                        "extensions": {"classification": classification}}],
        }))

    async def rest(self, route, role, path):
        request = route.request
        match = re.fullmatch(r"/homework/comment/([^/]+)/file(?:/([^/]+))?", path)
        assert match
        comment_id, file_id = match.groups()
        assert comment_id in self.comments
        if request.method == "POST" and file_id is None:
            assert role == "MENTOR"
            content_type = request.headers["content-type"]
            assert content_type.startswith("multipart/form-data; boundary=")
            body = request.post_data_buffer
            message = BytesParser(policy=policy.default).parsebytes(
                f"Content-Type: {content_type}\r\nMIME-Version: 1.0\r\n\r\n".encode() + body
            )
            parts = list(message.iter_parts())
            assert len(parts) == 1
            part = parts[0]
            assert part.get_param("name", header="content-disposition") == "file"
            assert part.get_filename() == self.attachment_name
            assert part.get_content_type() == self.attachment_type
            contents = part.get_payload(decode=True)
            assert contents == self.attachment_bytes
            file_id = f"file-{len(self.files) + 1}"
            self.files[(comment_id, file_id)] = contents
            self.record(role, "upload", {"commentId": comment_id, "fileId": file_id,
                                       "fileName": self.attachment_name, "size": len(contents),
                                       "sha256": hashlib.sha256(contents).hexdigest()})
            await route.fulfill(status=200, content_type="application/json", body=json.dumps({
                "id": file_id, "fileName": self.attachment_name, "contentType": self.attachment_type,
                "size": len(contents), "creationDate": "2026-10-03T12:02:01",
            }))
        elif request.method == "GET" and file_id:
            contents = self.files[(comment_id, file_id)]
            self.record(role, "getFile", {"commentId": comment_id, "fileId": file_id})
            await route.fulfill(status=200, content_type=self.attachment_type, body=contents,
                                headers={"Content-Disposition": f'attachment; filename="{self.attachment_name}"'})
        elif request.method == "DELETE" and file_id:
            assert role == "MENTOR"
            assert (comment_id, file_id) in self.files
            self.record(role, "deleteCommentFile", {"commentId": comment_id, "fileId": file_id})
            del self.files[(comment_id, file_id)]
            await route.fulfill(status=200, body=b"")
        else:
            raise AssertionError(f"unexpected REST operation {request.method} {path}")

    async def homework_rest(self, route, role, path):
        match = re.fullmatch(r"/homework/([^/]+)/file(?:/([^/]+))?", path)
        assert match
        homework_id, file_id = match.groups()
        assert homework_id in self.homeworks
        request = route.request
        if request.method == "POST" and file_id is None:
            assert role == "STUDENT"
            content_type = request.headers["content-type"]
            assert content_type.startswith("multipart/form-data; boundary=")
            message = BytesParser(policy=policy.default).parsebytes(
                f"Content-Type: {content_type}\r\nMIME-Version: 1.0\r\n\r\n".encode() + request.post_data_buffer
            )
            parts = list(message.iter_parts())
            assert len(parts) == 1
            part = parts[0]
            assert part.get_param("name", header="content-disposition") == "file"
            assert part.get_filename() == ANSWER_FILE_NAME
            contents = part.get_payload(decode=True)
            assert contents == ANSWER_FILE_BYTES
            if self.upload_not_found:
                self.upload_not_found = False
                self.tolerated.append(request.url)
                rejected = self.record(role, "uploadHomeworkFile", {
                    "homeWorkId": homework_id, "fileName": ANSWER_FILE_NAME})
                rejected["result"] = "rejected"
                await route.fulfill(status=404, content_type="application/json",
                                    body=json.dumps({"message": "Object not found"}))
                return
            file_id = f"answer-file-{len(self.homework_files) + 1}"
            self.homework_files[(homework_id, file_id)] = contents
            dto = {"__typename": "StudentHomeWorkFilesDto", "id": file_id, "fileName": ANSWER_FILE_NAME,
                   "contentType": "text/plain", "size": len(contents), "creationDate": "2026-10-04T12:03:01"}
            self.homeworks[homework_id]["filesHomeWork"].append(dto)
            self.record(role, "uploadHomeworkFile", {"homeWorkId": homework_id, "fileId": file_id,
                        "fileName": ANSWER_FILE_NAME, "sha256": hashlib.sha256(contents).hexdigest()})
            await route.fulfill(status=200, content_type="application/json", body=json.dumps(dto))
        elif request.method == "GET" and file_id:
            self.record(role, "getHomeworkFile", {"homeWorkId": homework_id, "fileId": file_id})
            await route.fulfill(status=200, content_type="text/plain", body=self.homework_files[(homework_id, file_id)],
                                headers={"Content-Disposition": f'attachment; filename="{ANSWER_FILE_NAME}"'})
        else:
            raise AssertionError(f"unexpected homework REST operation {request.method} {path}")


class BrowserCase:
    def __init__(self, browser, base_url, artifacts, name, **mock_options):
        self.browser = browser
        self.base_url = base_url.rstrip("/")
        self.origin = urlsplit(self.base_url)
        self.artifacts = artifacts
        self.name = name
        self.api = MockApi(**mock_options)
        self.contexts = []
        self.pages = []
        self.errors = []
        self.warnings = []
        self.requests = []
        self.blocked_tooling_websockets = []
        self.layout_metrics = []

    async def page(self, role="MENTOR", switch=False, width=1280, cycle=False):
        context = await self.browser.new_context(viewport={"width": width, "height": 1000},
                                                 service_workers="block", accept_downloads=True)
        self.contexts.append(context)
        await context.route("**/*", lambda route: self.route(route, role))
        await context.route_web_socket("**/*", self.websocket)
        page = await context.new_page()
        self.pages.append(page)
        page.on("pageerror", lambda error: self.errors.append({"type": "pageerror", "message": str(error)}))
        page.on("console", self.console)
        page.on("response", lambda response: self.response(response))
        role_parameter = "student" if role == "STUDENT" else "mentor"
        await page.goto(f"{self.base_url}/?role={role_parameter}" + ("&switch=1" if switch else "") + ("&mode=cycle" if cycle else ""))
        if cycle:
            await expect(page.get_by_role("heading", name="Синтетическое ДЗ hw1", exact=True)).to_be_visible()
            file_uris = await page.evaluate(
                "async (path) => { const config = await import(path); return [config.HOMEWORK_FILE_UPLOAD_URI, config.HOMEWORK_FILE_GET_URI, config.HOMEWORK_FILE_DELETE_URI]; }",
                f"/@fs{FRONTEND}/src/config.ts",
            )
            assert file_uris == ["/homework/:homeWorkId/file", "/homework/:homeWorkId/file/:fileId", "/homework/:homeWorkId/file/:fileId"], "student file endpoints must be mocked and same-origin"
        else:
            await expect(page.get_by_test_id("homework-title")).to_have_text("Синтетическое ДЗ hw1")
        await expect(page.get_by_text("Добавить комментарий", exact=True)).to_be_visible()
        return page

    def console(self, message):
        item = {"type": message.type, "message": message.text, "location": message.location}
        if message.type == "error":
            if item["location"].get("url") in self.api.tolerated:
                return
            self.errors.append(item)
        elif message.type == "warning":
            self.warnings.append(item)

    def response(self, response):
        if response.status >= 400 and response.url not in self.api.tolerated:
            self.errors.append({"type": "http", "status": response.status, "url": response.url})

    async def websocket(self, websocket):
        url = urlsplit(websocket.url)
        if url.scheme == "ws" and url.netloc == self.origin.netloc and url.path == "/":
            self.blocked_tooling_websockets.append(websocket.url)
        else:
            self.errors.append({"type": "unexpected-websocket", "url": websocket.url})
        await websocket.close(code=1008, reason="browser fixture denies websocket connections")

    async def route(self, route, role):
        request = route.request
        url = urlsplit(request.url)
        path = unquote(url.path)
        self.requests.append({"method": request.method, "url": request.url})
        try:
            assert (url.scheme, url.netloc) == (self.origin.scheme, self.origin.netloc), f"external request {request.url}"
            if path == "/graphql":
                await self.api.graphql(route, role)
            elif path.startswith("/homework/comment/"):
                await self.api.rest(route, role, path)
            elif path.startswith("/homework/"):
                await self.api.homework_rest(route, role, path)
            else:
                source_paths = ("/node_modules/", "/@vite/", "/@react-refresh",
                                f"/@fs{FRONTEND}/src/", f"/@fs{FRONTEND}/node_modules/")
                assert request.method == "GET" and (path in ("/", "/app.tsx") or path.startswith(source_paths)), \
                    f"unexpected request {request.method} {request.url}"
                await route.continue_()
        except Exception as error:
            self.errors.append({"type": "network-guard", "message": str(error), "url": request.url})
            await route.abort("blockedbyclient")

    async def screenshot(self, page, name):
        await page.screenshot(path=str(self.artifacts / f"{name}.png"), full_page=True,
                              animations="disabled", caret="hide")

    async def check(self):
        for page in self.pages:
            if not page.is_closed():
                await page.wait_for_load_state("networkidle")
        assert not self.errors, json.dumps(self.errors, ensure_ascii=False, indent=2)
        assert not self.warnings, json.dumps(self.warnings, ensure_ascii=False, indent=2)

    async def close(self):
        for context in self.contexts:
            await context.close()

    def report(self):
        return {"case": self.name, "apiCalls": self.api.calls, "errors": self.errors,
                "warnings": self.warnings, "requestCount": len(self.requests),
                "blockedToolingWebsockets": self.blocked_tooling_websockets,
                "layoutMetrics": self.layout_metrics,
                "homeworks": self.api.homeworks, "comments": self.api.comments,
                "fileCount": len(self.api.files), "homeworkFileCount": len(self.api.homework_files)}


async def feedback_dialog(page):
    await page.get_by_role("combobox").click()
    await page.get_by_role("option", name="Не принято", exact=True).click()
    dialog = page.get_by_role("dialog")
    await expect(dialog).to_be_visible()
    await fill_feedback(dialog)
    return dialog


async def fill_feedback(scope, attachment_name=ATTACHMENT_NAME):
    editor = scope.locator('.ProseMirror[contenteditable="true"]')
    await editor.fill(FEEDBACK)
    await editor.press("End")
    await editor.press("Space")
    async with scope.page.expect_file_chooser() as chooser_event:
        await scope.get_by_role("button", name="Прикрепить файл", exact=True).click()
    chooser = await chooser_event.value
    await chooser.set_files({"name": attachment_name, "mimeType": "text/plain", "buffer": ATTACHMENT_BYTES})
    await expect(scope.get_by_text(attachment_name, exact=True)).to_be_visible()


async def confirm(dialog, retry=False):
    await dialog.get_by_role("button", name="Повторить возврат" if retry else "Отправить и вернуть", exact=True).click()


async def assert_returned(page):
    await expect(page.get_by_role("dialog")).to_have_count(0)
    await expect(page.get_by_role("combobox")).to_contain_text("Не принято")


async def success(case):
    mentor = await case.page()
    student = await case.page("STUDENT")
    await expect(student.get_by_test_id("student-status")).to_have_text("На проверке")
    dialog = await feedback_dialog(mentor)
    await case.screenshot(mentor, "01-dialog-with-attachment")
    await confirm(dialog)
    await assert_returned(mentor)
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "notApproved"]
    await case.screenshot(mentor, "02-mentor-returned")
    await student.reload()
    await expect(student.get_by_test_id("student-status")).to_have_text("Не принято")
    read_only = student.locator('.ProseMirror[contenteditable="false"]')
    await expect(read_only).to_contain_text(FEEDBACK)
    link = read_only.get_by_role("link", name=ATTACHMENT_NAME, exact=True)
    await expect(link).to_be_visible()
    assert await link.evaluate("link => link.closest('li') !== null && link.closest('ul').previousElementSibling.textContent === 'Вложения'")
    await case.screenshot(student, "03-student-comment-and-attachment")
    async with student.expect_download() as download_event:
        await link.click()
    download = await download_event.value
    assert download.suggested_filename == ATTACHMENT_NAME
    assert Path(await download.path()).read_bytes() == ATTACHMENT_BYTES


async def sync_failure(case):
    page = await case.page()
    dialog = await feedback_dialog(page)
    await confirm(dialog)
    await expect(dialog.get_by_text("Комментарий сохранён, но файлы или содержимое не синхронизированы. Повторите.")).to_be_visible()
    await expect(dialog.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(FEEDBACK)
    await expect(dialog.get_by_text(ATTACHMENT_NAME, exact=True)).to_be_visible()
    assert case.api.homeworks["hw1"]["status"] == "IN_REVIEW"
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment"]
    await case.screenshot(page, "04-recoverable-sync-failure")
    await confirm(dialog, retry=True)
    await assert_returned(page)
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "updateComment", "notApproved"]
    assert len(case.api.comments) == len(case.api.files) == 1


async def status_failure(case):
    page = await case.page()
    dialog = await feedback_dialog(page)
    await confirm(dialog)
    await expect(dialog.get_by_text(re.compile("Комментарий сохранён, но статус не изменён"))).to_be_visible()
    assert case.api.homeworks["hw1"]["status"] == "IN_REVIEW"
    await case.screenshot(page, "05-recoverable-status-failure")
    await confirm(dialog, retry=True)
    await assert_returned(page)
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "notApproved", "notApproved"]
    assert len(case.api.comments) == len(case.api.files) == 1


async def cancel(case):
    page = await case.page()
    dialog = await feedback_dialog(page)
    await dialog.get_by_role("button", name="Отмена", exact=True).click()
    await expect(page.get_by_role("dialog")).to_have_count(0)
    await expect(page.get_by_role("combobox")).to_contain_text("На проверке")
    assert not case.api.mutations()
    assert not case.api.comments and not case.api.files


async def double_click(case):
    page = await case.page()
    dialog = await feedback_dialog(page)
    await dialog.get_by_role("button", name="Отправить и вернуть", exact=True).dblclick(force=True)
    await assert_returned(page)
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "notApproved"]
    assert len(case.api.comments) == len(case.api.files) == 1


async def switch_homework(case):
    page = await case.page(switch=True)
    dialog = await feedback_dialog(page)
    await confirm(dialog)
    await expect(dialog.get_by_role("button", name="Отправить и вернуть", exact=True)).to_be_disabled()
    await page.get_by_role("button", name="Переключить ДЗ", exact=True).dispatch_event("click")
    await expect(page.get_by_test_id("homework-title")).to_have_text("Синтетическое ДЗ hw2")
    await asyncio.sleep(0.8)
    await expect(page.get_by_role("combobox")).to_contain_text("На проверке")
    await expect(page.get_by_role("dialog")).to_have_count(0)
    assert case.api.homeworks["hw2"]["status"] == "IN_REVIEW"
    assert all(item["homeworkId"] == "hw1" for item in case.api.comments.values())
    await expect(page.locator('.ProseMirror[contenteditable="false"]')).to_have_count(0)
    second_dialog = await feedback_dialog(page)
    await confirm(second_dialog)
    await assert_returned(page)
    assert len(case.api.comments) == len(case.api.files) == 2
    assert [item["homeworkId"] for item in case.api.comments.values()] == ["hw1", "hw2"]


async def ordinary_comment_retry(case):
    page = await case.page()
    regular = page.locator("form").filter(has=page.locator('.ProseMirror[contenteditable="true"]'))
    await fill_feedback(regular)
    await regular.get_by_role("button", name="Отправить", exact=True).click()
    await expect(regular.get_by_text(re.compile("Комментарий сохранён, но файлы или содержимое не синхронизированы"))).to_be_visible()
    await expect(regular.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(FEEDBACK)
    await regular.get_by_role("button", name="Отправить", exact=True).click()
    await expect(regular.locator('.ProseMirror[contenteditable="true"]')).to_have_text("")
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "updateComment"]
    assert case.api.homeworks["hw1"]["status"] == "IN_REVIEW"
    assert len(case.api.comments) == len(case.api.files) == 1


async def image_attachment(case):
    page = await case.page()
    await page.get_by_role("combobox").click()
    await page.get_by_role("option", name="Не принято", exact=True).click()
    dialog = page.get_by_role("dialog")
    await dialog.locator('.ProseMirror[contenteditable="true"]').fill(FEEDBACK)
    async with page.expect_file_chooser() as chooser_event:
        await dialog.locator('button[value="Upload images"]').click()
    chooser = await chooser_event.value
    await chooser.set_files({"name": case.api.attachment_name,
                             "mimeType": case.api.attachment_type,
                             "buffer": case.api.attachment_bytes})
    await expect(dialog.locator('img[alt="feedback.png"]')).to_have_count(1)
    await confirm(dialog)
    await assert_returned(page)
    student = await case.page("STUDENT")
    image = student.locator('.ProseMirror[contenteditable="false"] img[alt="feedback.png"]')
    await expect(image).to_be_visible()
    await expect(image).to_have_js_property("complete", True)
    await expect(image).to_have_js_property("naturalWidth", 1)
    assert len(case.api.comments) == len(case.api.files) == 1
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "upload", "updateComment", "notApproved"]
    assert any(call["operation"] == "getFile" and call["role"] == "STUDENT" for call in case.api.calls)


async def attachment_layout(case, width=1280):
    page = await case.page(width=width)
    dialog = await feedback_dialog(page)
    editor = dialog.locator('.ProseMirror[contenteditable="true"]')
    await expect(editor.locator('[data-node-view-wrapper], file-node')).to_have_count(0)
    await expect(editor).to_have_text(FEEDBACK)
    attachments = dialog.get_by_role("region", name="Вложения", exact=True)
    await expect(attachments.get_by_role("listitem")).to_have_count(1)
    await expect(attachments.get_by_text(ATTACHMENT_NAME, exact=True)).to_be_visible()
    field = await dialog.get_by_role("group", name="Текст комментария", exact=True).bounding_box()
    area = await attachments.bounding_box()
    metrics = {
        "width": width,
        "outsideEditor": area["y"] >= field["y"] + field["height"] - 1,
        "documentOverflow": await page.evaluate("document.documentElement.scrollWidth > window.innerWidth"),
        "attachmentOverflow": await attachments.evaluate("area => area.scrollWidth > area.clientWidth + 1"),
    }
    case.layout_metrics.append(metrics)
    assert metrics["outsideEditor"] and not metrics["documentOverflow"] and not metrics["attachmentOverflow"], metrics
    await editor.fill(FEEDBACK + " Проверьте ещё раз.")
    await expect(attachments.get_by_text(ATTACHMENT_NAME, exact=True)).to_be_visible()
    label = "desktop" if width == 1280 else "mobile"
    await case.screenshot(page, f"attachment-layout-{label}")
    if width == 390:
        await attachments.get_by_role("button", name=f"Удалить {ATTACHMENT_NAME}", exact=True).click()
        await fill_feedback(dialog, "feedback-" + "long-name-" * 15 + ".txt")
        await expect(attachments.get_by_role("listitem")).to_have_count(1)
        assert await attachments.evaluate("area => area.scrollWidth <= area.clientWidth + 1")
        assert await page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        await case.screenshot(page, "attachment-long-name-mobile")


async def attachment_layout_mobile(case):
    await attachment_layout(case, width=390)


async def removed_attachment(case):
    page = await case.page()
    dialog = await feedback_dialog(page)
    area = dialog.get_by_role("region", name="Вложения", exact=True)
    await area.get_by_role("button", name=f"Удалить {ATTACHMENT_NAME}", exact=True).click()
    await expect(area.get_by_role("listitem")).to_have_count(0)
    await confirm(dialog)
    await assert_returned(page)
    assert [call["operation"] for call in case.api.mutations()] == ["sendComment", "notApproved"]
    assert not case.api.files
    assert all("file-node" not in item["dto"]["content"] for item in case.api.comments.values())


async def edit_saved_attachment(case):
    page = await case.page()
    await page.get_by_role("button", name="Редактировать комментарий", exact=True).click()
    forms = page.locator("form").filter(has=page.locator('.ProseMirror[contenteditable="true"]'))
    edited = forms.last
    area = edited.get_by_role("region", name="Вложения", exact=True)
    await expect(area.get_by_text(ATTACHMENT_NAME, exact=True)).to_be_visible()
    await expect(edited.locator('.ProseMirror [data-node-view-wrapper]')).to_have_count(0)
    await edited.locator('.ProseMirror[contenteditable="true"]').fill(FEEDBACK + " Уточнение.")
    await case.screenshot(page, "06-edit-saved-attachment")
    await edited.get_by_role("button", name="Отправить", exact=True).click()
    await expect(page.get_by_role("button", name="Редактировать комментарий", exact=True)).to_be_visible()
    assert [call["operation"] for call in case.api.mutations()] == ["updateComment"]
    assert len(case.api.files) == len(case.api.comments) == 1
    assert case.api.comments["comment-1"]["dto"]["content"].count("file-node") == 2
    assert "Уточнение." in case.api.comments["comment-1"]["dto"]["content"]


async def edit_remove_saved_attachment(case):
    page = await case.page()
    await page.get_by_role("button", name="Редактировать комментарий", exact=True).click()
    forms = page.locator("form").filter(has=page.locator('.ProseMirror[contenteditable="true"]'))
    edited = forms.last
    area = edited.get_by_role("region", name="Вложения", exact=True)
    await expect(area.get_by_text(ATTACHMENT_NAME, exact=True)).to_be_visible()
    await area.get_by_role("button", name=f"Удалить {ATTACHMENT_NAME}", exact=True).click()
    await expect(area.get_by_role("listitem")).to_have_count(0)
    await case.screenshot(page, "07-edit-remove-saved-attachment")
    await edited.get_by_role("button", name="Отправить", exact=True).click()
    await expect(page.get_by_role("button", name="Редактировать комментарий", exact=True)).to_be_visible()
    assert [call["operation"] for call in case.api.mutations()] == ["updateComment", "deleteCommentFile"]
    assert not case.api.files
    assert "file-node" not in case.api.comments["comment-1"]["dto"]["content"]


async def reply_attachment(case):
    page = await case.page()
    await page.get_by_role("button", name="Ответить на комментарий", exact=True).click()
    forms = page.locator("form").filter(has=page.locator('.ProseMirror[contenteditable="true"]'))
    reply = forms.last
    await fill_feedback(reply)
    await case.screenshot(page, "07-reply-with-attachment")
    await reply.get_by_role("button", name="Отправить", exact=True).click()
    await expect(page.get_by_role("button", name="Ответы (1)", exact=True)).to_be_visible()
    assert [call["operation"] for call in case.api.mutations()] == ["answerComment", "upload", "updateComment"]
    assert len(case.api.comments) == len(case.api.files) == 2
    assert case.api.comments["comment-2"]["parentId"] == "comment-1"
    assert "/homework/comment/comment-2/file/file-2" in case.api.comments["comment-2"]["dto"]["content"]
    assert "blob:" not in case.api.comments["comment-2"]["dto"]["content"]


async def edit_revision(page, content=CORRECTED_ANSWER, attachment=True):
    await page.get_by_role("button", name="Исправить и отправить повторно", exact=True).click()
    form = page.get_by_role("form", name="Исправление ответа", exact=True)
    editor = form.locator('.ProseMirror[contenteditable="true"]')
    await editor.fill(content)
    await editor.press("End")
    await editor.press("Space")
    if attachment:
        async with page.expect_file_chooser() as chooser_event:
            await form.locator('button[value="Upload files"]').click()
        chooser = await chooser_event.value
        await chooser.set_files({"name": ANSWER_FILE_NAME, "mimeType": "text/plain", "buffer": ANSWER_FILE_BYTES})
        await expect(form.get_by_text(ANSWER_FILE_NAME, exact=True)).to_be_visible()
        await expect(form.get_by_text(ATTACHMENT_NAME, exact=True)).to_have_count(0)
    return form


async def send_revision(form, retry=False):
    await form.get_by_role("button", name="Повторить отправку" if retry else "Отправить повторно", exact=True).click()


async def assert_resubmitted(case, page, homework_id="hw1"):
    await expect(page.get_by_role("form", name="Исправление ответа", exact=True)).to_have_count(0)
    label = "На проверке" if case.api.submit_status == "IN_REVIEW" else "Отправлено на проверку"
    await expect(page.get_by_text(label, exact=True)).to_be_visible()
    assert case.api.homeworks[homework_id]["status"] == case.api.submit_status
    assert case.api.homeworks[homework_id]["status"] != "APPROVED"


def revision_mutations(case):
    return [call["operation"] for call in case.api.mutations()]


async def full_homework_cycle(case):
    mentor = await case.page(cycle=True, width=1600)
    dialog = await feedback_dialog(mentor)
    await confirm(dialog)
    await assert_returned(mentor)
    student = await case.page("STUDENT", cycle=True)
    feedback = student.locator('.ProseMirror[contenteditable="false"]').filter(has_text=FEEDBACK)
    await expect(feedback).to_be_visible()
    feedback_link = feedback.get_by_role("link", name=ATTACHMENT_NAME, exact=True)
    async with student.expect_download() as downloaded:
        await feedback_link.click()
    assert Path(await (await downloaded.value).path()).read_bytes() == ATTACHMENT_BYTES
    await mentor.get_by_role("button", name="Очередь ментора", exact=True).click()
    await expect(mentor.get_by_text("Синтетическое ДЗ hw1", exact=True)).to_be_visible()
    await mentor.get_by_text("Синтетическое ДЗ hw1", exact=True).click()
    await expect(mentor.get_by_role("heading", name="Ответ на задание", exact=True)).to_be_visible()
    await expect(mentor.locator('.ProseMirror[contenteditable="false"]').filter(has_text="Synthetic answer")).to_be_visible()
    form = await edit_revision(student)
    await case.screenshot(student, "08-student-corrected-draft")
    await send_revision(form)
    await assert_resubmitted(case, student)
    corrected = student.locator('.ProseMirror[contenteditable="false"]').filter(has_text=CORRECTED_ANSWER)
    await expect(corrected).to_be_visible()
    await expect(corrected.get_by_role("link", name=ANSWER_FILE_NAME, exact=True)).to_be_visible()
    await expect(corrected.get_by_role("link", name=ATTACHMENT_NAME, exact=True)).to_have_count(0)
    await expect(feedback.get_by_role("link", name=ANSWER_FILE_NAME, exact=True)).to_have_count(0)
    await case.screenshot(student, "09-student-corrected-answer")
    await mentor.evaluate("window.dispatchEvent(new Event('focus'))")
    await expect(mentor.locator('.ProseMirror[contenteditable="false"]').filter(has_text=CORRECTED_ANSWER)).to_be_visible()
    await case.screenshot(mentor, "10-mentor-queue-corrected-answer")
    await mentor.locator('a[href="/kanban-mentor/hw1"]').last.click()
    await expect(mentor.get_by_role("heading", name="Синтетическое ДЗ hw1", exact=True)).to_be_visible()
    await expect(mentor.locator('.ProseMirror[contenteditable="false"]').filter(has_text=FEEDBACK)).to_be_visible()
    await expect(mentor.get_by_role("link", name=ATTACHMENT_NAME, exact=True)).to_be_visible()
    await expect(mentor.get_by_role("link", name=ANSWER_FILE_NAME, exact=True)).to_be_visible()
    await expect(mentor.get_by_role("combobox")).to_contain_text("Новые")
    await case.screenshot(mentor, "11-mentor-corrected-answer-and-feedback-history")
    assert revision_mutations(case) == ["sendComment", "upload", "updateComment", "notApproved",
                                         "uploadHomeworkFile", "updateHomework", "sendHomeWorkToCheck"]
    assert len(case.api.homeworks) == len(case.api.comments) == len(case.api.files) == len(case.api.homework_files) == 1
    assert "/homework/hw1/file/answer-file-1" in case.api.homeworks["hw1"]["answer"]
    assert "/homework/comment/" not in case.api.homeworks["hw1"]["answer"]
    assert ATTACHMENT_NAME in case.api.comments["comment-1"]["dto"]["content"]
    assert ANSWER_FILE_NAME not in case.api.comments["comment-1"]["dto"]["content"]


async def revision_save_failure(case):
    page = await case.page("STUDENT", cycle=True)
    form = await edit_revision(page)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("Не удалось завершить сохранение ответа"))).to_be_visible()
    await expect(form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(CORRECTED_ANSWER)
    await expect(form.get_by_text(ANSWER_FILE_NAME, exact=True)).to_be_visible()
    assert revision_mutations(case) == ["uploadHomeworkFile", "updateHomework"]
    assert case.api.homeworks["hw1"]["status"] == "NOT_APPROVED"
    await case.screenshot(page, "12-student-save-failure-preserved-draft")
    await send_revision(form, retry=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["uploadHomeworkFile", "updateHomework", "updateHomework", "sendHomeWorkToCheck"]
    assert len(case.api.homework_files) == 1


async def revision_submit_failure(case):
    page = await case.page("STUDENT", cycle=True)
    form = await edit_revision(page)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("Ответ сохранён, но отправка на проверку не подтверждена"))).to_be_visible()
    await expect(form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(CORRECTED_ANSWER)
    await expect(form.get_by_text(ANSWER_FILE_NAME, exact=True)).to_be_visible()
    assert case.api.homeworks["hw1"]["status"] == "NOT_APPROVED"
    await case.screenshot(page, "13-student-submit-failure-preserved-draft")
    await send_revision(form, retry=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["uploadHomeworkFile", "updateHomework", "sendHomeWorkToCheck", "sendHomeWorkToCheck"]
    assert len(case.api.homework_files) == 1


async def revision_changed_draft(case):
    page = await case.page("STUDENT", cycle=True)
    form = await edit_revision(page)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("Ответ сохранён, но отправка на проверку не подтверждена"))).to_be_visible()
    editor = form.locator('.ProseMirror[contenteditable="true"]')
    await editor.press("Home")
    await editor.type("Дополнение. ")
    await expect(form.get_by_text(ANSWER_FILE_NAME, exact=True)).to_be_visible()
    await send_revision(form, retry=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["uploadHomeworkFile", "updateHomework", "sendHomeWorkToCheck", "updateHomework", "sendHomeWorkToCheck"]
    assert "Дополнение." in case.api.homeworks["hw1"]["answer"]
    assert len(case.api.homework_files) == 1


async def revision_double_click(case):
    page = await case.page("STUDENT", cycle=True)
    form = await edit_revision(page)
    await form.get_by_role("button", name="Отправить повторно", exact=True).dblclick(force=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["uploadHomeworkFile", "updateHomework", "sendHomeWorkToCheck"]
    assert len(case.api.homework_files) == 1


async def revision_switch(case, waiting_for):
    page = await case.page("STUDENT", cycle=True, switch=True)
    form = await edit_revision(page, attachment=False)
    await send_revision(form)
    for _ in range(200):
        if any(call["operation"] == waiting_for for call in case.api.calls):
            break
        await asyncio.sleep(0.01)
    assert any(call["operation"] == waiting_for for call in case.api.calls)
    await page.get_by_role("button", name="Переключить ДЗ", exact=True).click()
    await expect(page.get_by_role("heading", name="Синтетическое ДЗ hw2", exact=True)).to_be_visible()
    second_answer = "Исправленный ответ второго синтетического ДЗ."
    second_form = await edit_revision(page, content=second_answer, attachment=False)
    await asyncio.sleep(1.1)
    await expect(second_form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(second_answer)
    await expect(second_form.get_by_role("button", name="Отправить повторно", exact=True)).to_be_enabled()
    assert case.api.homeworks["hw2"]["answer"] == "<p>Synthetic answer</p>"
    assert case.api.homeworks["hw2"]["status"] == "NOT_APPROVED"
    before = revision_mutations(case)
    assert before == (["updateHomework"] if waiting_for == "updateHomework" else ["updateHomework", "sendHomeWorkToCheck"])
    await case.screenshot(page, f"14-switch-during-{waiting_for}")
    await send_revision(second_form)
    await assert_resubmitted(case, page, "hw2")
    assert second_answer in case.api.homeworks["hw2"]["answer"]
    assert revision_mutations(case) == before + ["updateHomework", "sendHomeWorkToCheck"]
    assert len(case.api.homeworks) == 2


async def revision_switch_save(case):
    await revision_switch(case, "updateHomework")


async def revision_switch_submit(case):
    await revision_switch(case, "sendHomeWorkToCheck")


async def revision_backend_status(case):
    page = await case.page("STUDENT", cycle=True)
    form = await edit_revision(page, attachment=False)
    await send_revision(form)
    await assert_resubmitted(case, page)
    assert case.api.submit_status == "IN_REVIEW"
    await expect(page.get_by_text("Новые", exact=True)).to_have_count(0)
    assert revision_mutations(case) == ["updateHomework", "sendHomeWorkToCheck"]


async def homework_fetches(case):
    return [call for call in case.api.calls if call["operation"] == "homeWork"]


async def wait_for_refetch(case, count):
    for _ in range(200):
        if len(await homework_fetches(case)) >= count:
            return
        await asyncio.sleep(0.01)
    assert len(await homework_fetches(case)) >= count, "the homework was not refetched"


async def revision_state_error(case):
    page = await case.page("STUDENT", cycle=True)
    assert len(await homework_fetches(case)) == 1
    form = await edit_revision(page, attachment=False)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("изменился на сервере|актуальн"))).to_be_visible()
    await expect(form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(CORRECTED_ANSWER)
    assert revision_mutations(case) == ["updateHomework", "sendHomeWorkToCheck"]
    assert case.api.homeworks["hw1"]["status"] == "NOT_APPROVED"
    await wait_for_refetch(case, 2)
    await case.screenshot(page, "15-student-state-error")
    await send_revision(form, retry=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["updateHomework", "sendHomeWorkToCheck", "sendHomeWorkToCheck"]


async def revision_save_not_found(case):
    page = await case.page("STUDENT", cycle=True)
    assert len(await homework_fetches(case)) == 1
    form = await edit_revision(page, attachment=False)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("не найден или недоступен"))).to_be_visible()
    await expect(form.get_by_text(re.compile("Не удалось завершить сохранение"))).to_have_count(0)
    await expect(form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(CORRECTED_ANSWER)
    assert revision_mutations(case) == ["updateHomework"]
    assert case.api.homeworks["hw1"]["status"] == "NOT_APPROVED"
    await wait_for_refetch(case, 2)
    await case.screenshot(page, "16-student-save-not-found")


async def revision_upload_not_found(case):
    page = await case.page("STUDENT", cycle=True)
    assert len(await homework_fetches(case)) == 1
    form = await edit_revision(page)
    await send_revision(form)
    await expect(form.get_by_text(re.compile("не найден или недоступен"))).to_be_visible()
    await expect(form.locator('.ProseMirror[contenteditable="true"]')).to_contain_text(CORRECTED_ANSWER)
    await expect(form.get_by_text(ANSWER_FILE_NAME, exact=True)).to_be_visible()
    assert revision_mutations(case) == ["uploadHomeworkFile"]
    await wait_for_refetch(case, 2)
    await case.screenshot(page, "17-student-upload-not-found")
    await send_revision(form, retry=True)
    await assert_resubmitted(case, page)
    assert revision_mutations(case) == ["uploadHomeworkFile", "uploadHomeworkFile",
                                       "updateHomework", "sendHomeWorkToCheck"]
    assert len(case.api.homework_files) == 1


async def locked_review_status(case):
    page = await case.page("STUDENT", cycle=True)
    await expect(page.get_by_text("Отправлено на проверку", exact=True)).to_be_visible()
    await expect(page.get_by_text("Новые", exact=True)).to_have_count(0)
    await expect(page.get_by_role("button",
                   name=re.compile("Редактировать|Исправить и отправить повторно"))).to_have_count(0)
    await expect(page.get_by_role("form", name="Исправление ответа", exact=True)).to_have_count(0)
    await expect(page.locator('.ProseMirror[contenteditable="false"]')
                 .filter(has_text="Synthetic answer")).to_be_visible()
    await expect(page.get_by_text("Начало проверки", exact=True)).to_have_count(0)
    await expect(page.get_by_text("Окончание проверки", exact=True)).to_have_count(0)
    await case.screenshot(page, "18-student-review-locked")
    assert revision_mutations(case) == []


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--case", action="append")
    parser.add_argument("--artifacts", type=Path)
    args = parser.parse_args()
    origin = urlsplit(args.url)
    assert origin.scheme == "http" and origin.hostname in ("localhost", "127.0.0.1") and origin.port
    artifacts = args.artifacts or Path(tempfile.mkdtemp(prefix="lms-feedback-browser-"))
    artifacts.mkdir(parents=True, exist_ok=True)
    cases = [
        ("success", success, {}),
        ("sync-failure", sync_failure, {"update_failures": 1}),
        ("status-failure", status_failure, {"status_failures": 1}),
        ("cancel", cancel, {}),
        ("double-click", double_click, {"send_delay": 0.3}),
        ("switch-homework", switch_homework, {"send_delay": 0.5, "switch": True}),
        ("ordinary-comment-retry", ordinary_comment_retry, {"update_failures": 1}),
        ("image-attachment", image_attachment, {"image": True}),
        ("attachment-layout", attachment_layout, {}),
        ("attachment-layout-mobile", attachment_layout_mobile, {}),
        ("removed-attachment", removed_attachment, {}),
        ("edit-saved-attachment", edit_saved_attachment, {"existing": True}),
        ("edit-remove-saved-attachment", edit_remove_saved_attachment, {"existing": True}),
        ("reply-attachment", reply_attachment, {"existing": True}),
        ("full-homework-cycle", full_homework_cycle, {}),
        ("revision-save-failure", revision_save_failure, {"returned": True, "save_failures": 1}),
        ("revision-null-save", revision_save_failure, {"returned": True, "null_save": True}),
        ("revision-submit-failure", revision_submit_failure, {"returned": True, "submit_failures": 1}),
        ("revision-changed-draft", revision_changed_draft, {"returned": True, "submit_failures": 1}),
        ("revision-double-click", revision_double_click, {"returned": True, "save_delay": 0.3, "submit_delay": 0.3}),
        ("revision-switch-save", revision_switch_save, {"returned": True, "switch": True, "save_delay": 0.8}),
        ("revision-switch-submit", revision_switch_submit, {"returned": True, "switch": True, "submit_delay": 0.8}),
        ("revision-backend-status", revision_backend_status, {"returned": True, "submit_status": "IN_REVIEW"}),
        ("revision-state-error", revision_state_error, {"returned": True, "submit_state_failures": 1}),
        ("revision-save-not-found", revision_save_not_found, {"returned": True, "save_not_found": True}),
        ("revision-upload-not-found", revision_upload_not_found, {"returned": True, "upload_not_found": True}),
        ("locked-review-status", locked_review_status, {"submitted": True}),
    ]
    reports = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True, channel="chrome")
        try:
            for name, run, options in cases:
                if args.case and name not in args.case:
                    continue
                case = BrowserCase(browser, args.url, artifacts, name, **options)
                error = None
                try:
                    await run(case)
                    await case.check()
                except Exception:
                    error = traceback.format_exc()
                    for index, page in enumerate(case.pages):
                        if not page.is_closed():
                            await case.screenshot(page, f"failure-{name}-{index}")
                report = case.report()
                report["passed"] = error is None
                if error:
                    report["failure"] = error
                reports.append(report)
                await case.close()
                print(f"{'PASS' if error is None else 'FAIL'} {name}")
                if error:
                    print(error)
                for warning in case.warnings:
                    print("WARNING", json.dumps(warning, ensure_ascii=False))
        finally:
            await browser.close()
    result = {"evidenceKind": "mock-api-browser-only", "liveBackendEvidence": False,
              "deploymentAuthorized": False, "studentExecutionAuthorized": False,
              "baseUrl": args.url, "browser": "Chrome via Playwright, headless",
              "offlineFonts": True, "cases": reports}
    (artifacts / "results.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    full_cycle = next((report for report in reports if report["case"] == "full-homework-cycle"), None)
    if full_cycle:
        trace = {"evidenceKind": result["evidenceKind"], "liveBackendEvidence": False,
                 "case": full_cycle["case"], "passed": full_cycle["passed"], "apiCalls": full_cycle["apiCalls"]}
        (artifacts / "full-cycle-api-trace.json").write_text(json.dumps(trace, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Artifacts: {artifacts}")
    assert reports and all(report["passed"] for report in reports), "browser regression suite failed"


if __name__ == "__main__":
    asyncio.run(main())
