import moment from "moment";

export function getDate() {
  return moment().format("LL");
}
