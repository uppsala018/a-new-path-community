export function getAdminMail() {
  return process.env.ADMIN_MAIL?.trim().toLowerCase() || "";
}

export function isAdminEmail(email: string | null | undefined) {
  const adminMail = getAdminMail();
  if (!adminMail) {
    return false;
  }

  return email?.trim().toLowerCase() === adminMail;
}
