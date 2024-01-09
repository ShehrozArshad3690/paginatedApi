interface jsonData {
  status: Boolean;
  message: string;
  data: [] | null | {};
}

function apiResponse(status: boolean, message: string, data?: [] | null | {}) {
  let foundData = {
    status,
    message,
    data,
  } as jsonData;
  return foundData;
}

export { apiResponse };
