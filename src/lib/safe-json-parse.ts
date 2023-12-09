export const safeJsonParse = <T = never>(json: string): T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(json);
};
