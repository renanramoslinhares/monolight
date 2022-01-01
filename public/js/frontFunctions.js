async function getToken() {
  const email = $("#username").val();
  const password = $("#password").val();

  request({
    url: "/api/auth",
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.data) {
        showAlert("Successfully authenticated.", "success");
        localStorage.awp_access = JSON.stringify(response.data);
        setTimeout(() => {
          goTo("/admin");
        }, 1500);
      } else {
        showAlert(response.error.message, "error");
      }
    })
    .catch((error) => {
      showAlert(error.message, "error");
    });
}

function updatePermalink(params) {
  const fileName = normalizeFileName(params.value);
  validation(fileName);

  const host = window.location.host;
  const permalink = `${host}/${fileName}.html`;
  $("#permalink")[0].innerText = permalink;
}

function validation(fileName) {
  if (!fileName) {
    $("#pageTitle").addClass("is-invalid");
    const pageTitleError = $("#pageTitle-error");
    pageTitleError.css("display", "block");
    pageTitleError[0].innerText = "Please enter a valid title";
  } else {
    $("#pageTitle").removeClass("is-invalid");
    $("#pageTitle-error").css("display", "none");
  }
}

function showAlert(message, type = "info") {
  // types = ['success', 'info', 'error', 'warning'];
  if (!message) return;
  toastr[type](message);
}

function deletePage(pageId) {
  if (pageId) {
    Promise.all([removeRegisterById(pageId), removeFileById(pageId)]).then(
      () => {
        setTimeout(() => {
          goTo("/admin/page/all");
        }, 1500);

        const message =
          "<b>Successfully deleted page!</b><br /> Hold. You will be redirected.";
        const type = "error";
        showAlert(message, type);
      }
    );
  } else goTo("/admin/page/all");
}

function goTo(url) {
  window.location.href = url;
}

function prepareData() {
  const dataUser = JSON.parse(localStorage.awp_access).dataUser;
  const title = $("#pageTitle").val();
  const fileName = normalizeFileName(title);
  return {
    title,
    content: $("#summernote").summernote("code").trim(),
    user_id: dataUser.id,
    user_name: dataUser.userName,
    parent: $("#parent").val(),
    order: $("#order").val(),
    featuredImageUrl: "", // under development
    permalink: fileName,
  };
}

async function publishPage(pageId) {
  const data = prepareData();
  data["status"] = "Publish";
  const body = JSON.stringify(data);

  const promiseRegister = pageId
    ? updateRegisterById(pageId, body)
    : createRegister(body);

  if (pageId) removeFileById(pageId);

  const promiseCreateFile = createFileByName(data.permalink, body);

  Promise.all([promiseRegister, promiseCreateFile]).then(() => {
    showAlertDefault("/admin/page/all");
  });
}

function draftPage(pageId) {
  const data = prepareData();
  data["status"] = "Draft";
  const body = JSON.stringify(data);

  if (pageId) removeFileById(pageId);
  const promiseRegister = pageId
    ? updateRegisterById(pageId, body)
    : createRegister(body);
  promiseRegister.then(() => {
    showAlertDefault("/admin/page/all");
  });
}

function showAlertDefault(redirectToUrl) {
  const type = "success";
  let message = "<b>Saved successfully!!</b><br />";
  if (redirectToUrl) {
    setTimeout(() => {
      goTo(redirectToUrl);
    }, 1500);
    message += "<br />Hold. You will be redirected.";
  }

  showAlert(message, type);
}

function normalizeFileName(title) {
  return removeSpecialChars(removeAllAcents(removeSpaces(title.toLowerCase())));
}

function removeSpecialChars(string) {
  return string.replace(/[^\w\s]/gi, "");
}

function removeAllAcents(string) {
  return string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function removeSpaces(string) {
  return string.trim().split(" ").join("_");
}

function removeRegisterById(pageId) {
  return request({ url: `/api/page/${pageId}`, method: "DELETE" });
}

function removeFileById(pageId) {
  return request({ url: `/fileService/delete/${pageId}`, method: "DELETE" });
}

function createRegister(body) {
  return request({ url: "/api/page", method: "PUT", body });
}

function updateRegisterById(pageId, body) {
  return request({ url: `/api/page/${pageId}`, method: "PUT", body });
}

function createFileByName(fileName, body) {
  return request({
    url: `/fileService/create/${fileName}`,
    method: "PUT",
    body,
  });
}

function request(params) {
  return fetch(
    new Request(params.url, {
      method: params.method,
      body: params.body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  )
    .then((response) => response.json())
    .catch((error) => {
      error;
    });
}
