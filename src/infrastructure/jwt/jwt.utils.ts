import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: string,
  options?: jwt.SignOptions | undefined
) {

  return jwt.sign(object, keyName, {
    ...(options && options),
  });
}

export function verifyJwt(
  token: string,
  keyName: string
) {
  try {
    const decoded = jwt.verify(token, keyName);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

