/** Año del build, para el © del footer. "use cache" lo fija al prerenderizar (Cache Components no permite new Date() suelto). */
export async function getBuildYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
