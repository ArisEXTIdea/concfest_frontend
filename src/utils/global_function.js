import $ from "jquery";
import { store } from "../configs/redux/store";
import axios from "axios";
import { apiHost, days, months } from "./global_variable";

const changeTitle = (text) => {
  document.title = `${text} | Concfest Indonesia`;
};

const arrayNamespace = {
  serializeArrayToObject: (id) => {
    const array = $(`#${id}`).serializeArray();

    const dataObject = {};
    array.forEach((i) => {
      dataObject[i["name"]] = i.value;
    });

    return dataObject;
  }
};

const timeConverterNamespace = {
  convertEpochToDate: (epoch) => {
    const date = new Date(epoch);

    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  },
  convertEpochToDateNoTime: (epoch) => {
    const date = new Date(epoch);

    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  },

  convertEpochToInputDate: (epochMilli) => {
    const date = new Date(epochMilli);

    const pad = (num) => (num < 10 ? "0" + num : num);

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
  }
};

const handleShowError = (errData) => {
  $(`[id^=input-error-text-]`).text("");
  $(`[id^=input-error-text-]`).addClass("hidden");

  Object.keys(errData).forEach((key) => {
    $(`#input-error-text-${key}`).text(errData[key]);
    $(`#input-error-text-${key}`).removeClass("hidden");
  });
};

const handleToastDisplay = (color, icon, text) => {
  $("#toast-stick").removeClass(function (index, className) {
    return (className.match(/\bbg\S+/g) || []).join(" ");
  });

  $("#toast-stick").addClass(`bg-${color}-500`);
  $("#toast-stick-icon").removeClass();
  $("#toast-stick-icon").addClass(`${icon} mr-2`);
  $("#toast-stick-text").text(text);

  $("#toast-stick").fadeIn();

  setTimeout(() => {
    $("#toast-stick").fadeOut();
  }, 2000);
};

const handleDisplayModalConfirm = (modalName, status) => {
  if (status == 1) {
    $(`#modal-confirm-${modalName}`).show();
  } else {
    $(`#modal-confirm-${modalName}`).hide();
  }
};

const handleDisplayModalPopUp = (modalName, status) => {
  if (status == 1) {
    $(`#modal-popup-${modalName}`).show();
  } else {
    $(`#modal-popup-${modalName}`).hide();
  }
};

const getSession = async () => {
  try {
    const token = store.getState();

    const data = await axios.get(`${apiHost}/authentication/session`, {
      headers: { Authorization: token.userCredential }
    });

    return data.data.data;
  } catch (err) {
    store.dispatch({ type: "DELETE_AUTH_CREDENTIAL" });
    window.location = "/404";
  }
};

const updateSession = async () => {
  const token = store.getState();

  axios.put(
    `${apiHost}/authentication/session`,
    {},
    {
      headers: { Authorization: token.userCredential }
    }
  );

  return true;
};

const convertToIDR = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
};

export {
  changeTitle,
  arrayNamespace,
  handleShowError,
  handleToastDisplay,
  handleDisplayModalConfirm,
  handleDisplayModalPopUp,
  getSession,
  updateSession,
  timeConverterNamespace,
  convertToIDR
};
